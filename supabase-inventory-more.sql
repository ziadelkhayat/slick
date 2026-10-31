-- Slick: order sources, inventory categories, warehouses, and inventory documents
-- (quantity adjustments, cost adjustments, spot checks, count sheets)

-- ---------- order sources (call center "Source" list) ----------
create table if not exists order_sources (
  id text primary key default 'os_' || replace(gen_random_uuid()::text, '-', ''),
  name text not null, name_ar text, reference text,
  sort int, active boolean not null default true, deleted boolean not null default false,
  created_at timestamptz not null default now()
);
insert into order_sources (id, name, sort) values
  ('os_phone','Phone',1),('os_toters','Toters',2),('os_noknok','NokNok',3),('os_talabat','Talabat',4),
  ('os_whatsapp','WhatsApp',5),('os_website','Website',6),('os_walkin','Walk-in',7)
on conflict (id) do nothing;

-- ---------- inventory categories ----------
create table if not exists inventory_categories (
  id text primary key default 'ic_' || replace(gen_random_uuid()::text, '-', ''),
  name text not null, name_ar text, reference text,
  deleted boolean not null default false, created_at timestamptz not null default now()
);
-- start with the categories already used on items
insert into inventory_categories (name, reference)
select c, lower(regexp_replace(c, '[^A-Za-z0-9]+', '-', 'g'))
from (select distinct trim(category) c from inventory_items where coalesce(trim(category),'') <> '') x
where not exists (select 1 from inventory_categories ic where lower(ic.name) = lower(x.c));

-- ---------- warehouses ----------
create table if not exists warehouses (
  id text primary key default 'wh_' || replace(gen_random_uuid()::text, '-', ''),
  name text not null, reference text, address text,
  deleted boolean not null default false, created_at timestamptz not null default now()
);
-- stock can now be kept at a branch or a warehouse
alter table stock_counts drop constraint if exists stock_counts_branch_id_fkey;

-- ---------- inventory documents ----------
create sequence if not exists inv_doc_qa;
create sequence if not exists inv_doc_ca;
create sequence if not exists inv_doc_sp;
create sequence if not exists inv_doc_cs;
create table if not exists inventory_docs (
  id text primary key default 'id_' || replace(gen_random_uuid()::text, '-', ''),
  kind text not null check (kind in ('quantity','cost','spot','sheet')),
  ref text, name text,
  location_id text,                 -- branch or warehouse id
  reason text, direction text not null default 'deduct' check (direction in ('deduct','add')),
  status text not null default 'draft' check (status in ('draft','closed')),
  business_date date default current_date,
  items jsonb not null default '[]',  -- [{itemId, qty, cost}]
  notes text, created_by text, submitted_by text, submitted_at timestamptz,
  deleted boolean not null default false, created_at timestamptz not null default now()
);
create index if not exists inventory_docs_kind on inventory_docs(kind, created_at desc);

create or replace function slick_inv_doc_ref() returns trigger language plpgsql as $$
begin
  if new.ref is null or new.ref = '' then
    new.ref := case new.kind
      when 'quantity' then 'QA-' || lpad(nextval('inv_doc_qa')::text, 6, '0')
      when 'cost'     then 'CA-' || lpad(nextval('inv_doc_ca')::text, 6, '0')
      when 'spot'     then 'SP-' || lpad(nextval('inv_doc_sp')::text, 6, '0')
      else                 'CS-' || lpad(nextval('inv_doc_cs')::text, 6, '0') end;
  end if;
  -- a closed document can't be edited again
  if tg_op = 'UPDATE' and old.status = 'closed' and (new.items is distinct from old.items or new.location_id is distinct from old.location_id or new.status <> 'closed') then
    raise exception 'This document is closed and can''t be changed';
  end if;
  return new;
end $$;
drop trigger if exists slick_inv_doc_ref on inventory_docs;
create trigger slick_inv_doc_ref before insert or update on inventory_docs for each row execute function slick_inv_doc_ref();

