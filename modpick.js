/* Slick: modifier picker shared by the POS, the call center and web ordering.
   SlickMods.pick({ name, basePrice, links, groups, options, money }) -> Promise<null | { options, unitPrice, mods }>
   SlickMods.variant({ name, setName, variants:[{ name, price }], money }) -> Promise<null | { name, price }>
   links:   [{ modifierId, min, max, free, multi }] in display order (from the product)
            min/max count every option picked (2 × Cheese counts as 2); multi = the same option can be picked more than once
   groups:  { [modifierId]: { name } }
   options: [{ id, modifierId, name, price, oos }] already filtered for the branch and priced */
(function(){
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
  // the number pad is for the POS (touch screen); the back office and call center use a keyboard
  const PAD = /pos\.html/i.test(location.pathname) || !!window.SLICK_OFFLINE;
  const touch = (() => { try{ return matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0; }catch(e){ return false; } })();
  const css = `.smp-scrim{position:fixed;inset:0;background:rgba(20,16,40,.45);display:flex;align-items:flex-end;justify-content:center;z-index:9998;font-family:Inter,system-ui,sans-serif}
  @media(min-width:640px){.smp-scrim{align-items:center}}
  .smp{background:#fff;width:min(520px,100%);max-height:92vh;display:flex;flex-direction:column;border-radius:16px 16px 0 0;box-shadow:0 10px 40px rgba(30,20,60,.2)}
  @media(min-width:640px){.smp{border-radius:16px}}
  .smp header{display:flex;align-items:center;gap:10px;padding:16px 18px;border-bottom:1px solid #eee}.smp header h3{margin:0;font-size:17px;flex:1}
  .smp header button{border:1px solid #e5e3ec;background:#fff;border-radius:10px;height:40px;padding:0 16px;font:inherit;font-size:15px;font-weight:600;color:#1c1b22;cursor:pointer}
  .smp .b{overflow:auto;padding:6px 18px 12px;flex:1 1 auto;min-height:0}.smp header,.smp footer{flex:none}.smp .g{margin:14px 0 4px;display:flex;align-items:baseline;gap:8px}.smp .g b{font-size:15px}
  .smp .g span{font-size:12px;color:#6b6a75}.smp .g .req{color:#b42318;font-weight:600}
  .smp label{display:flex;align-items:center;gap:10px;padding:10px 4px;border-bottom:1px solid #f1f0f5;cursor:pointer;font-size:15px}
  .smp label input{width:18px;height:18px;accent-color:#5b2bc4}.smp label input[type=radio]{appearance:none;-webkit-appearance:none;width:24px!important;height:24px!important;flex:none;margin:0;border:2px solid #cfcbe0;border-radius:50%;background:#fff;cursor:pointer;transition:border-color .15s,box-shadow .15s}.smp label input[type=radio]:checked{border-color:var(--acc,#5b2bc4);box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 12px var(--acc,#5b2bc4)}.smp label .p{margin-left:auto;color:#5b5a66;font-size:14px}
  .smp label.dis{opacity:.45;cursor:not-allowed}.smp .oos{font-size:11px;color:#b45309;margin-left:6px}
  .smp footer{display:flex;align-items:center;gap:10px;padding:14px 18px;border-top:1px solid #eee}.smp footer .err{flex:1;color:#b42318;font-size:13px}
  .smp label.qrow{cursor:default}.smp .qs{margin-left:10px;display:inline-flex;align-items:center;gap:8px}
  .smp .qs button{width:30px;height:30px;border-radius:50%;border:1px solid #d9d4ee;background:#fff;color:#5b2bc4;font-size:17px;font-weight:700;cursor:pointer;line-height:1}
  .smp .qs button:disabled{opacity:.35;cursor:not-allowed}
  .smp footer .qs{gap:12px;font-weight:700}.smp footer .qs b{min-width:20px;font-size:17px}.smp footer .qs button:disabled{opacity:.35}.smp .qbig{display:flex;align-items:center;justify-content:center;gap:22px;margin:14px 0 6px}.smp .qbig b{min-width:44px;text-align:center;font-size:28px;font-weight:800}.smp .qbig button{width:64px;height:64px;border-radius:16px;border:0;background:#f3f1f8;color:#1b1830;font-size:30px;font-weight:500;cursor:pointer}.smp .qbig button:active{background:#efebff;color:#6a4cf5}.smp .qbig button:disabled{opacity:.35}.smp.narrow footer button{padding:12px 14px}.smp .og label:has(input:checked),.smp .og label.qrow.on{border-color:#e5e3ec!important;background:#fff!important;box-shadow:none!important;color:var(--acc,#5b2bc4)!important;font-weight:700!important}.smp .og label.qtap{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}.smp footer .qs button{width:44px;height:44px;border-radius:12px;border:0;background:#f7f6fb;color:#1b1830;font-size:22px;font-weight:500}.smp footer .qs button:active{background:#efebff;color:#6a4cf5}.smp .qs b{min-width:16px;text-align:center}
  .smp label.qrow.on{background:#f6f2ff}.smp .smnp{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px}.smp.np .smnp{display:grid}.smp .smnp button{height:54px;border:1px solid #e4e1ef;border-radius:12px;background:#fff;font:inherit;font-size:20px;font-weight:600;cursor:pointer}.smp .smnp button:active{background:#efeaff}
  .smp .dz{display:flex;gap:6px;align-items:center}.smp .dz button{border:1px solid #d9d4ee;background:#fff;border-radius:8px;padding:8px 0;width:56px;text-align:center;font:inherit;font-weight:600;cursor:pointer}.smp .dz button.on{background:#efe9fb;border-color:#5b2bc4;color:#5b2bc4}.smp .dz input{flex:1;border:1px solid #ddd8ea;border-radius:10px;padding:9px 10px;font:inherit}
  .smp{width:min(680px,100%)}.smp .og{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;margin:8px 0 6px}
  .smp .og label{position:relative;flex-direction:column;align-items:flex-start;justify-content:space-between;gap:4px;min-height:74px;padding:10px 12px;border:1.5px solid #e4e1ef;border-radius:12px;background:#fff;font-weight:600;font-size:14.5px;line-height:1.25;user-select:none;-webkit-user-select:none}
  .smp .og label input{position:absolute;opacity:0;width:1px!important;height:1px!important;pointer-events:none}
  .smp .og label:has(input:checked),.smp .og label.qrow.on{border-color:var(--acc,#5b2bc4);background:#f3eeff;box-shadow:inset 0 0 0 1px var(--acc,#5b2bc4)}
  .smp .og label:has(input:checked)::after{content:"✓";position:absolute;top:6px;right:8px;width:20px;height:20px;border-radius:50%;background:var(--acc,#5b2bc4);color:#fff;font-size:12px;display:flex;align-items:center;justify-content:center}
  .smp .og label .p{margin-left:0;font-weight:500;font-size:13px}.smp .og label .oos{margin-left:0}
  .smp .og label.qrow .qs{margin-left:0;margin-top:2px}.smp .og label.qrow .qs button{width:34px;height:34px}
  .smp .og{grid-template-columns:repeat(4,minmax(0,1fr))!important}@media(max-width:560px){.smp .og{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
  .smp .og label{height:108px;min-height:0!important;box-sizing:border-box;overflow:hidden;justify-content:flex-start!important}.smp .og label>*{flex:none}.smp .og label .p{margin-top:0}.smp .og label.qrow .qs{margin-top:auto!important}
  .smp .og label{display:flex;align-items:center!important;justify-content:center!important;text-align:center}.smp .og label.qrow .qs{margin-top:6px!important;justify-content:center}.smp .og label .nm{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  .smp .og label:has(input:checked)::after{display:none!important}.smp .og label.qtap{position:relative;cursor:pointer}.smp .og label.qtap .qn{position:absolute;top:6px;right:8px;min-width:22px;height:22px;padding:0 6px;border-radius:11px;background:var(--acc,#5b2bc4);color:#fff;font-size:12.5px;font-weight:700;display:flex;align-items:center;justify-content:center;box-sizing:border-box}.smp .og label.qtap .qminus{position:absolute;top:0;left:0;bottom:0;width:25%;display:flex;align-items:center;justify-content:center;border-right:1px dashed color-mix(in srgb,var(--acc,#5b2bc4) 35%,transparent);color:var(--acc,#5b2bc4);font-size:22px;font-weight:600}
  .smp.narrow{width:min(420px,100%)}.smp.narrow .smnp button{height:50px}
  .smp textarea{width:100%;box-sizing:border-box;border:1px solid #ddd8ea;border-radius:10px;padding:9px 10px;font:inherit;font-size:14px;resize:vertical}
  .smp footer button{border:0;border-radius:10px;background:#5b2bc4;color:#fff;font:inherit;font-weight:600;padding:12px 18px;min-height:48px;cursor:pointer}.smp footer button.smc{background:#fff;color:#1c1b22;border:1px solid #e5e3ec}`;
  // o.only: "mods" = just the modifiers (no note / discount), "extras" = just the note and discount, "disc" = just the discount
  function pick(o){
    const money = o.money || (n => "USD " + (+n||0).toFixed(2));
    const links = (o.links||[]).map(l => ({ ...l, opts: (o.options||[]).filter(x => x.modifierId===l.modifierId) })).filter(l => l.opts.length);
    if(!links.length && !o.edit) return Promise.resolve({ options: [], unitPrice: +o.basePrice||0, mods: "" });
    if(!document.getElementById("smpCss")){ const st = document.createElement("style"); st.id = "smpCss"; st.textContent = css; document.head.appendChild(st); }
    return new Promise(resolve => {
      const sel = links.map(() => new Map());
      const cnt0 = gi => [...sel[gi].values()].reduce((a, n) => a + n, 0);                     // option id -> how many
      // editing a cart line: start from what was picked, plus its quantity and note
      // Foodics-style default options: preselected on a new line
      if(!(o.initial||[]).length) links.forEach((l, gi) => (l.defaults||[]).forEach(id => { if(l.opts.some(y => y.id===id) && !((+l.max||0) > 0 && cnt0(gi) >= +l.max)) sel[gi].set(id, 1); }));
      (o.initial||[]).forEach(x => { const gi = links.findIndex(l => l.modifierId===x.modifierId && l.opts.some(y => y.id===x.id)); if(gi >= 0) sel[gi].set(x.id, (sel[gi].get(x.id)||0) + 1); });
      let qty = Math.max(1, +o.qty||1), note = o.note || "", discT = o.discType || "pct", discV = o.discValue != null && o.discValue !== "" ? String(o.discValue) : "";
      // item discount (editing only, when the person may give one): a percent of the line or an amount off it
      const discOf = () => { const line = priceOf() * qty, v = +String(discV).replace(",", ".") || 0; return +(discT === "amt" ? Math.min(v, line) : line * Math.min(v, 100) / 100).toFixed(2); };
      const cnt = gi => [...sel[gi].values()].reduce((a, n) => a + n, 0);
      const units = (l, gi) => { const out = []; l.opts.forEach(x => { for(let k = 0; k < (sel[gi].get(x.id)||0); k++) out.push(x); }); return out; };
      const el = document.createElement("div"); el.className = "smp-scrim"; const lpQt = { t:0, done:false };
      const priceOf = () => { let t = +o.basePrice||0; links.forEach((l, gi) => { let free = +l.free||0; units(l, gi).forEach(x => { if(free > 0) free--; else t += +x.price||0; }); }); return t; };
      const rule = l => { const mn = +l.min||0, mx = +l.max||0; if(mn && mx && mn===mx) return `Choose ${mn}`; if(mn && mx) return `Choose ${mn} to ${mx}`; if(mn) return `Choose at least ${mn}`; if(mx) return `Up to ${mx}`; return "Optional"; };
      const draw = () => {
        el.innerHTML = `<div class="smp${o.only==="extras" || o.only==="disc" || (o.qtyEdit && !links.length) ? " narrow" : ""}" role="dialog" aria-modal="true" aria-label="${esc(o.name)}"><header><h3>${esc(o.name)}</h3></header><div class="b">${o.qtyEdit ? `<div class="qbig"><button type="button" data-qq="-1" aria-label="Less"${qty <= Math.max(1, +o.minQty||1) ? " disabled" : ""}>−</button><b>${qty}</b><button type="button" data-qq="1" aria-label="More">+</button></div>` : ""}${(o.only==="extras" || o.only==="disc" ? [] : links).map((l, gi) => {
          const one = (+l.max||0) === 1, full = (+l.max||0) > 0 && cnt(gi) >= +l.max;
          return `<div class="g"><b>${esc(o.groups?.[l.modifierId]?.name || "Options")}</b><span class="${+l.min?"req":""}">${rule(l)}</span>${+l.free?`<span>${l.free} free</span>`:""}</div><div class="og">` +
            l.opts.map(x => { const n = sel[gi].get(x.id)||0, on = n > 0;
              // a repeatable option: tap the right ¾ of the tile to add one, the left ¼ to take one away
              if(l.multi && !one) return `<label class="qrow qtap${on?" on":""}${(full && !on) || x.oos ? " dis" : ""}" data-qt="${gi}:${esc(x.id)}" role="button" aria-label="${esc(x.name)}: ${n}">${n > 1 ? n + " × " : ""}${esc(x.name)}${x.oos?'<span class="oos">Out of stock</span>':""}<span class="p">${+x.price ? "+" + money(x.price) : ""}</span></label>`;
              const dis = !on && ((full && !one) || x.oos);
              return `<label class="${dis?"dis":""}"><input type="checkbox" name="g${gi}" data-g="${gi}" value="${esc(x.id)}" ${on?"checked":""} ${dis?"disabled":""}>${esc(x.name)}${x.oos?'<span class="oos">Out of stock</span>':""}<span class="p">${+x.price ? "+" + money(x.price) : ""}</span></label>`; }).join("") + `</div>`;
        }).join("")}${o.edit && o.only!=="mods" && o.only!=="disc" ? `<div class="g"><b>Item note</b></div><textarea data-note rows="2">${esc(note)}</textarea>` : ""}${o.edit && o.allowDiscount && o.only!=="mods" ? `<div class="g"><b>Item discount</b>${discOf() ? `<span>−${money(discOf())}</span>` : ""}</div>
          <div class="dz"><button type="button" data-dt="pct" class="${discT==="pct"?"on":""}">%</button><button type="button" data-dt="amt" class="${discT==="amt"?"on":""}">${esc(o.cur || String(money(0)).replace(/[-\d.,\s]+/g, "").trim() || "USD")}</button><input data-dv inputmode="${touch && PAD ? "none" : "decimal"}" aria-label="${discT==="amt"?"Amount off":"Percent off"}" value="${esc(discV)}"></div>${PAD ? `<div class="smnp">${["1","2","3","4","5","6","7","8","9",".","0","⌫"].map(k => `<button type="button" data-np="${k}" aria-label="${k==="⌫"?"Delete":k}">${k}</button>`).join("")}</div>` : ""}` : ""}</div><footer><span class="err" data-err></span>${o.canRemove ? `<button type="button" data-rm class="smc" style="color:#b42318">Remove</button>` : ""}<button type="button" data-x class="smc">Cancel</button><button type="button" data-ok>${o.edit ? "Save" : "Add · " + money(priceOf() * qty)}</button></footer></div>`;
      };
      const redraw = () => { const y = el.querySelector(".b")?.scrollTop; draw(); const b = el.querySelector(".b"); if(b) b.scrollTop = y; };
      const close = v => { el.remove(); document.removeEventListener("keydown", onKey); resolve(v); };
      const onKey = e => { if(e.key === "Escape") close(null); };
      el.addEventListener("pointerdown", e => { if(e.target.closest("[data-np]")) e.preventDefault(); });   // repeatable options: right ¾ of the tile adds one, left ¼ takes one away
      el.addEventListener("contextmenu", e => { if(e.target.closest("[data-qt]")) e.preventDefault(); });
      el.addEventListener("focusin", e => { if(e.target.matches("[data-dv]")) e.target.closest(".smp")?.classList.add("np"); });
      el.addEventListener("click", e => {
        const np = e.target.closest("[data-np]"); if(np){ e.preventDefault(); const i = el.querySelector("[data-dv]"); if(!i) return; let v = i.value, k = np.dataset.np;
          if(k==="⌫") v = v.slice(0, -1); else if(k==="."){ if(!v.includes(".")) v = (v || "0") + "."; } else v = v==="0" ? k : v + k;
          i.value = v; i.dispatchEvent(new Event("input", { bubbles:true })); return; }
        if(e.target === el || e.target.closest("[data-x]")) return close(null);
        const dt = e.target.closest("[data-dt]"); if(dt){ e.preventDefault(); discT = dt.dataset.dt; return redraw(); }
        const qq = e.target.closest("[data-qq]"); if(qq){ e.preventDefault(); qty = Math.max(Math.max(1, +o.minQty||1), qty + (+qq.dataset.qq)); return redraw(); }
        if(e.target.closest("[data-rm]")) return close({ remove: true });
        const qt = e.target.closest("[data-qt]");
        if(qt){ e.preventDefault(); const r = qt.getBoundingClientRect(), d = (e.clientX - r.left) < r.width * 0.25 ? -1 : 1, [g, id] = qt.dataset.qt.split(":"), gi = +g, l = links[gi], x = l.opts.find(y => y.id===id), n = (sel[gi].get(id)||0) + d;
          if(d > 0 && (x?.oos || ((+l.max||0) > 0 && cnt(gi) >= +l.max))) return;
          if(n <= 0) sel[gi].delete(id); else sel[gi].set(id, n); return redraw(); }
        const q = e.target.closest("[data-q]");
        if(q){ e.preventDefault(); const [g, id, d] = q.dataset.q.split(":"), gi = +g, l = links[gi], n = (sel[gi].get(id)||0) + (+d);
          if(+d > 0 && (+l.max||0) > 0 && cnt(gi) >= +l.max) return;
          if(n <= 0) sel[gi].delete(id); else sel[gi].set(id, n); return redraw(); }
        if(e.target.closest("[data-ok]")){
          const bad = links.findIndex((l, gi) => cnt(gi) < (+l.min||0));
          if(bad >= 0){ el.querySelector("[data-err]").textContent = `${o.groups?.[links[bad].modifierId]?.name || "Options"}: ${rule(links[bad]).toLowerCase()}`; return; }
          const chosen = []; links.forEach((l, gi) => { let free = +l.free||0; units(l, gi).forEach(x => { const charge = free > 0 ? 0 : (+x.price||0); if(free > 0) free--; chosen.push({ id:x.id, modifierId:l.modifierId, name:x.name, price:charge }); }); });
          const tally = []; chosen.forEach(x => { const t = tally.find(y => y.name===x.name); if(t) t.n++; else tally.push({ name:x.name, n:1 }); });
          return close({ options: chosen, unitPrice: +priceOf().toFixed(2), mods: tally.map(t => (t.n > 1 ? t.n + "× " : "") + t.name).join(", "), ...(o.edit ? { qty, note: note.trim(), ...(o.allowDiscount && o.only!=="mods" ? { disc: discOf(), discType: discT, discValue: +String(discV).replace(",", ".") || 0 } : {}) } : {}) });
        }
      });
      el.addEventListener("input", e => { if(e.target.matches("[data-note]")) note = e.target.value;
        if(e.target.matches("[data-dv]")){ discV = e.target.value; const b = el.querySelector("[data-ok]"); if(b) b.textContent = "Save"; } });
      el.addEventListener("change", e => {
        const i = e.target.closest("[data-g]"); if(!i) return; const gi = +i.dataset.g, l = links[gi];
        if((+l.max||0) === 1){ sel[gi].clear(); if(i.checked) sel[gi].set(i.value, 1); }
        else if(i.checked){ if(!(+l.max) || cnt(gi) < +l.max) sel[gi].set(i.value, 1); } else sel[gi].delete(i.value);
        redraw();
      });
      document.addEventListener("keydown", onKey);
      draw(); document.body.appendChild(el);
    });
  }
  // the same options on a line mean the same item (so the cart can merge them)
  const key = (productId, options) => productId + "|" + (options||[]).map(x => x.id).sort().join(",");
  // the text shown on tickets and receipts: the options, then the cashier's note
  const label = (mods, note) => [mods, note ? "Note: " + note : ""].filter(Boolean).join(" · ");
  // product variants (Size: Small / Medium / Large): pick one before the modifiers. Resolves the chosen { name, price } or null
  function variant(o){
    const money = o.money || (n => "USD " + (+n||0).toFixed(2)), list = (o.variants||[]).filter(v => v && v.name);
    if(list.length < 2) return Promise.resolve(list[0] || null);
    if(!document.getElementById("smpCss")){ const st = document.createElement("style"); st.id = "smpCss"; st.textContent = css; document.head.appendChild(st); }
    if(!document.getElementById("smpVarCss")){ const st = document.createElement("style"); st.id = "smpVarCss"; st.textContent = `.smp .vgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;padding:4px 0 8px}.smp .vbtn{display:flex;flex-direction:column;gap:6px;align-items:flex-start;border:1px solid #ddd8ea;background:#fff;border-radius:12px;padding:14px;font:inherit;cursor:pointer;text-align:left}.smp .vbtn:hover{border-color:#5b2bc4;background:#f6f2ff}.smp .vbtn b{font-size:15px}.smp .vbtn span{color:#5b2bc4;font-weight:600}`; document.head.appendChild(st); }
    return new Promise(resolve => {
      const el = document.createElement("div"); el.className = "smp-scrim"; const lpQt = { t:0, done:false };
      const close = v => { document.removeEventListener("keydown", onKey); el.remove(); resolve(v); };
      const onKey = e => { if(e.key === "Escape") close(null); };
      el.innerHTML = `<div class="smp" role="dialog" aria-modal="true" aria-label="${esc(o.name)}"><header><h3>${esc(o.name)}</h3><button type="button" data-x class="smx">Cancel</button></header><div class="b"><div class="g"><b>${esc(o.setName || "Choose a variant")}</b><span>Choose 1</span></div><div class="vgrid">${list.map((v, i) => `<button type="button" class="vbtn" data-v="${i}"><b>${esc(v.name)}</b><span>${money(v.price)}</span></button>`).join("")}</div></div></div>`;
      el.addEventListener("click", e => { if(e.target === el || e.target.closest("[data-x]")) return close(null); const b = e.target.closest("[data-v]"); if(b) close(list[+b.dataset.v]); });
      document.addEventListener("keydown", onKey);
      document.body.appendChild(el);
    });
  }
  window.SlickMods = { pick, key, label, variant };
})();
