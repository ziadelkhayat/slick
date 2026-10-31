-- The Wok ERP: database schema for Supabase (Postgres)
-- Paste into Supabase → SQL Editor → New query → Run. Safe to run once on a fresh project.

-- ============ core ============
create table if not exists branches (
  id text primary key default 'br_' || substr(md5(random()::text), 1, 10),
  name text not null unique,
  code text unique,
  address text, city text, phone text,
  open_time text default '11:00', close_time text default '23:30',
  active boolean not null default true,
  call_center boolean not null default true,
  production boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists categories (
  id text primary key default 'cat_' || substr(md5(random()::text), 1, 10),
  name text not null, name_ar text, reference text, sort int,
  deleted boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists products (
  id text primary key default 'prd_' || substr(md5(random()::text), 1, 10),
  name text not null, name_ar text, sku text unique,
  category_id text references categories(id),
  price numeric(10,2) not null default 0,
  tax_group text default 'TAX', description text, image_url text,
  channels text[] not null default array['pos','callcenter','delivery','takeaway','dinein'],
  branch_ids text[] not null default '{}',          -- empty = every branch
  active boolean not null default true, deleted boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists inventory_items (
  id text primary key default 'inv_' || substr(md5(random()::text), 1, 10),
  name text not null, sku text unique, category text,
  kind text not null default 'purchased' check (kind in ('purchased','produced')),
  storage_unit text, ingredient_unit text, factor numeric, cost numeric(12,4),
  min_level numeric, par_level numeric, barcode text,
  deleted boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists delivery_zones (
  id text primary key default 'zon_' || substr(md5(random()::text), 1, 10),
  name text not null, branch_id text references branches(id),
  fee numeric(10,2) default 0, min_order numeric(10,2) default 0, eta int,
  active boolean not null default true, deleted boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists devices (
  id text primary key default 'dev_' || substr(md5(random()::text), 1, 10),
  name text not null,
  type text not null default 'cashier',
  branch_id text not null references branches(id),
  code text,                                   -- 6-digit one-time activation code
  activated_at timestamptz, last_seen timestamptz,
  deleted boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists shifts (
  id text primary key default 'sh_' || substr(md5(random()::text), 1, 10),
  device_id text references devices(id), branch_id text references branches(id),
  cashier text, opening_cash numeric(10,2) default 0, opened_at timestamptz not null default now(),
  closed_at timestamptz, orders int, sales numeric(12,2), expected_cash numeric(12,2), counted_cash numeric(12,2), difference numeric(12,2)
);

create sequence if not exists order_no_seq start 1001;

create table if not exists orders (
  id text primary key default 'ord_' || substr(md5(random()::text), 1, 12),
  no bigint not null default nextval('order_no_seq'),
  channel text not null check (channel in ('pos','callcenter','online')),
  source text,                                  -- Phone, Toters, NokNok, Website, POS…
  type text not null check (type in ('dinein','pickup','delivery')),
  status text not null default 'pending' check (status in ('draft','pending','active','declined','closed')),
  branch_id text references branches(id),
  device_id text references devices(id), shift_id text references shifts(id), zone_id text references delivery_zones(id),
  customer_name text, phone text, address text, table_no text, notes text,
  items jsonb not null default '[]',            -- [{productId,name,price,qty}]
  subtotal numeric(12,2), discount_pct numeric, discount numeric(12,2) default 0, delivery_fee numeric(10,2) default 0, total numeric(12,2) not null default 0,
  payment jsonb,                                -- {method, tendered, change}
  agent text, handled_by text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index if not exists orders_branch_status on orders(branch_id, status);
create index if not exists orders_created on orders(created_at desc);

create table if not exists settings (
  id text primary key,                          -- e.g. 'online'
  data jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

-- staff accounts (linked to Supabase Auth users)
create table if not exists staff (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text, role text not null default 'cashier' check (role in ('owner','admin','agent','cashier')),
  branch_id text references branches(id),
  created_at timestamptz not null default now()
);

-- keep updated_at fresh
create or replace function touch() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end $$;
do $$ declare t text; begin
  foreach t in array array['branches','categories','products','inventory_items','delivery_zones','devices','orders','settings'] loop
    execute format('drop trigger if exists touch_%1$s on %1$s; create trigger touch_%1$s before update on %1$s for each row execute function touch();', t);
  end loop; end $$;

-- ============ security (row level security) ============
create or replace function staff_role() returns text language sql stable security definer set search_path = public as
$$ select role from staff where user_id = auth.uid() $$;

alter table branches enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table inventory_items enable row level security;
alter table delivery_zones enable row level security;
alter table devices enable row level security;
alter table shifts enable row level security;
alter table orders enable row level security;
alter table settings enable row level security;
alter table staff enable row level security;

-- public (online ordering page, no login): read the live menu, branches, zones, online settings
create policy "public read branches"  on branches       for select using (active);
create policy "public read categories" on categories    for select using (not deleted);
create policy "public read products"  on products       for select using (active and not deleted);
create policy "public read zones"     on delivery_zones for select using (active and not deleted);
create policy "public read online"    on settings       for select using (id = 'online');

-- staff: everyone signed in as staff reads everything
create policy "staff read inventory" on inventory_items for select using (staff_role() is not null);
create policy "staff read devices"   on devices         for select using (staff_role() is not null);
create policy "staff read shifts"    on shifts          for select using (staff_role() is not null);
create policy "staff read orders"    on orders          for select using (staff_role() is not null);
create policy "staff read staff"     on staff           for select using (staff_role() is not null);
create policy "staff read all settings" on settings     for select using (staff_role() is not null);

-- owner/admin: manage setup data
create policy "admin write branches"   on branches        for all using (staff_role() in ('owner','admin')) with check (staff_role() in ('owner','admin'));
create policy "admin write categories" on categories      for all using (staff_role() in ('owner','admin')) with check (staff_role() in ('owner','admin'));
create policy "admin write products"   on products        for all using (staff_role() in ('owner','admin')) with check (staff_role() in ('owner','admin'));
create policy "admin write inventory"  on inventory_items for all using (staff_role() in ('owner','admin')) with check (staff_role() in ('owner','admin'));
create policy "admin write zones"      on delivery_zones  for all using (staff_role() in ('owner','admin')) with check (staff_role() in ('owner','admin'));
create policy "admin write devices"    on devices         for all using (staff_role() in ('owner','admin')) with check (staff_role() in ('owner','admin'));
create policy "admin write settings"   on settings        for all using (staff_role() in ('owner','admin')) with check (staff_role() in ('owner','admin'));
create policy "owner manages staff"    on staff           for all using (staff_role() = 'owner') with check (staff_role() = 'owner');

-- orders & shifts: any staff (agents create call-center orders, cashiers take sales and accept orders)
create policy "staff write orders" on orders for all using (staff_role() is not null) with check (staff_role() is not null);
create policy "staff write shifts" on shifts for all using (staff_role() is not null) with check (staff_role() is not null);

-- customers on the online page can place an order, nothing else
create policy "public place online order" on orders for insert to anon
  with check (channel = 'online' and status = 'pending');

-- live updates for the call center board, POS incoming orders and back office
alter publication supabase_realtime add table orders, devices, shifts, products, categories, branches;
