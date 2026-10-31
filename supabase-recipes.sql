-- Slick: product recipes and details (Foodics-style), produced-item ingredients, production batches

-- ---------- products: everything on the Foodics product page ----------
alter table products add column if not exists ingredients jsonb not null default '[]';      -- [{itemId, qty, types:[dinein,pickup,delivery]}] qty in the item's ingredient unit
alter table products add column if not exists pricing_method text not null default 'fixed';  -- fixed | open
alter table products add column if not exists costing_method text not null default 'ingredients'; -- ingredients | fixed
alter table products add column if not exists selling_method text not null default 'unit';   -- unit | weight
alter table products add column if not exists cost numeric;                                   -- used when costing_method = fixed
alter table products add column if not exists barcode text;
alter table products add column if not exists prep_time int;
alter table products add column if not exists calories numeric;
alter table products add column if not exists custom_prices jsonb not null default '{}';      -- {branchId: price}
alter table products add column if not exists inactive_branch_ids text[] not null default '{}';
alter table products add column if not exists out_of_stock_branch_ids text[] not null default '{}';

-- the public ordering page must not see costs or recipes
revoke select on products from anon;
grant select (id, brand_id, name, name_ar, sku, category_id, price, tax_group, description, image_url, channels, branch_ids,
              active, deleted, created_at, pricing_method, selling_method, calories, custom_prices, inactive_branch_ids, out_of_stock_branch_ids)
  on products to anon;

-- ---------- inventory items: recipe of a produced item, max level, costing ----------
alter table inventory_items add column if not exists ingredients jsonb not null default '[]'; -- to produce 1 storage unit: [{itemId, qty}] qty in the ingredient's ingredient unit
alter table inventory_items add column if not exists max_level numeric;
alter table inventory_items add column if not exists name_ar text;
alter table inventory_items add column if not exists costing_method text not null default 'fixed'; -- fixed | transactions

-- ---------- production batches ----------
create sequence if not exists inv_doc_pr;
alter table inventory_docs add column if not exists consumed jsonb not null default '[]';
alter table inventory_docs drop constraint if exists inventory_docs_kind_check;
alter table inventory_docs add constraint inventory_docs_kind_check check (kind in ('quantity','cost','spot','sheet','production'));

create or replace function slick_inv_doc_ref() returns trigger language plpgsql as $$
begin
  if new.ref is null or new.ref = '' then
    new.ref := case new.kind
      when 'quantity'   then 'QA-'  || lpad(nextval('inv_doc_qa')::text, 6, '0')
      when 'cost'       then 'CA-'  || lpad(nextval('inv_doc_ca')::text, 6, '0')
      when 'spot'       then 'SP-'  || lpad(nextval('inv_doc_sp')::text, 6, '0')
      when 'production' then 'PRD-' || lpad(nextval('inv_doc_pr')::text, 6, '0')
      else                   'CS-'  || lpad(nextval('inv_doc_cs')::text, 6, '0') end;
  end if;
  if tg_op = 'UPDATE' and old.status = 'closed' and (new.items is distinct from old.items or new.location_id is distinct from old.location_id or new.status <> 'closed') then
    raise exception 'This document is closed and can''t be changed';
  end if;
  return new;
end $$;

create or replace function public.slick_close_inv_doc(p_id text, p_by text default null)
returns jsonb language plpgsql security invoker set search_path = public as $$
declare d inventory_docs; ln jsonb; ing jsonb; it inventory_items; sub inventory_items; cur numeric; n int := 0;
        use_qty numeric; batch_cost numeric; unit_cost numeric; used jsonb := '{}'::jsonb; k text; v_consumed jsonb := '[]'::jsonb;
