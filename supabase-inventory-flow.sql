-- Slick: inventory flow (Foodics-style)
-- sales deduct recipe ingredients (order transactions), suppliers, purchase orders, transfer orders, transfers

-- stock may go below zero when sales outrun counts (Foodics allows it); counts fix it later
alter table stock_counts drop constraint if exists stock_counts_qty_check;

-- one stock movement: new level = latest level + delta
create or replace function slick_move(p_loc text, p_item text, p_delta numeric, p_by text, p_batch text, p_note text)
returns numeric language plpgsql security invoker set search_path = public as $$
declare cur numeric;
begin
  if coalesce(p_delta,0) = 0 then return null; end if;
  select qty into cur from stock_counts where branch_id = p_loc and item_id = p_item order by counted_at desc limit 1;
  insert into stock_counts(branch_id, item_id, qty, counted_by, batch, note) values (p_loc, p_item, coalesce(cur,0) + p_delta, p_by, p_batch, p_note);
  return coalesce(cur,0) + p_delta;
end $$;

-- ---------- suppliers ----------
create table if not exists suppliers (
  id text primary key default 'sup_' || replace(gen_random_uuid()::text, '-', ''),
  name text not null, code text, contact_name text, phone text, email text, address text, notes text,
  deleted boolean not null default false, created_at timestamptz not null default now()
);
alter table suppliers enable row level security;
drop policy if exists "staff read suppliers" on suppliers;
drop policy if exists "admin write suppliers" on suppliers;
create policy "staff read suppliers"  on suppliers for select using (staff_role() is not null);
create policy "admin write suppliers" on suppliers for all using (staff_role() in ('owner','admin')) with check (staff_role() in ('owner','admin'));

-- ---------- documents: purchase orders, transfer orders, transfers ----------
alter table inventory_docs add column if not exists supplier_id text;
alter table inventory_docs add column if not exists dest_id text;          -- transfer destination / transfer-order source warehouse
alter table inventory_docs add column if not exists linked_id text;        -- transfer order <-> transfer
alter table inventory_docs add column if not exists received_at timestamptz;
alter table inventory_docs add column if not exists received_by text;
alter table inventory_docs drop constraint if exists inventory_docs_kind_check;
alter table inventory_docs add constraint inventory_docs_kind_check check (kind in ('quantity','cost','spot','sheet','production','purchase','torder','transfer'));
alter table inventory_docs drop constraint if exists inventory_docs_status_check;
alter table inventory_docs add constraint inventory_docs_status_check check (status in ('draft','pending','closed','rejected'));
create sequence if not exists inv_doc_po;
create sequence if not exists inv_doc_to;
create sequence if not exists inv_doc_tr;

create or replace function slick_inv_doc_ref() returns trigger language plpgsql as $$
begin
  if new.ref is null or new.ref = '' then
    new.ref := case new.kind
      when 'quantity'   then 'QA-'  || lpad(nextval('inv_doc_qa')::text, 6, '0')
      when 'cost'       then 'CA-'  || lpad(nextval('inv_doc_ca')::text, 6, '0')
      when 'spot'       then 'SP-'  || lpad(nextval('inv_doc_sp')::text, 6, '0')
      when 'production' then 'PRD-' || lpad(nextval('inv_doc_pr')::text, 6, '0')
      when 'purchase'   then 'PO-'  || lpad(nextval('inv_doc_po')::text, 6, '0')
      when 'torder'     then 'TO-'  || lpad(nextval('inv_doc_to')::text, 6, '0')
      when 'transfer'   then 'TR-'  || lpad(nextval('inv_doc_tr')::text, 6, '0')
      else                   'CS-'  || lpad(nextval('inv_doc_cs')::text, 6, '0') end;
  end if;
  if tg_op = 'UPDATE' and old.status = 'closed' and (new.items is distinct from old.items or new.location_id is distinct from old.location_id or new.status <> 'closed') then
    raise exception 'This document is closed and can''t be changed';
  end if;
  return new;
end $$;

