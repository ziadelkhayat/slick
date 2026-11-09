-- Slick: multi-company. APPLIED to the live database (akrezmxgtorkuwxxctyk) on 2026-11-09. Every business record now belongs to a company, and each company only ever sees its own data.
-- Eat Out (The Wok) becomes the first company and keeps all existing data. Existing pages keep working unchanged:
-- new rows get the signed-in user's company automatically (or, for the public ordering page, the company of the branch).
-- Safe to run once on the live database after supabase/schema-live-2026-11-09.sql. Runs as one transaction.

begin;

-- ============ companies ============
create table if not exists public.companies (
  id text primary key default 'co_' || replace(gen_random_uuid()::text, '-', ''),
  name text not null,
  account_no text unique,                       -- the account number Slick assigns to each customer business
  active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
insert into public.companies (id, name) values ('co_eatout', 'Eat Out') on conflict (id) do nothing;
drop trigger if exists touch_companies on public.companies;
create trigger touch_companies before update on public.companies for each row execute function public.touch();

-- ============ add company_id to every business table ============
do $$
declare t text;
begin
  foreach t in array array[
    'branches','brands','categories','charges','customers','day_closes','delivery_zones','devices','house_account_txns',
    'inventory_categories','inventory_docs','inventory_items','modifier_options','modifiers','order_sources','order_transactions',
    'orders','payment_methods','products','roles','settings','shifts','staff','staff_users','stock_counts','suppliers',
    'tax_groups','taxes','variant_sets','warehouses'] loop
    execute format('alter table public.%I add column if not exists company_id text references public.companies(id)', t);
    execute format('update public.%I set company_id = ''co_eatout'' where company_id is null', t);
    execute format('alter table public.%I alter column company_id set not null', t);
    execute format('create index if not exists %I on public.%I (company_id)', t || '_company', t);
  end loop;
end $$;

-- ============ who is asking: the company of the signed-in staff member or POS device ============
create or replace function public.slick_company() returns text
language sql stable security definer set search_path = public as $$
  select coalesce(
    (select s.company_id from public.staff s where s.user_id = auth.uid()),
    (select d.company_id from public.devices d
      where d.auth_uid = auth.uid() and d.activated_at is not null and coalesce(d.deleted, false) = false limit 1),
    (select d.company_id from public.devices d where d.id = public.slick_device_id())
  );
$$;
grant execute on function public.slick_company() to anon, authenticated;

-- a company setting row (e.g. 'company', 'app'); falls back to the only company while there is just one
create or replace function public.slick_default_company() returns text
language sql stable security definer set search_path = public as $$
  select case when (select count(*) from public.companies) = 1 then (select id from public.companies limit 1) end;
$$;

-- ============ new rows get the right company automatically ============
-- Staff and devices: always their own company (anything else sent is ignored).
-- Public pages and web customers (no company): taken from the branch, brand, modifier, customer or order the row points to.
-- Inside Slick's own database functions the company they set is kept.
-- the company of the branch / brand / modifier / customer / order a new row points to
create or replace function public.slick_company_of(j jsonb) returns text
language sql stable security definer set search_path = public as $$
  select coalesce(
    (select company_id from public.branches  where id = j->>'branch_id'),
    (select company_id from public.brands    where id = j->>'brand_id'),
    (select company_id from public.modifiers where id = j->>'modifier_id'),
    (select company_id from public.customers where id = j->>'customer_id'),
    (select company_id from public.orders    where id = j->>'order_id'));
$$;

-- runs as the caller on purpose: current_user is 'anon'/'authenticated' for requests from the apps,
-- and the function owner when the row is written by one of Slick's own database functions
create or replace function public.slick_fill_company() returns trigger
language plpgsql security invoker set search_path = public as $$
declare me text := public.slick_company(); cid text; outside boolean := current_user in ('anon', 'authenticated');
begin
  if tg_op = 'UPDATE' then
    new.company_id := old.company_id;                       -- a record never moves to another company
    return new;
  end if;
  if me is not null and outside then
    cid := me;                                              -- staff and devices: always their own company
  elsif outside then
    cid := null;                                            -- a visitor may not choose a company
  else
    cid := coalesce(new.company_id, me);                    -- Slick's own functions say which company
  end if;
  cid := coalesce(cid, public.slick_company_of(to_jsonb(new)), case when not outside then public.slick_default_company() end);
  if cid is null then raise exception 'Slick: could not tell which company this % record belongs to', tg_table_name; end if;
  new.company_id := cid;
  return new;
end $$;

do $$
declare t text;
begin
  foreach t in array array[
    'branches','brands','categories','charges','customers','day_closes','delivery_zones','devices','house_account_txns',
    'inventory_categories','inventory_docs','inventory_items','modifier_options','modifiers','order_sources','order_transactions',
    'orders','payment_methods','products','roles','settings','shifts','staff','staff_users','stock_counts','suppliers',
    'tax_groups','taxes','variant_sets','warehouses'] loop
    -- "a_" makes it run before every other trigger on the table (they run in name order)
    execute format('drop trigger if exists a_slick_company on public.%I', t);
    execute format('create trigger a_slick_company before insert or update of company_id on public.%I for each row execute function public.slick_fill_company()', t);
  end loop;
end $$;

-- ============ isolation: staff and devices only see and change their own company ============
-- A restrictive rule is added on top of every existing rule, so nothing else about who can do what changes.
-- Visitors and web customers (no company) are still limited by the existing public rules (live menu, own profile...).
do $$
declare t text;
begin
  foreach t in array array[
    'branches','brands','categories','charges','customers','day_closes','delivery_zones','devices','house_account_txns',
    'inventory_categories','inventory_docs','inventory_items','modifier_options','modifiers','order_sources','order_transactions',
    'orders','payment_methods','products','roles','settings','shifts','staff','staff_users','stock_counts','suppliers',
    'tax_groups','taxes','variant_sets','warehouses'] loop
    execute format('drop policy if exists "own company only" on public.%I', t);
    execute format('create policy "own company only" on public.%I as restrictive for all to public
      using ((select public.slick_company()) is null or company_id = (select public.slick_company()))
      with check ((select public.slick_company()) is null or company_id = (select public.slick_company()))', t);
  end loop;
end $$;

alter table public.companies enable row level security;
drop policy if exists "staff read own company" on public.companies;
drop policy if exists "owner edits own company" on public.companies;
create policy "staff read own company"  on public.companies for select using (id = (select public.slick_company()));
create policy "owner edits own company" on public.companies for update using (id = (select public.slick_company()) and public.staff_role() = 'owner')
  with check (id = (select public.slick_company()));

-- ============ names and codes only need to be unique inside a company ============
alter table public.branches drop constraint if exists branches_code_key;
create unique index if not exists branches_company_code on public.branches (company_id, code);
alter table public.brands drop constraint if exists brands_name_key;
create unique index if not exists brands_company_name on public.brands (company_id, name);
alter table public.customers drop constraint if exists customers_phone_key;
alter table public.customers add constraint customers_company_phone unique (company_id, phone);
alter table public.customers drop constraint if exists customers_web_customer_id_key;
create unique index if not exists customers_company_web on public.customers (company_id, web_customer_id);
alter table public.inventory_items drop constraint if exists inventory_items_sku_key;
create unique index if not exists inventory_items_company_sku on public.inventory_items (company_id, sku);
alter table public.products drop constraint if exists products_sku_key;
create unique index if not exists products_company_sku on public.products (company_id, sku);
-- order references count per brand (REF-100001…), so they are unique per brand, not across all brands
drop index if exists public.orders_ref;
create unique index if not exists orders_brand_ref on public.orders (brand_id, ref);
-- each company has its own settings ('company', 'app', 'online_<brand>'…)
alter table public.settings drop constraint if exists settings_pkey;
alter table public.settings add constraint settings_pkey primary key (company_id, id);

-- ============ Slick's own functions: stay inside the right company ============

-- customers are per company: same phone at two companies = two customer records
create or replace function public.slick_order_customer() returns trigger
language plpgsql security definer set search_path = public as $function$
declare ph text := slick_norm_phone(new.phone); cid text;
begin
  if ph is null or length(ph) < 6 then return new; end if;
  insert into customers(company_id, phone, name, addresses)
  values (new.company_id, ph, nullif(trim(new.customer_name),''),
          case when coalesce(trim(new.address),'') <> '' then jsonb_build_array(jsonb_build_object('address', trim(new.address), 'lat', new.lat, 'lng', new.lng)) else '[]'::jsonb end)
  on conflict (company_id, phone) do update set
    name = coalesce(nullif(customers.name,''), excluded.name),
    addresses = case
      when coalesce(trim(new.address),'') = '' or customers.addresses @> jsonb_build_array(jsonb_build_object('address', trim(new.address))) then customers.addresses
      else (jsonb_build_array(jsonb_build_object('address', trim(new.address), 'lat', new.lat, 'lng', new.lng)) || customers.addresses) end,
    updated_at = now()
  returning id into cid;
  new.customer_id := cid;
  return new;
end $function$;

-- tax settings come from the order's own company
create or replace function public.slick_items_tax(p_items jsonb, p_discount numeric) returns numeric
language plpgsql stable security definer set search_path = public as $function$
declare it jsonb; r numeric; line numeric; gross numeric := 0; t numeric := 0; co text; incl boolean;
begin
  if p_items is null or jsonb_typeof(p_items) <> 'array' then return 0; end if;
  co := coalesce(slick_company(),
                 (select p.company_id from products p where p.id = (select x->>'productId' from jsonb_array_elements(p_items) x where x ? 'productId' limit 1)),
                 slick_default_company());
  incl := coalesce((select (data->>'taxInclusive')::boolean from settings where id = 'company' and company_id = co), true);
  for it in select * from jsonb_array_elements(p_items) loop
    line := greatest(0, coalesce((it->>'price')::numeric, 0) * coalesce((it->>'qty')::numeric, 1) - coalesce((it->>'disc')::numeric, 0));
    select coalesce(sum(x.rate), 0) / 100 into r
      from products p join tax_groups g on g.id = p.tax_group and not g.deleted
      join taxes x on x.id = any(g.tax_ids) and not x.deleted
      where p.id = it->>'productId';
    gross := gross + line;
    t := t + case when incl then line * coalesce(r, 0) / (1 + coalesce(r, 0)) else line * coalesce(r, 0) end;
  end loop;
  if gross > 0 and coalesce(p_discount, 0) > 0 then t := t * (1 - least(p_discount, gross) / gross); end if;
  return round(t, 2);
end $function$;

create or replace function public.slick_tax_inclusive() returns boolean
language sql stable security definer set search_path = public as $function$
  select coalesce((select (data->>'taxInclusive')::boolean from settings
                   where id = 'company' and company_id = coalesce(slick_company(), slick_default_company())), true)
$function$;

-- public ordering page: settings of the brand's company (optional brand keeps today's page working)
drop function if exists public.slick_public_settings();
create or replace function public.slick_public_settings(p_brand text default null) returns jsonb
language sql stable security definer set search_path = public as $function$
  select jsonb_build_object( 'taxInclusive', coalesce((data->>'taxInclusive')::boolean, true), 'decimals', coalesce((data->>'priceDecimals')::int, 2),
    'currency', coalesce(data->>'currency', 'USD'), 'currency2', data->>'currency2', 'rate2', (data->>'rate2')::numeric,
    'decimals2', coalesce((data->>'decimals2')::int, 0), 'country', coalesce(data->>'country', 'Lebanon'))
  from settings
  where id = 'company'
    and company_id = coalesce((select company_id from brands where id = p_brand), slick_company(), slick_default_company())
$function$;
grant execute on function public.slick_public_settings(text) to anon, authenticated;

-- renaming an order source or payment method only touches this company's orders and settings
create or replace function public.slick_rename_lookup() returns trigger
language plpgsql security definer set search_path = public as $function$
begin
  if new.name is not distinct from old.name or old.name is null then return new; end if;
  if tg_table_name = 'order_sources' then
    update orders set source = new.name where source = old.name and company_id = new.company_id;
    update settings set data = jsonb_set(data::jsonb, '{ccDefaultSource}', to_jsonb(new.name))
      where id = 'app' and company_id = new.company_id and data::jsonb->>'ccDefaultSource' = old.name;
  elsif tg_table_name = 'payment_methods' then
    update orders set payment = jsonb_set(payment::jsonb, '{method}', to_jsonb(new.name))
      where company_id = new.company_id and payment is not null
        and (payment::jsonb->>'methodId' = new.id::text or (coalesce(payment::jsonb->>'methodId', '') = '' and payment::jsonb->>'method' = old.name));
  end if;
  return new;
end $function$;

-- stock history: only this company's counts
create or replace function public.slick_inv_history(p_from timestamptz, p_to timestamptz, p_loc text default null, p_item text default null)
returns table(id text, branch_id text, item_id text, qty numeric, delta numeric, counted_at timestamptz, counted_by text, batch text, note text)
language sql stable security definer set search_path = public as $function$
  select x.id, x.branch_id, x.item_id, x.qty, x.delta, x.counted_at, x.counted_by, x.batch, x.note from (
    select s.id::text id, s.branch_id::text branch_id, s.item_id::text item_id, s.qty,
           s.qty - coalesce(lag(s.qty) over (partition by s.branch_id, s.item_id order by s.counted_at, s.id), 0) delta,
           s.counted_at, s.counted_by::text counted_by, s.batch::text batch, s.note::text note
      from stock_counts s
     where s.company_id = slick_company()
       and (p_loc is null or s.branch_id::text = p_loc) and (p_item is null or s.item_id::text = p_item) and s.counted_at <= p_to
  ) x
  where x.counted_at >= p_from and staff_role() is not null
  order by x.counted_at desc
  limit 3000
$function$;

-- waste / restock: only for an order of the caller's company
create or replace function public.slick_stock_items(p_order text, p_items jsonb, p_mode text) returns integer
language plpgsql security definer set search_path = public as $function$
declare o orders; used jsonb; k text; it inventory_items; q numeric; out_items jsonb := '[]'::jsonb; total numeric := 0; typ text; n int := 0; tag text;
begin
  if staff_role() is null then raise exception 'not allowed'; end if;
  if p_mode not in ('waste','restock') then raise exception 'mode must be waste or restock'; end if;
  select * into o from orders where id = p_order and company_id = slick_company();
  if o.id is null or o.branch_id is null then return 0; end if;
  typ := case when o.type in ('dinein','pickup','delivery') then o.type else 'pickup' end;
  used := slick_order_usage(p_items, typ);
  tag := case when p_mode = 'waste' then 'OW-' else 'OR-' end || coalesce(o.no::text, o.invoice_no::text, o.id);
  for k in select jsonb_object_keys(used) loop
    select * into it from inventory_items where id = k;
    if it.id is null then continue; end if;
    q := (used->>k)::numeric / nullif(coalesce(it.factor,1),0);
    perform slick_move(o.branch_id, k, case when p_mode = 'waste' then -q else q end, case when p_mode = 'waste' then 'Waste' else 'Sales' end, tag,
                       case when p_mode = 'waste' then 'Wasted from voided order' else 'Returned to stock from order' end);
    out_items := out_items || jsonb_build_object('itemId', k, 'qty', round(q, 5), 'cost', coalesce(it.cost,0));
    total := total + q * coalesce(it.cost,0); n := n + 1;
  end loop;
  if n > 0 then
    insert into order_transactions(company_id, ref, kind, order_id, order_no, branch_id, items, total_cost)
    values (o.company_id, tag, case when p_mode = 'waste' then 'waste' else 'return' end, o.id, o.no::text, o.branch_id, out_items, round(total, 5));
  end if;
  return n;
end $function$;

-- owners/admins can only reset passwords of their own company's users
create or replace function public.slick_set_user_password(p_user uuid, p_password text) returns json
language plpgsql security definer set search_path = public, extensions as $function$
begin
  if coalesce(public.staff_role_user(), '') not in ('owner', 'admin') then return json_build_object('error', 'forbidden'); end if;
  if length(coalesce(p_password, '')) < 8 then return json_build_object('error', 'short'); end if;
  if not exists (select 1 from public.staff_users s where s.user_id = p_user and coalesce(s.deleted, false) = false
                 and s.company_id = public.slick_company()) then
    return json_build_object('error', 'nouser');
  end if;
  update auth.users set encrypted_password = extensions.crypt(p_password, extensions.gen_salt('bf')), updated_at = now() where id = p_user;
  if not found then return json_build_object('error', 'nouser'); end if;
  return json_build_object('ok', true);
end $function$;

-- deleting a branch's orders: only a branch of the caller's company
create or replace function public.slick_wipe_branch_orders(p_branch text) returns integer
language plpgsql security definer set search_path = public as $function$
declare n integer;
begin
  if not exists (select 1 from staff where user_id = auth.uid() and role in ('owner','admin')) then
    raise exception 'Only the owner or an admin can delete a branch''s orders.';
  end if;
  if not exists (select 1 from branches where id = p_branch and company_id = slick_company()) then
    raise exception 'Branch not found.';
  end if;
  perform set_config('slick.reset', 'on', true);
  delete from orders where branch_id::text = p_branch;
  get diagnostics n = row_count;
  if to_regclass('public.shifts') is not null then delete from shifts where branch_id::text = p_branch; end if;
  if to_regclass('public.day_closes') is not null then delete from day_closes where branch_id::text = p_branch; end if;
  delete from branch_counters where branch_id = p_branch;
  return n;
end $function$;

-- first back-office login of a Slick user: joins the company the user was created in
create or replace function public.slick_claim_login() returns text
language plpgsql security definer set search_path = public as $function$
declare u staff_users; lvl text; em text;
begin
  if auth.uid() is null then return null; end if;
  if exists(select 1 from staff where user_id = auth.uid()) then return (select role from staff where user_id = auth.uid()); end if;
  select email into em from auth.users where id = auth.uid();
  select * into u from staff_users where lower(email) = lower(em) and active and not deleted and (user_id is null or user_id = auth.uid()) limit 1;
  if u.id is null then return null; end if;
  select case when 'bo_manage' = any(r.permissions) then 'admin' when exists(select 1 from unnest(r.permissions) p where p like 'bo_%') then 'agent' else null end
    into lvl from roles r where r.id = u.role_id and not r.deleted and r.company_id = u.company_id;
  if lvl is null then return null; end if;
  update staff_users set user_id = auth.uid() where id = u.id;
  insert into staff (company_id, user_id, name, role, branch_id) values (u.company_id, auth.uid(), u.name, lvl, u.branch_ids[1]);
  return lvl;
end $function$;

-- the platform owner's own login stays the owner of Eat Out
create or replace function public.slick_owner_on_signup() returns trigger
language plpgsql security definer set search_path = public as $function$
begin
  if lower(new.email) = 'ziad.khayat91@gmail.com' then
    insert into public.staff (company_id, user_id, name, role) values ('co_eatout', new.id, 'Ziad', 'owner')
      on conflict (user_id) do update set role = 'owner';
  end if;
  return new;
end $function$;

notify pgrst, 'reload schema';
commit;

select (select count(*) from public.companies) companies,
       (select count(*) from public.orders where company_id = 'co_eatout') eatout_orders,
       (select count(*) from public.products where company_id = 'co_eatout') eatout_products;