-- close (submit) a document: quantity adjustments update stock, cost adjustments update item cost
create or replace function public.slick_close_inv_doc(p_id text, p_by text default null)
returns jsonb language plpgsql security invoker set search_path = public as $$
declare d inventory_docs; ln jsonb; cur numeric; n int := 0;
begin
  select * into d from inventory_docs where id = p_id for update;
  if d.id is null then raise exception 'Document not found'; end if;
  if d.status = 'closed' then raise exception 'Already closed'; end if;
  if d.kind = 'sheet' then raise exception 'Count sheets are not closed'; end if;
  if jsonb_array_length(d.items) = 0 then raise exception 'Add at least one item'; end if;
  if d.kind in ('quantity','spot') and coalesce(d.location_id,'') = '' then raise exception 'Choose a branch or warehouse'; end if;

  for ln in select * from jsonb_array_elements(d.items) loop
    if d.kind = 'quantity' then
      select qty into cur from stock_counts where branch_id = d.location_id and item_id = ln->>'itemId' order by counted_at desc limit 1;
      insert into stock_counts(branch_id, item_id, qty, counted_by, batch, note)
      values (d.location_id, ln->>'itemId',
              greatest(0, coalesce(cur,0) + case when d.direction = 'add' then 1 else -1 end * coalesce((ln->>'qty')::numeric,0)),
              p_by, d.ref, 'Quantity adjustment' || coalesce(': ' || d.reason, ''));
    elsif d.kind = 'cost' then
      update inventory_items set cost = (ln->>'cost')::numeric where id = ln->>'itemId';
    end if;
    n := n + 1;
  end loop;

  update inventory_docs set status = 'closed', submitted_by = p_by, submitted_at = now() where id = p_id;
  return jsonb_build_object('ref', d.ref, 'items', n);
end $$;
revoke all on function public.slick_close_inv_doc(text,text) from public, anon;
grant execute on function public.slick_close_inv_doc(text,text) to authenticated;

-- stock levels at every location (for adjustments and spot checks)
create or replace function public.slick_stock_all()
returns table(location_id text, item_id text, qty numeric, counted_at timestamptz)
language sql stable security invoker set search_path = public as $$
  select distinct on (branch_id, item_id) branch_id, item_id, qty, counted_at
  from stock_counts order by branch_id, item_id, counted_at desc;
$$;
revoke all on function public.slick_stock_all() from public, anon;
grant execute on function public.slick_stock_all() to authenticated;

-- ---------- security ----------
alter table order_sources enable row level security;
alter table inventory_categories enable row level security;
alter table warehouses enable row level security;
alter table inventory_docs enable row level security;
drop policy if exists "staff read sources" on order_sources;
drop policy if exists "admin write sources" on order_sources;
drop policy if exists "staff read inv cats" on inventory_categories;
drop policy if exists "admin write inv cats" on inventory_categories;
drop policy if exists "staff read warehouses" on warehouses;
drop policy if exists "admin write warehouses" on warehouses;
drop policy if exists "staff read inv docs" on inventory_docs;
drop policy if exists "staff add inv docs" on inventory_docs;
drop policy if exists "staff edit inv docs" on inventory_docs;
drop policy if exists "admin delete inv docs" on inventory_docs;
create policy "staff read sources"     on order_sources for select using (staff_role() is not null);
create policy "admin write sources"    on order_sources for all using (staff_role() in ('owner','admin')) with check (staff_role() in ('owner','admin'));
create policy "staff read inv cats"    on inventory_categories for select using (staff_role() is not null);
create policy "admin write inv cats"   on inventory_categories for all using (staff_role() in ('owner','admin')) with check (staff_role() in ('owner','admin'));
create policy "staff read warehouses"  on warehouses for select using (staff_role() is not null);
create policy "admin write warehouses" on warehouses for all using (staff_role() in ('owner','admin')) with check (staff_role() in ('owner','admin'));
create policy "staff read inv docs"    on inventory_docs for select using (staff_role() is not null);
create policy "staff add inv docs"     on inventory_docs for insert with check (staff_role() is not null);
create policy "staff edit inv docs"    on inventory_docs for update using (staff_role() is not null) with check (staff_role() is not null);
create policy "admin delete inv docs"  on inventory_docs for delete using (staff_role() in ('owner','admin'));

do $$ begin
  begin alter publication supabase_realtime add table order_sources; exception when others then null; end;
  begin alter publication supabase_realtime add table inventory_categories; exception when others then null; end;
  begin alter publication supabase_realtime add table warehouses; exception when others then null; end;
  begin alter publication supabase_realtime add table inventory_docs; exception when others then null; end;
end $$;

notify pgrst, 'reload schema';
insert into warehouses (id, name, reference) values ('wh_w01','Warehouse','W01'),('wh_w02','Central Kitchen','W02') on conflict (id) do nothing;
select (select count(*) from order_sources) sources, (select count(*) from inventory_categories) inv_categories, (select count(*) from warehouses) warehouses;