-- workflow actions for purchase orders, transfer orders and transfers
--   purchase: submit (draft -> pending), receive (pending -> closed, adds stock, updates cost), reject
--   torder:   submit (draft -> pending), fulfil (pending -> closed, creates a draft transfer), reject
--   transfer: send (draft -> pending, takes stock out of the source), receive (pending -> closed, adds to destination)
-- p_lines (receive only): [{itemId, qty, cost}] what actually arrived
create or replace function public.slick_doc_action(p_id text, p_action text, p_by text default null, p_lines jsonb default null)
returns jsonb language plpgsql security invoker set search_path = public as $$
declare d inventory_docs; ln jsonb; it inventory_items; cur numeric; q numeric; c numeric; new_id text; lines jsonb;
begin
  select * into d from inventory_docs where id = p_id for update;
  if d.id is null then raise exception 'Document not found'; end if;
  if d.kind not in ('purchase','torder','transfer') then raise exception 'Not a purchase or transfer document'; end if;

  if p_action in ('submit','send') then
    if d.status <> 'draft' then raise exception 'Only drafts can be submitted'; end if;
    if jsonb_array_length(d.items) = 0 then raise exception 'Add at least one item'; end if;
    if coalesce(d.location_id,'') = '' then raise exception 'Choose the branch or warehouse'; end if;
    if d.kind = 'purchase' and coalesce(d.supplier_id,'') = '' then raise exception 'Choose a supplier'; end if;
    if d.kind in ('transfer','torder') and coalesce(d.dest_id,'') = '' then raise exception 'Choose where it goes'; end if;
    if d.kind in ('transfer','torder') and d.dest_id = d.location_id then raise exception 'Source and destination must be different'; end if;
    if d.kind = 'transfer' then
      for ln in select * from jsonb_array_elements(d.items) loop
        perform slick_move(d.location_id, ln->>'itemId', -coalesce((ln->>'qty')::numeric,0), p_by, d.ref, 'Transfer out to ' || d.dest_id);
      end loop;
    end if;
    update inventory_docs set status = 'pending', submitted_by = p_by, submitted_at = now() where id = p_id;
    return jsonb_build_object('ref', d.ref, 'status', 'pending');

  elsif p_action = 'receive' then
    if d.status <> 'pending' then raise exception 'Only pending documents can be received'; end if;
    if d.kind = 'torder' then raise exception 'Fulfil a transfer order by creating its transfer'; end if;
    lines := coalesce(p_lines, d.items);
    for ln in select * from jsonb_array_elements(lines) loop
      q := coalesce((ln->>'qty')::numeric, 0);
      if q <= 0 then continue; end if;
      if d.kind = 'purchase' then
        select * into it from inventory_items where id = ln->>'itemId';
        c := coalesce((ln->>'cost')::numeric, it.cost, 0);
        select qty into cur from stock_counts where branch_id = d.location_id and item_id = it.id order by counted_at desc limit 1;
        -- weighted average cost for items costed from transactions
        if coalesce(it.costing_method,'fixed') = 'transactions' or coalesce(it.cost,0) = 0 then
          update inventory_items set cost = round(((greatest(coalesce(cur,0),0) * coalesce(it.cost,0)) + q * c) / nullif(greatest(coalesce(cur,0),0) + q, 0), 5) where id = it.id;
        end if;
        perform slick_move(d.location_id, it.id, q, p_by, d.ref, 'Purchase received');
      else
        perform slick_move(d.dest_id, ln->>'itemId', q, p_by, d.ref, 'Transfer in from ' || d.location_id);
      end if;
    end loop;
    update inventory_docs set status = 'closed', items = lines, received_by = p_by, received_at = now() where id = p_id;
    return jsonb_build_object('ref', d.ref, 'status', 'closed');

  elsif p_action = 'fulfil' then
    if d.kind <> 'torder' or d.status <> 'pending' then raise exception 'Only pending transfer orders can be fulfilled'; end if;
    -- the warehouse (dest_id) sends to the branch that asked (location_id)
    insert into inventory_docs(kind, location_id, dest_id, items, status, created_by, notes, linked_id, business_date)
    values ('transfer', d.dest_id, d.location_id, coalesce(p_lines, d.items), 'draft', p_by, 'From transfer order ' || d.ref, d.id, current_date)
    returning id into new_id;
    update inventory_docs set status = 'closed', linked_id = new_id, received_by = p_by, received_at = now() where id = p_id;
    return jsonb_build_object('ref', d.ref, 'transfer', new_id);

  elsif p_action = 'reject' then
    if d.status <> 'pending' then raise exception 'Only pending documents can be rejected'; end if;
    if d.kind = 'transfer' then raise exception 'A sent transfer has to be received'; end if;
    update inventory_docs set status = 'rejected', received_by = p_by, received_at = now() where id = p_id;
    return jsonb_build_object('ref', d.ref, 'status', 'rejected');
  end if;
  raise exception 'Unknown action %', p_action;
end $$;
revoke all on function public.slick_doc_action(text,text,text,jsonb) from public, anon;
grant execute on function public.slick_doc_action(text,text,text,jsonb) to authenticated;

-- ---------- order transactions: every sale takes its recipe out of the branch stock ----------
create table if not exists order_transactions (
  id text primary key default 'ot_' || replace(gen_random_uuid()::text, '-', ''),
  ref text, kind text not null check (kind in ('consumption','return')),
  order_id text not null, order_no text, branch_id text,
  items jsonb not null default '[]',            -- [{itemId, qty, cost}] qty in storage units
  total_cost numeric not null default 0,
  created_at timestamptz not null default now()
);
create unique index if not exists order_transactions_once on order_transactions(order_id, kind);
create index if not exists order_transactions_recent on order_transactions(created_at desc);
alter table order_transactions enable row level security;
drop policy if exists "staff read order tx" on order_transactions;
create policy "staff read order tx" on order_transactions for select using (staff_role() is not null);