begin
  select * into d from inventory_docs where id = p_id for update;
  if d.id is null then raise exception 'Document not found'; end if;
  if d.status = 'closed' then raise exception 'Already closed'; end if;
  if d.kind = 'sheet' then raise exception 'Count sheets are not closed'; end if;
  if jsonb_array_length(d.items) = 0 then raise exception 'Add at least one item'; end if;
  if d.kind in ('quantity','spot','production') and coalesce(d.location_id,'') = '' then raise exception 'Choose a branch or warehouse'; end if;

  for ln in select * from jsonb_array_elements(d.items) loop
    if d.kind = 'quantity' then
      select qty into cur from stock_counts where branch_id = d.location_id and item_id = ln->>'itemId' order by counted_at desc limit 1;
      insert into stock_counts(branch_id, item_id, qty, counted_by, batch, note)
      values (d.location_id, ln->>'itemId',
              greatest(0, coalesce(cur,0) + case when d.direction = 'add' then 1 else -1 end * coalesce((ln->>'qty')::numeric,0)),
              p_by, d.ref, 'Quantity adjustment' || coalesce(': ' || d.reason, ''));
    elsif d.kind = 'cost' then
      update inventory_items set cost = (ln->>'cost')::numeric where id = ln->>'itemId';
    elsif d.kind = 'production' then
      select * into it from inventory_items where id = ln->>'itemId';
      if it.id is null then raise exception 'Item not found'; end if;
      if jsonb_array_length(coalesce(it.ingredients,'[]')) = 0 then raise exception '% has no ingredients. Add them on the item first.', it.name; end if;
      batch_cost := 0;
      for ing in select * from jsonb_array_elements(it.ingredients) loop
        select * into sub from inventory_items where id = ing->>'itemId';
        if sub.id is null then continue; end if;
        -- recipe quantity is in the ingredient unit, stock is kept in the storage unit
        use_qty := coalesce((ing->>'qty')::numeric,0) * coalesce((ln->>'qty')::numeric,0) / nullif(coalesce(sub.factor,1),0);
        used := jsonb_set(used, array[sub.id], to_jsonb(coalesce((used->>sub.id)::numeric,0) + use_qty));
        batch_cost := batch_cost + use_qty * coalesce(sub.cost,0);
      end loop;
      -- add what was produced
      select qty into cur from stock_counts where branch_id = d.location_id and item_id = it.id order by counted_at desc limit 1;
      insert into stock_counts(branch_id, item_id, qty, counted_by, batch, note)
      values (d.location_id, it.id, coalesce(cur,0) + coalesce((ln->>'qty')::numeric,0), p_by, d.ref, 'Production');
      unit_cost := batch_cost / nullif((ln->>'qty')::numeric, 0);
      if unit_cost is not null and coalesce(it.costing_method,'fixed') = 'transactions' then
        update inventory_items set cost = round(unit_cost, 5) where id = it.id;
      end if;
    end if;
    n := n + 1;
  end loop;

  -- production: take the ingredients out of stock (one movement per ingredient)
  if d.kind = 'production' then
    for k in select jsonb_object_keys(used) loop
      select * into sub from inventory_items where id = k;
      select qty into cur from stock_counts where branch_id = d.location_id and item_id = k order by counted_at desc limit 1;
      insert into stock_counts(branch_id, item_id, qty, counted_by, batch, note)
      values (d.location_id, k, greatest(0, coalesce(cur,0) - (used->>k)::numeric), p_by, d.ref, 'Consumption from production');
      v_consumed := v_consumed || jsonb_build_object('itemId', k, 'qty', round((used->>k)::numeric, 5), 'cost', coalesce(sub.cost,0));
    end loop;
  end if;

  update inventory_docs set status = 'closed', submitted_by = p_by, submitted_at = now(), consumed = v_consumed where id = p_id;
  return jsonb_build_object('ref', d.ref, 'items', n, 'consumed', jsonb_array_length(v_consumed));
end $$;
revoke all on function public.slick_close_inv_doc(text,text) from public, anon;
grant execute on function public.slick_close_inv_doc(text,text) to authenticated;

notify pgrst, 'reload schema';
select (select count(*) from products) products, (select count(*) from inventory_items where kind = 'produced') produced_items;
