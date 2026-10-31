/* Slick ERP — connects the back office and POS to Supabase.
   Gives the pages the same small database API they used before (collections, snapshots, set/update/delete),
   and shows a staff login before anything loads. */
(function(){
  const SUPABASE_URL = "https://akrezmxgtorkuwxxctyk.supabase.co";
  const SUPABASE_KEY = "sb_publishable_tL62keD2HdovsMpI8XAkWg_TPdjaUVh";   // public key, safe in the browser
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: true, autoRefreshToken: true } });

  // app collection -> table, and which columns each table accepts
  const TABLE = { inv_items: "inventory_items", zones: "delivery_zones" };
  const COLS = {
    brands: "id name name_ar active deleted created_at",
    branches: "id brand_id name code address city phone open_time close_time active call_center production created_at",
    categories: "id brand_id name name_ar reference sort deleted created_at",
    products: "id brand_id name name_ar sku category_id price tax_group description image_url channels branch_ids active deleted created_at",
    inventory_items: "id name sku category kind storage_unit ingredient_unit factor cost min_level par_level barcode deleted created_at",
    delivery_zones: "id name branch_id fee min_order eta polygon active deleted created_at",
    devices: "id name type branch_id code activated_at last_seen deleted created_at",
    shifts: "id device_id branch_id cashier opening_cash opened_at closed_at orders sales expected_cash counted_cash difference",
    orders: "id brand_id no channel source type status branch_id device_id shift_id zone_id customer_name phone address lat lng table_no notes items subtotal discount_pct discount delivery_fee total payment agent handled_by created_at",
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

  const listeners = {};          // col -> [cb]
  const timers = {};
  async function fetchAll(col){
    const t = tableOf(col);
    let q = sb.from(t).select("*");
    if(t === "orders") q = q.gte("created_at", new Date(Date.now() - 3*86400000).toISOString()).order("created_at", { ascending:false }).limit(1000);
    else if(t === "shifts") q = q.gte("opened_at", new Date(Date.now() - 7*86400000).toISOString()).limit(1000);
    else q = q.limit(5000);
    const { data, error } = await q;
    if(error) throw error;
    return { docs: data.map(r => ({ id: r.id, data: () => fromRow(col, r) })), metadata:{ fromCache:false, hasPendingWrites:false } };
  }
  function refresh(col){
    clearTimeout(timers[col]);
    timers[col] = setTimeout(async () => {
      try{ const snap = await fetchAll(col); (listeners[col]||[]).forEach(l => l.next(snap)); }
      catch(e){ console.error("load", col, e); (listeners[col]||[]).forEach(l => l.error && l.error({ code:"unavailable", message:e.message })); }
    }, 150);
  }
  const channels = {};
  function collection(col){
    const t = tableOf(col);
    return {
      onSnapshot(next, error){
        (listeners[col] ||= []).push({ next, error });
        refresh(col);
        if(!channels[col]){
          channels[col] = sb.channel("rt-" + t).on("postgres_changes", { event: "*", schema: "public", table: t }, () => refresh(col)).subscribe();
        }
        return () => { listeners[col] = (listeners[col]||[]).filter(l => l.next !== next); };
      },
      doc(id){
        return {
          async set(data){ const { error } = await sb.from(t).upsert(toRow(col, id, data)); if(error) throw error; refresh(col); },
          async update(data){ const row = toRow(col, null, data); if(t==="settings"){ const cur = await sb.from(t).select("data").eq("id", id).maybeSingle(); row.data = { ...(cur.data?.data||{}), ...row.data }; } const { error } = await sb.from(t).update(row).eq("id", id); if(error) throw error; refresh(col); },
          async delete(){ const { error } = await sb.from(t).delete().eq("id", id); if(error) throw error; refresh(col); }
        };
      }
    };
  }
  const dbApi = { collection };

  /* ---------- staff login ---------- */
  let staff = null, readyResolve; const ready = new Promise(r => readyResolve = r);
  const css = `.wk-gate{position:fixed;inset:0;background:#f3f2f7;display:grid;place-items:center;z-index:9999;font-family:Inter,system-ui,sans-serif;padding:20px}
  .wk-card{background:#fff;border-radius:16px;padding:30px;width:min(380px,100%);box-shadow:0 10px 40px rgba(30,20,60,.1)}
  .wk-logo{width:52px;height:52px;border-radius:13px;background:#5b2bc4;color:#fff;display:grid;place-items:center;font-weight:700;font-size:22px;margin:0 auto 12px}
  .wk-card h1{text-align:center;font-size:20px;margin:0 0 4px}.wk-card p{text-align:center;color:#5b5a66;margin:0 0 18px;font-size:14px}
  .wk-card label{display:block;font-size:13px;color:#5b5a66;margin:10px 0 5px;font-weight:500}
  .wk-card input{width:100%;box-sizing:border-box;padding:11px 12px;border:1px solid #e5e3ec;border-radius:10px;font:inherit}
  .wk-card button{width:100%;margin-top:16px;padding:12px;border:0;border-radius:10px;background:#5b2bc4;color:#fff;font:inherit;font-weight:600;cursor:pointer}
  .wk-card button:disabled{opacity:.6}.wk-err{color:#9e0c24;font-size:13px;min-height:18px;margin-top:10px;text-align:center}`;
  function gate(msg){
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
  async function afterLogin(){
    const { data: { user } } = await sb.auth.getUser();
    if(!user) return gate();
    const { data } = await sb.from("staff").select("*").eq("user_id", user.id).maybeSingle();
    if(!data){ await sb.auth.signOut(); return gate("This login isn't set up as staff yet. Ask the owner to add you."); }
    staff = { ...data, email: user.email };
    const el = document.getElementById("wkGate"); if(el) el.style.display = "none";
    readyResolve(dbApi);
  }
  (async () => { const { data: { session } } = await sb.auth.getSession(); if(session) await afterLogin(); else gate(); })();

  const userApi = { id: async () => staff?.user_id, name: async () => staff?.name || staff?.email, role: async () => staff?.role, branchId: async () => staff?.branch_id,
    canEdit: async () => ["owner","admin"].includes(staff?.role), isOwner: async () => staff?.role === "owner", signOut: async () => { await sb.auth.signOut(); location.reload(); } };

  window.WOK = { sb, ready, user: userApi };
  window.claude = { use: async n => n === "db" ? ready : n === "user" ? (await ready, userApi) : null };
})();
