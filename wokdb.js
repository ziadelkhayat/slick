/* Slick ERP — connects the back office and POS to Supabase.
   Gives the pages the same small database API they used before (collections, snapshots, set/update/delete),
   and shows a staff login before anything loads. */
(function(){
  const SUPABASE_URL = "https://akrezmxgtorkuwxxctyk.supabase.co";
  const SUPABASE_KEY = "sb_publishable_tL62keD2HdovsMpI8XAkWg_TPdjaUVh";   // public key, safe in the browser
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: true, autoRefreshToken: true } });

  // app collection -> table, and which columns each table accepts
  const TABLE = { inv_items: "inventory_items", zones: "delivery_zones", inv_categories: "inventory_categories", inv_docs: "inventory_docs", users: "staff_users" };
  const COLS = {
    brands: "id name name_ar active deleted created_at",
    branches: "id brand_id name code address city phone open_time close_time active call_center production created_at name_ar tax_number lat lng settings",
    categories: "id brand_id name name_ar reference sort deleted created_at inactive_branch_ids",
    products: "id brand_id name name_ar sku category_id price tax_group description image_url channels branch_ids active deleted created_at ingredients pricing_method costing_method selling_method cost barcode prep_time calories custom_prices inactive_branch_ids out_of_stock_branch_ids modifiers sort variant_set_id variants variant_recipes",
    inventory_items: "id name sku category kind storage_unit ingredient_unit factor cost min_level par_level barcode deleted created_at ingredients max_level name_ar costing_method",
    delivery_zones: "id name branch_id fee min_order eta polygon active deleted created_at",
    devices: "id name type branch_id code activated_at last_seen deleted created_at reference settings",
    shifts: "id device_id branch_id cashier opening_cash opened_at closed_at orders sales expected_cash counted_cash difference",
    order_sources: "id name name_ar reference sort active deleted created_at",
    inventory_categories: "id name name_ar reference deleted created_at",
    warehouses: "id name reference address deleted created_at",
    inventory_docs: "id kind ref name location_id reason direction status business_date items notes created_by submitted_by submitted_at deleted created_at consumed supplier_id dest_id linked_id received_at received_by",
    suppliers: "id name code contact_name phone email address notes deleted created_at",
    modifiers: "id name name_ar reference sort deleted created_at",
    taxes: "id name name_ar rate deleted created_at",
    tax_groups: "id name name_ar reference tax_ids deleted created_at",
    payment_methods: "id name name_ar type code open_drawer active sort deleted created_at",
    roles: "id name description permissions deleted created_at",
    day_closes: "id branch_id business_date closed_at closed_by device_id orders sales created_at",
    staff_users: "id name email phone employee_no role_id branch_ids pin_hash active user_id deleted created_at",
    modifier_options: "id modifier_id name name_ar sku price tax_group costing_method cost calories ingredients custom_prices inactive_branch_ids out_of_stock_branch_ids sort active deleted created_at",
    orders: "id brand_id no channel source type status branch_id device_id shift_id zone_id customer_name phone address lat lng table_no notes items subtotal discount_pct discount delivery_fee tax invoice_no total payment agent handled_by accepted_at done_at void_reason voided_at voided_by created_at charges charges_total receipt_notes guests voided_items returned_items refund_total stock_action return_reason returned_at returned_by approved_by refund_of return_no",
    charges: "id name name_ar type value order_types auto tax_group brand_ids branch_ids active sort deleted created_at",
    variant_sets: "id name name_ar options deleted created_at",
  };
  Object.keys(COLS).forEach(k => COLS[k] = new Set(COLS[k].split(" ")));
  const RENAME = { open: "open_time", close: "close_time", table: "table_no" };
  const BACK = { open_time: "open", close_time: "close", table_no: "table" };
  const snake = k => RENAME[k] || k.replace(/[A-Z]/g, c => "_" + c.toLowerCase());
  const camel = k => BACK[k] || k.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
  const tableOf = c => TABLE[c] || c;

  function toRow(col, id, data){
    const t = tableOf(col);
    if(t === "settings"){ const d = { ...data }; delete d.updatedAt; delete d.createdAt; return { id, data: d }; }
    const row = id ? { id } : {};
    for(const [k, v] of Object.entries(data)){
      const s = snake(k);
      if(COLS[t] && COLS[t].has(s) && s !== "id") row[s] = (v === "" && /_id$/.test(s)) ? null : v;
    }
    if(t === "orders" && row.no != null) row.no = +row.no;
    return row;
  }
  function fromRow(col, r){
    if(tableOf(col) === "settings") return { ...(r.data || {}), updatedAt: r.updated_at };
    const o = {};
    for(const [k, v] of Object.entries(r)) if(k !== "id") o[camel(k)] = v;
    if(o.no != null) o.no = String(o.no);
    return o;
  }

  /* ---------- offline layer (POS only: set window.SLICK_OFFLINE = true before loading this file) ----------
     Every collection is cached on the device. Writes go to an outbox first, show up on screen right away,
     and are sent to the server in order as soon as there is a connection. */
  const OFF = !!window.SLICK_OFFLINE;
  const ls = { get(k, d){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
               set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){ console.warn("storage full", e); } } };
  const isNet = e => !navigator.onLine || !e || e.name === "AuthRetryableFetchError" || e.name === "AbortError" || e.status === 0 ||
    /failed to fetch|network|load failed|timeout|abort|offline/i.test(String(e.message || e)) || (e.code === "" && !e.hint);
  let outbox = OFF ? ls.get("slick_outbox", []) : [];
  let failed = OFF ? ls.get("slick_failed", []) : [];
  let online = navigator.onLine, syncing = false, lastSync = ls.get("slick_last_sync", null), needsLogin = false;
  const saveBox = () => { ls.set("slick_outbox", outbox); ls.set("slick_failed", failed); };
  function status(){
    const st = { online, syncing, pending: outbox.length, failed: failed.length, lastSync, needsLogin };
    window.dispatchEvent(new CustomEvent("slick-sync", { detail: st })); return st;
  }
  function applyOp(rows, op){
    const i = rows.findIndex(r => r.id === op.id);
    if(op.op === "set"){ const r = { ...op.data, id: op.id }; i < 0 ? rows.unshift(r) : rows[i] = r; }
    else if(op.op === "update" && i >= 0) rows[i] = { ...rows[i], ...op.data, id: op.id };
    else if(op.op === "delete" && i >= 0) rows.splice(i, 1);
    return rows;
  }
  const cacheKey = col => "slick_c_" + col;
  const local = {};               // col -> rows currently shown (app format)
  function withPending(col, rows){ outbox.filter(o => o.col === col).forEach(o => applyOp(rows, o)); return rows; }

  const listeners = {};          // col -> [cb]
  const timers = {};
  function emit(col, rows, fromCache){
    const snap = { docs: rows.map(r => { const { id, ...d } = r; return { id, data: () => ({ ...d }) }; }), metadata:{ fromCache: !!fromCache, hasPendingWrites: outbox.some(o => o.col === col) } };
    (listeners[col]||[]).forEach(l => l.next(snap));
  }
  async function fetchAll(col){
    const t = tableOf(col);
    let q = sb.from(t).select("*");
    if(t === "orders") q = q.gte("created_at", new Date(Date.now() - 3*86400000).toISOString()).order("created_at", { ascending:false }).limit(1000);
    else if(t === "shifts") q = q.gte("opened_at", new Date(Date.now() - 7*86400000).toISOString()).limit(1000);
    else q = q.limit(5000);
    if(OFF && window.AbortSignal && AbortSignal.timeout) q = q.abortSignal(AbortSignal.timeout(15000));
    const { data, error } = await q;
    if(error) throw error;
    return data.map(r => ({ ...fromRow(col, r), id: r.id }));
  }
  function refresh(col){
    clearTimeout(timers[col]);
    timers[col] = setTimeout(async () => {
      try{
        const rows = await fetchAll(col);
        if(OFF){ ls.set(cacheKey(col), rows); if(!online){ online = true; status(); } }
        local[col] = OFF ? withPending(col, rows) : rows;
        emit(col, local[col], false);
      }catch(e){
        if(OFF && isNet(e)){ if(online){ online = false; status(); } return; }   // keep showing the cached copy
        console.error("load", col, e); (listeners[col]||[]).forEach(l => l.error && l.error({ code:"unavailable", message:e.message }));
      }
    }, 150);
  }
  const channels = {};
  async function send(op){
    const t = tableOf(op.col);
    if(op.op === "set"){ const { error } = await sb.from(t).upsert(toRow(op.col, op.id, op.data)); if(error) throw error; }
    else if(op.op === "update"){
      const row = toRow(op.col, null, op.data); delete row.id;   // never touch the key on update (settings rows came back with id:null)
      if(t === "settings"){ const cur = await sb.from(t).select("data").eq("id", op.id).maybeSingle(); if(cur.error) throw cur.error; row.data = { ...(cur.data?.data||{}), ...row.data }; }
      const { error } = await sb.from(t).update(row).eq("id", op.id); if(error) throw error;
    }
    else { const { error } = await sb.from(t).delete().eq("id", op.id); if(error) throw error; }
  }
  async function flush(){
    if(!OFF || syncing || !outbox.length) return status();
    syncing = true; status();
    try{
      const { data: { session }, error: se } = await sb.auth.getSession();       // refreshes an expired token when back online
      if(!session){ if(se && isNet(se)){ online = false; } else if(navigator.onLine){ needsLogin = true; gate("Your session ended. Sign in again to send the saved sales."); } return; }
      needsLogin = false;
      const touched = new Set();
      while(outbox.length){
        const op = outbox[0];
        try{ await send(op); outbox.shift(); touched.add(op.col); online = true; lastSync = new Date().toISOString(); ls.set("slick_last_sync", lastSync); saveBox(); status(); }
        catch(e){
          if(isNet(e)){ online = false; break; }
          op.tries = (op.tries||0) + 1; op.lastError = e.message || String(e);
          if(op.tries >= 3){ failed.push(outbox.shift()); console.error("sync gave up on", op, e); }
          saveBox(); if(op.tries < 3) break;
        }
      }
      touched.forEach(refresh);
    } finally { syncing = false; status(); }
  }
  function queue(op){
    const last = [...outbox].reverse().find(o => o.col === op.col && o.id === op.id);
    if(op.op === "update" && last && last === outbox[outbox.length-1] && last.op !== "delete" && !syncing) last.data = { ...last.data, ...op.data };   // merge repeated updates (e.g. heartbeats)
    else outbox.push({ ...op, qid: Date.now().toString(36) + Math.random().toString(36).slice(2,6), at: new Date().toISOString() });
    saveBox();
    local[op.col] = applyOp(local[op.col] || ls.get(cacheKey(op.col), []), op);
    emit(op.col, local[op.col], true);
    status(); setTimeout(flush, 50);
  }
  if(OFF){
    window.addEventListener("online", () => { online = true; status(); flush(); Object.keys(listeners).forEach(refresh); });
    window.addEventListener("offline", () => { online = false; status(); });
    document.addEventListener("visibilitychange", () => { if(!document.hidden) flush(); });
    setInterval(() => { if(outbox.length) flush(); else if(!online) Object.keys(listeners).slice(0,1).forEach(refresh); }, 20000);
  }

  function collection(col){
    const t = tableOf(col);
    return {
      onSnapshot(next, error){
        (listeners[col] ||= []).push({ next, error });
        if(OFF){ const cached = ls.get(cacheKey(col), null); if(cached){ local[col] = withPending(col, cached); const rows = local[col]; setTimeout(() => next({ docs: rows.map(r => { const { id, ...d } = r; return { id, data: () => ({ ...d }) }; }), metadata:{ fromCache:true, hasPendingWrites:false } }), 0); } }
        refresh(col);
        if(!channels[col]){
          channels[col] = sb.channel("rt-" + t).on("postgres_changes", { event: "*", schema: "public", table: t }, () => refresh(col)).subscribe();
        }
        return () => { listeners[col] = (listeners[col]||[]).filter(l => l.next !== next); };
      },
      doc(id){
        if(OFF) return {
          async set(data){ queue({ op:"set", col, id, data }); },
          async update(data){ queue({ op:"update", col, id, data }); },
          async delete(){ queue({ op:"delete", col, id }); }
        };
        return {
          async set(data){ await send({ op:"set", col, id, data }); refresh(col); },
          async update(data){ await send({ op:"update", col, id, data }); refresh(col); },
          async delete(){ await send({ op:"delete", col, id }); refresh(col); }
        };
      }
    };
  }
  const dbApi = { collection };

  /* ---------- staff login ---------- */
  let staff = null, readyResolve; const ready = new Promise(r => readyResolve = r);
  const css = `.wk-gate{position:fixed;inset:0;background:radial-gradient(1200px 600px at 20% 0%,#ece6ff,transparent),radial-gradient(900px 500px at 100% 100%,#f6e8ff,transparent),#f4f5fa;display:grid;place-items:center;z-index:9999;font-family:Inter,system-ui,sans-serif;padding:20px}
  .wk-card{background:#fff;border-radius:22px;padding:34px;width:min(380px,100%);box-shadow:0 10px 40px rgba(30,20,60,.1)}
  .wk-logo{width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,#6c47ff,#a855f7);box-shadow:0 8px 22px rgba(108,71,255,.4);color:#fff;display:grid;place-items:center;font-weight:700;font-size:22px;margin:0 auto 12px}
  .wk-card h1{text-align:center;font-size:20px;margin:0 0 4px}.wk-card p{text-align:center;color:#5b5a66;margin:0 0 18px;font-size:14px}
  .wk-card label{display:block;font-size:13px;color:#5b5a66;margin:10px 0 5px;font-weight:500}
  .wk-card input{width:100%;box-sizing:border-box;padding:11px 12px;border:1px solid #e5e3ec;border-radius:10px;font:inherit}
  .wk-card button{width:100%;margin-top:16px;padding:13px;border:0;border-radius:12px;background:linear-gradient(135deg,#6c47ff,#5130e8);box-shadow:0 6px 16px rgba(108,71,255,.3);color:#fff;font:inherit;font-weight:600;cursor:pointer}
  .wk-card button:disabled{opacity:.6}.wk-err{color:#9e0c24;font-size:13px;min-height:18px;margin-top:10px;text-align:center}`;
  function gate(msg){
    if(!document.body){ document.addEventListener("DOMContentLoaded", () => gate(msg), { once:true }); return; }   // page still loading
    let el = document.getElementById("wkGate");
    if(!el){
      const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
      el = document.createElement("div"); el.id = "wkGate"; el.className = "wk-gate";
      el.innerHTML = `<form class="wk-card" autocomplete="on"><div class="wk-logo">S</div><h1>Slick</h1><p>${document.title.includes("POS") ? "Sign in to start the register" : "Sign in to the back office"}</p>
        <label for="wkEmail">Email</label><input id="wkEmail" type="email" autocomplete="username" required>
        <label for="wkPass">Password</label><input id="wkPass" type="password" autocomplete="current-password" required>
        <button id="wkBtn">Sign in</button><div class="wk-err" id="wkErr"></div></form>`;
      document.body.appendChild(el);
      el.querySelector("form").addEventListener("submit", async e => {
        e.preventDefault(); const b = el.querySelector("#wkBtn"); b.disabled = true; el.querySelector("#wkErr").textContent = "";
        const { error } = await sb.auth.signInWithPassword({ email: el.querySelector("#wkEmail").value.trim(), password: el.querySelector("#wkPass").value });
        b.disabled = false;
        if(error){ el.querySelector("#wkErr").textContent = error.message === "Invalid login credentials" ? "Wrong email or password." : error.message; return; }
        await afterLogin();
      });
    }
    el.style.display = "grid"; el.querySelector("#wkErr").textContent = msg || "";
  }
  function useStaff(s){
    staff = s; if(OFF) ls.set("slick_staff", s);
    const el = document.getElementById("wkGate"); if(el) el.style.display = "none";
    readyResolve(dbApi); if(OFF) setTimeout(flush, 500);
  }
  async function afterLogin(){
    const cached = OFF ? ls.get("slick_staff", null) : null;
    let user = null;
    try{ const r = await sb.auth.getUser(); user = r.data?.user; if(r.error && isNet(r.error) && cached){ online = false; status(); return useStaff(cached); } }
    catch(e){ if(cached && isNet(e)) return useStaff(cached); }
    if(!user) return gate();
    let { data, error } = await sb.from("staff").select("*").eq("user_id", user.id).maybeSingle();
    if(error && isNet(error) && cached && cached.user_id === user.id) return useStaff(cached);
    if(!data && !error){ const c = await sb.rpc("slick_claim_login"); if(c.data) ({ data } = await sb.from("staff").select("*").eq("user_id", user.id).maybeSingle()); }   // first sign-in of a user added under Manage → Users
    if(!data){ await sb.auth.signOut(); return gate("This login isn't set up as staff yet. Ask the owner to add you."); }
    useStaff({ ...data, email: user.email });
  }
  (async () => {
    const cached = OFF ? ls.get("slick_staff", null) : null;
    let res; try{ res = await sb.auth.getSession(); }catch(e){ res = { data:{ session:null }, error:e }; }
    const session = res.data?.session;
    if(session) await afterLogin();
    else if(cached && (isNet(res.error) || !navigator.onLine)){ online = false; status(); useStaff(cached); }   // offline with an expired token: keep selling, sync after sign-in
    else gate();
  })();

  const userApi = { id: async () => staff?.user_id, email: async () => staff?.email || "", name: async () => staff?.name || staff?.email, role: async () => staff?.role, branchId: async () => staff?.branch_id,
    canEdit: async () => ["owner","admin"].includes(staff?.role), isOwner: async () => staff?.role === "owner", signOut: async () => { if(OFF && outbox.length && !confirm(outbox.length + " change(s) haven't synced yet. Sign out anyway? They stay saved on this device.")) return; await sb.auth.signOut(); if(OFF) localStorage.removeItem("slick_staff"); location.reload(); } };

  window.WOK = { sb, ready, user: userApi, sync: { status, flush, failed: () => failed.slice(), retryFailed: () => { outbox.push(...failed.map(o => ({ ...o, tries:0 }))); failed = []; saveBox(); flush(); } } };
  window.claude = { use: async n => n === "db" ? ready : n === "user" ? (await ready, userApi) : null };
})();
