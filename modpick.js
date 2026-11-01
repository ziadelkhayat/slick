/* Slick: modifier picker shared by the POS, the call center and online ordering.
   SlickMods.pick({ name, basePrice, links, groups, options, money }) -> Promise<null | { options, unitPrice, mods }>
   links:   [{ modifierId, min, max, free }] in display order (from the product)
   groups:  { [modifierId]: { name } }
   options: [{ id, modifierId, name, price, oos }] already filtered for the branch and priced */
(function(){
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
  const css = `.smp-scrim{position:fixed;inset:0;background:rgba(20,16,40,.45);display:flex;align-items:flex-end;justify-content:center;z-index:9998;font-family:Inter,system-ui,sans-serif}
  @media(min-width:640px){.smp-scrim{align-items:center}}
  .smp{background:#fff;width:min(520px,100%);max-height:92vh;display:flex;flex-direction:column;border-radius:16px 16px 0 0;box-shadow:0 10px 40px rgba(30,20,60,.2)}
  @media(min-width:640px){.smp{border-radius:16px}}
  .smp header{display:flex;align-items:center;gap:10px;padding:16px 18px;border-bottom:1px solid #eee}.smp header h3{margin:0;font-size:17px;flex:1}
  .smp header button{border:0;background:#f3f2f7;border-radius:8px;width:32px;height:32px;font-size:18px;cursor:pointer}
  .smp .b{overflow:auto;padding:6px 18px 12px}.smp .g{margin:14px 0 4px;display:flex;align-items:baseline;gap:8px}.smp .g b{font-size:15px}
  .smp .g span{font-size:12px;color:#6b6a75}.smp .g .req{color:#b42318;font-weight:600}
  .smp label{display:flex;align-items:center;gap:10px;padding:10px 4px;border-bottom:1px solid #f1f0f5;cursor:pointer;font-size:15px}
  .smp label input{width:18px;height:18px;accent-color:#5b2bc4}.smp label .p{margin-left:auto;color:#5b5a66;font-size:14px}
  .smp label.dis{opacity:.45;cursor:not-allowed}.smp .oos{font-size:11px;color:#b45309;margin-left:6px}
  .smp footer{display:flex;align-items:center;gap:10px;padding:14px 18px;border-top:1px solid #eee}.smp footer .err{flex:1;color:#b42318;font-size:13px}
  .smp footer button{border:0;border-radius:10px;background:#5b2bc4;color:#fff;font:inherit;font-weight:600;padding:12px 18px;cursor:pointer}`;
  function pick(o){
    const money = o.money || (n => "USD " + (+n||0).toFixed(2));
    const links = (o.links||[]).map(l => ({ ...l, opts: (o.options||[]).filter(x => x.modifierId===l.modifierId) })).filter(l => l.opts.length);
    if(!links.length) return Promise.resolve({ options: [], unitPrice: +o.basePrice||0, mods: "" });
    if(!document.getElementById("smpCss")){ const st = document.createElement("style"); st.id = "smpCss"; st.textContent = css; document.head.appendChild(st); }
    return new Promise(resolve => {
      const sel = links.map(() => new Set());
      const el = document.createElement("div"); el.className = "smp-scrim";
      const priceOf = () => { let t = +o.basePrice||0; links.forEach((l, gi) => { let free = +l.free||0; l.opts.filter(x => sel[gi].has(x.id)).forEach(x => { if(free > 0){ free--; } else t += +x.price||0; }); }); return t; };
      const rule = l => { const mn = +l.min||0, mx = +l.max||0; if(mn && mx && mn===mx) return `Choose ${mn}`; if(mn && mx) return `Choose ${mn} to ${mx}`; if(mn) return `Choose at least ${mn}`; if(mx) return `Up to ${mx}`; return "Optional"; };
      const draw = () => {
        el.innerHTML = `<div class="smp" role="dialog" aria-modal="true" aria-label="${esc(o.name)}"><header><h3>${esc(o.name)}</h3><button type="button" data-x aria-label="Close">×</button></header><div class="b">${links.map((l, gi) => {
          const one = (+l.max||0) === 1, full = (+l.max||0) > 0 && sel[gi].size >= +l.max;
          return `<div class="g"><b>${esc(o.groups?.[l.modifierId]?.name || "Options")}</b><span class="${+l.min?"req":""}">${rule(l)}</span>${+l.free?`<span>${l.free} free</span>`:""}</div>` +
            l.opts.map(x => { const on = sel[gi].has(x.id), dis = !on && full && !one;
              return `<label class="${dis?"dis":""}"><input type="checkbox" name="g${gi}" data-g="${gi}" value="${esc(x.id)}" ${on?"checked":""} ${dis?"disabled":""}>${esc(x.name)}${x.oos?'<span class="oos">Out of stock</span>':""}<span class="p">${+x.price ? "+" + money(x.price) : ""}</span></label>`; }).join("");
        }).join("")}</div><footer><span class="err" data-err></span><button type="button" data-ok>Add · ${money(priceOf())}</button></footer></div>`;
      };
      const close = v => { el.remove(); document.removeEventListener("keydown", onKey); resolve(v); };
      const onKey = e => { if(e.key === "Escape") close(null); };
      el.addEventListener("click", e => {
        if(e.target === el || e.target.closest("[data-x]")) return close(null);
        if(e.target.closest("[data-ok]")){
          const bad = links.findIndex((l, gi) => sel[gi].size < (+l.min||0));
          if(bad >= 0){ el.querySelector("[data-err]").textContent = `${o.groups?.[links[bad].modifierId]?.name || "Options"}: ${rule(links[bad]).toLowerCase()}`; return; }
          const chosen = []; links.forEach((l, gi) => { let free = +l.free||0; l.opts.filter(x => sel[gi].has(x.id)).forEach(x => { const charge = free > 0 ? 0 : (+x.price||0); if(free > 0) free--; chosen.push({ id:x.id, modifierId:l.modifierId, name:x.name, price:charge }); }); });
          return close({ options: chosen, unitPrice: +priceOf().toFixed(2), mods: chosen.map(x => x.name).join(", ") });
        }
      });
      el.addEventListener("change", e => {
        const i = e.target.closest("[data-g]"); if(!i) return; const gi = +i.dataset.g, l = links[gi];
        if((+l.max||0) === 1){ if(i.checked){ sel[gi].clear(); sel[gi].add(i.value); } else sel[gi].delete(i.value); }
        else if(i.checked){ if(!(+l.max) || sel[gi].size < +l.max) sel[gi].add(i.value); } else sel[gi].delete(i.value);
        const y = el.querySelector(".b")?.scrollTop; draw(); const b = el.querySelector(".b"); if(b) b.scrollTop = y;
      });
      document.addEventListener("keydown", onKey);
      draw(); document.body.appendChild(el);
    });
  }
  // the same options on a line mean the same item (so the cart can merge them)
  const key = (productId, options) => productId + "|" + (options||[]).map(x => x.id).sort().join(",");
  window.SlickMods = { pick, key };
})();