create or replace function slick_order_stock() returns trigger language plpgsql security definer set search_path = public as $$
declare li jsonb; op jsonb; g jsonb; p products; mo modifier_options; it inventory_items; used jsonb := '{}'::jsonb; k text;
        q numeric; out_items jsonb := '[]'::jsonb; total numeric := 0; ot order_transactions; typ text;
begin
  if new.branch_id is null then return new; end if;
  typ := case when new.type in ('dinein','pickup','delivery') then new.type else 'pickup' end;

  -- sale completed: consume
  if new.status = 'closed' and (tg_op = 'INSERT' or old.status is distinct from 'closed')
     and not exists (select 1 from order_transactions where order_id = new.id and kind = 'consumption') then
    for li in select * from jsonb_array_elements(coalesce(new.items,'[]'::jsonb)) loop
      select * into p from products where id = li->>'productId';
      if p.id is not null and coalesce(p.costing_method,'ingredients') = 'ingredients' then
        for g in select * from jsonb_array_elements(coalesce(p.ingredients,'[]'::jsonb)) loop
          if g ? 'types' and not (g->'types') ? typ then continue; end if;
          used := jsonb_set(used, array[g->>'itemId'], to_jsonb(coalesce((used->>(g->>'itemId'))::numeric,0) + coalesce((g->>'qty')::numeric,0) * coalesce((li->>'qty')::numeric,1)));
        end loop;
      end if;
      for op in select * from jsonb_array_elements(coalesce(li->'options','[]'::jsonb)) loop
        select * into mo from modifier_options where id = op->>'id';
        if mo.id is null or coalesce(mo.costing_method,'ingredients') <> 'ingredients' then continue; end if;
        for g in select * from jsonb_array_elements(coalesce(mo.ingredients,'[]'::jsonb)) loop
          if g ? 'types' and not (g->'types') ? typ then continue; end if;
          used := jsonb_set(used, array[g->>'itemId'], to_jsonb(coalesce((used->>(g->>'itemId'))::numeric,0) + coalesce((g->>'qty')::numeric,0) * coalesce((li->>'qty')::numeric,1)));
        end loop;
      end loop;
    end loop;
    if used = '{}'::jsonb then return new; end if;
    for k in select jsonb_object_keys(used) loop
      select * into it from inventory_items where id = k;
      if it.id is null then continue; end if;
      q := (used->>k)::numeric / nullif(coalesce(it.factor,1),0);           -- recipe is in ingredient units, stock in storage units
      perform slick_move(new.branch_id, k, -q, 'Sales', 'OC-' || coalesce(new.no::text, new.id), 'Consumption from order');
      out_items := out_items || jsonb_build_object('itemId', k, 'qty', round(q, 5), 'cost', coalesce(it.cost,0));
      total := total + q * coalesce(it.cost,0);
    end loop;
    insert into order_transactions(ref, kind, order_id, order_no, branch_id, items, total_cost)
    values ('OC-' || coalesce(new.no::text, new.id), 'consumption', new.id, new.no::text, new.branch_id, out_items, round(total, 5))
    on conflict do nothing;

  -- voided after it was consumed: put the ingredients back
  elsif new.status = 'void' and tg_op = 'UPDATE' and old.status is distinct from 'void' then
    select * into ot from order_transactions where order_id = new.id and kind = 'consumption';
    if ot.id is null or exists (select 1 from order_transactions where order_id = new.id and kind = 'return') then return new; end if;
    for li in select * from jsonb_array_elements(ot.items) loop
      perform slick_move(ot.branch_id, li->>'itemId', (li->>'qty')::numeric, 'Sales', 'OR-' || coalesce(new.no::text, new.id), 'Return from voided order');
    end loop;
    insert into order_transactions(ref, kind, order_id, order_no, branch_id, items, total_cost)
    values ('OR-' || coalesce(new.no::text, new.id), 'return', new.id, new.no::text, ot.branch_id, ot.items, ot.total_cost)
    on conflict do nothing;
  end if;
  return new;
exception when others then
  -- never block a sale because of stock bookkeeping
  raise warning 'slick_order_stock: %', sqlerrm;
  return new;
end $$;
drop trigger if exists slick_order_stock on orders;
create trigger slick_order_stock after insert or update of status on orders for each row execute function slick_order_stock();

notify pgrst, 'reload schema';
select (select count(*) from suppliers) suppliers, (select count(*) from order_transactions) order_transactions;
