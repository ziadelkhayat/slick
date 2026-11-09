-- Slick: snapshot of the LIVE Supabase database structure (tables, functions, triggers, security rules, grants) taken 2026-11-09.
-- The older supabase-*.sql files in the repo root are out of date; this file is the source of truth for what is running.

-- sequences

create sequence if not exists public.inv_doc_ca start 1;

create sequence if not exists public.inv_doc_cs start 1;

create sequence if not exists public.inv_doc_po start 1;

create sequence if not exists public.inv_doc_pr start 1;

create sequence if not exists public.inv_doc_qa start 1;

create sequence if not exists public.inv_doc_sp start 1;

create sequence if not exists public.inv_doc_to start 1;

create sequence if not exists public.inv_doc_tr start 1;

create sequence if not exists public.invoice_no_seq start 100000;

create sequence if not exists public.order_no_seq start 1001;

create sequence if not exists public.order_ref_seq start 1;

create sequence if not exists public.return_no_seq start 1;

create table if not exists public.branch_counters (
  branch_id text not null,
  invoice bigint default 0 not null,
  ret bigint default 0 not null,
  constraint branch_counters_pkey PRIMARY KEY (branch_id)
);

create table if not exists public.branches (
  id text default ('br_'::text || substr(md5((random())::text), 1, 10)) not null,
  name text not null,
  code text,
  address text,
  city text,
  phone text,
  open_time text default '11:00'::text,
  close_time text default '23:30'::text,
  active boolean default true not null,
  call_center boolean default true not null,
  production boolean default false not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  brand_id text,
  name_ar text,
  tax_number text,
  lat numeric,
  lng numeric,
  settings jsonb default '{}'::jsonb not null,
  constraint branches_code_key UNIQUE (code),
  constraint branches_pkey PRIMARY KEY (id)
);

create table if not exists public.brand_counters (
  brand_id text not null,
  ref bigint default 0 not null,
  constraint brand_counters_pkey PRIMARY KEY (brand_id)
);

create table if not exists public.brands (
  id text default ('brd_'::text || substr(md5((random())::text), 1, 10)) not null,
  name text not null,
  name_ar text,
  active boolean default true not null,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  constraint brands_name_key UNIQUE (name),
  constraint brands_pkey PRIMARY KEY (id)
);

create table if not exists public.categories (
  id text default ('cat_'::text || substr(md5((random())::text), 1, 10)) not null,
  name text not null,
  name_ar text,
  reference text,
  sort integer,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  brand_id text,
  inactive_branch_ids text[] default '{}'::text[] not null,
  channel text,
  product_ids jsonb default '[]'::jsonb not null,
  image_url text,
  constraint categories_pkey PRIMARY KEY (id)
);

create table if not exists public.charges (
  id text default ('chg_'::text || replace((gen_random_uuid())::text, '-'::text, ''::text)) not null,
  name text not null,
  name_ar text,
  type text default 'fixed'::text not null,
  value numeric default 0 not null,
  order_types text[] default '{dinein,pickup,delivery}'::text[] not null,
  auto boolean default true not null,
  tax_group text,
  brand_ids text[] default '{}'::text[] not null,
  branch_ids text[] default '{}'::text[] not null,
  active boolean default true not null,
  sort integer,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  constraint charges_pkey PRIMARY KEY (id),
  constraint charges_type_check CHECK ((type = ANY (ARRAY['fixed'::text, 'percent'::text]))),
  constraint charges_value_check CHECK ((value >= (0)::numeric))
);

create table if not exists public.customers (
  id text default ('cu_'::text || replace((gen_random_uuid())::text, '-'::text, ''::text)) not null,
  phone text not null,
  name text,
  email text,
  birthday date,
  notes text,
  tags text[] default '{}'::text[] not null,
  blacklisted boolean default false not null,
  addresses jsonb default '[]'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  gender text,
  web_customer_id uuid,
  deleted_at timestamp with time zone,
  house_account boolean default false not null,
  house_limit numeric(12,2),
  loyalty boolean default false not null,
  constraint customers_phone_key UNIQUE (phone),
  constraint customers_web_customer_id_key UNIQUE (web_customer_id),
  constraint customers_pkey PRIMARY KEY (id)
);

create table if not exists public.day_closes (
  id text default ('dc_'::text || replace((gen_random_uuid())::text, '-'::text, ''::text)) not null,
  branch_id text not null,
  business_date date not null,
  closed_at timestamp with time zone default now() not null,
  closed_by text,
  device_id text,
  orders integer default 0 not null,
  sales numeric default 0 not null,
  created_at timestamp with time zone default now() not null,
  constraint day_closes_branch_id_business_date_key UNIQUE (branch_id, business_date),
  constraint day_closes_pkey PRIMARY KEY (id)
);

create table if not exists public.delivery_zones (
  id text default ('zon_'::text || substr(md5((random())::text), 1, 10)) not null,
  name text not null,
  branch_id text,
  fee numeric(10,2) default 0,
  min_order numeric(10,2) default 0,
  eta integer,
  active boolean default true not null,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  polygon jsonb,
  constraint delivery_zones_pkey PRIMARY KEY (id)
);

create table if not exists public.devices (
  id text default ('dev_'::text || substr(md5((random())::text), 1, 10)) not null,
  name text not null,
  type text default 'cashier'::text not null,
  branch_id text not null,
  code text,
  activated_at timestamp with time zone,
  last_seen timestamp with time zone,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  reference text,
  settings jsonb default '{}'::jsonb not null,
  auth_uid uuid,
  key_hash text,
  constraint devices_pkey PRIMARY KEY (id)
);

create table if not exists public.house_account_txns (
  id uuid default gen_random_uuid() not null,
  customer_id text not null,
  kind text not null,
  amount numeric(12,2) not null,
  method text,
  order_id text,
  order_ref text,
  branch_id text,
  note text,
  created_by text,
  created_at timestamp with time zone default now() not null,
  constraint house_account_txns_pkey PRIMARY KEY (id),
  constraint house_account_txns_amount_check CHECK ((amount > (0)::numeric)),
  constraint house_account_txns_kind_check CHECK ((kind = ANY (ARRAY['charge'::text, 'payment'::text])))
);

create table if not exists public.inventory_categories (
  id text default ('ic_'::text || replace((gen_random_uuid())::text, '-'::text, ''::text)) not null,
  name text not null,
  name_ar text,
  reference text,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  constraint inventory_categories_pkey PRIMARY KEY (id)
);

create table if not exists public.inventory_docs (
  id text default ('id_'::text || replace((gen_random_uuid())::text, '-'::text, ''::text)) not null,
  kind text not null,
  ref text,
  name text,
  location_id text,
  reason text,
  direction text default 'deduct'::text not null,
  status text default 'draft'::text not null,
  business_date date default CURRENT_DATE,
  items jsonb default '[]'::jsonb not null,
  notes text,
  created_by text,
  submitted_by text,
  submitted_at timestamp with time zone,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  consumed jsonb default '[]'::jsonb not null,
  supplier_id text,
  dest_id text,
  linked_id text,
  received_at timestamp with time zone,
  received_by text,
  constraint inventory_docs_pkey PRIMARY KEY (id),
  constraint inventory_docs_direction_check CHECK ((direction = ANY (ARRAY['deduct'::text, 'add'::text]))),
  constraint inventory_docs_kind_check CHECK ((kind = ANY (ARRAY['quantity'::text, 'cost'::text, 'spot'::text, 'sheet'::text, 'production'::text, 'purchase'::text, 'torder'::text, 'transfer'::text]))),
  constraint inventory_docs_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'pending'::text, 'closed'::text, 'rejected'::text])))
);

create table if not exists public.inventory_items (
  id text default ('inv_'::text || substr(md5((random())::text), 1, 10)) not null,
  name text not null,
  sku text,
  category text,
  kind text default 'purchased'::text not null,
  storage_unit text,
  ingredient_unit text,
  factor numeric,
  cost numeric(12,4),
  min_level numeric,
  par_level numeric,
  barcode text,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  ingredients jsonb default '[]'::jsonb not null,
  max_level numeric,
  name_ar text,
  costing_method text default 'fixed'::text not null,
  constraint inventory_items_sku_key UNIQUE (sku),
  constraint inventory_items_pkey PRIMARY KEY (id),
  constraint inventory_items_kind_check CHECK ((kind = ANY (ARRAY['purchased'::text, 'produced'::text])))
);

create table if not exists public.modifier_options (
  id text default ('mo_'::text || replace((gen_random_uuid())::text, '-'::text, ''::text)) not null,
  modifier_id text,
  name text not null,
  name_ar text,
  sku text,
  price numeric default 0 not null,
  tax_group text default 'TAX'::text,
  costing_method text default 'ingredients'::text not null,
  cost numeric,
  calories numeric,
  ingredients jsonb default '[]'::jsonb not null,
  custom_prices jsonb default '{}'::jsonb not null,
  inactive_branch_ids text[] default '{}'::text[] not null,
  out_of_stock_branch_ids text[] default '{}'::text[] not null,
  sort integer,
  active boolean default true not null,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  constraint modifier_options_pkey PRIMARY KEY (id)
);

create table if not exists public.modifiers (
  id text default ('mod_'::text || replace((gen_random_uuid())::text, '-'::text, ''::text)) not null,
  name text not null,
  name_ar text,
  reference text,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  sort integer,
  constraint modifiers_pkey PRIMARY KEY (id)
);

create table if not exists public.order_sources (
  id text default ('os_'::text || replace((gen_random_uuid())::text, '-'::text, ''::text)) not null,
  name text not null,
  name_ar text,
  reference text,
  sort integer,
  active boolean default true not null,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  constraint order_sources_pkey PRIMARY KEY (id)
);

create table if not exists public.order_transactions (
  id text default ('ot_'::text || replace((gen_random_uuid())::text, '-'::text, ''::text)) not null,
  ref text,
  kind text not null,
  order_id text not null,
  order_no text,
  branch_id text,
  items jsonb default '[]'::jsonb not null,
  total_cost numeric default 0 not null,
  created_at timestamp with time zone default now() not null,
  constraint order_transactions_pkey PRIMARY KEY (id),
  constraint order_transactions_kind_check CHECK ((kind = ANY (ARRAY['consumption'::text, 'return'::text, 'waste'::text])))
);

create table if not exists public.orders (
  id text default ('ord_'::text || substr(md5((random())::text), 1, 12)) not null,
  no bigint,
  channel text not null,
  source text,
  type text not null,
  status text default 'pending'::text not null,
  branch_id text,
  device_id text,
  shift_id text,
  zone_id text,
  customer_name text,
  phone text,
  address text,
  table_no text,
  notes text,
  items jsonb default '[]'::jsonb not null,
  subtotal numeric(12,2),
  discount_pct numeric,
  discount numeric(12,2) default 0,
  delivery_fee numeric(10,2) default 0,
  total numeric(12,2) default 0 not null,
  payment jsonb,
  agent text,
  handled_by text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  brand_id text,
  lat double precision,
  lng double precision,
  accepted_at timestamp with time zone,
  done_at timestamp with time zone,
  void_reason text,
  voided_at timestamp with time zone,
  voided_by text,
  customer_id text,
  tax numeric default 0 not null,
  invoice_no bigint,
  charges jsonb default '[]'::jsonb not null,
  charges_total numeric default 0 not null,
  receipt_notes text,
  voided_items jsonb default '[]'::jsonb not null,
  returned_items jsonb default '[]'::jsonb not null,
  refund_total numeric default 0 not null,
  stock_action text,
  return_reason text,
  returned_at timestamp with time zone,
  returned_by text,
  approved_by text,
  refund_of text,
  return_no bigint,
  ref text,
  guests integer,
  discount_type text,
  closed_at timestamp with time zone,
  scheduled_at timestamp with time zone,
  customer_user_id uuid,
  constraint orders_pkey PRIMARY KEY (id),
  constraint orders_channel_check CHECK ((channel = ANY (ARRAY['pos'::text, 'callcenter'::text, 'online'::text]))),
  constraint orders_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'pending'::text, 'active'::text, 'declined'::text, 'closed'::text, 'void'::text, 'returned'::text, 'refund'::text]))),
  constraint orders_type_check CHECK ((type = ANY (ARRAY['dinein'::text, 'pickup'::text, 'delivery'::text, 'fast'::text])))
);

create table if not exists public.payment_methods (
  id text default ('pm_'::text || replace((gen_random_uuid())::text, '-'::text, ''::text)) not null,
  name text not null,
  name_ar text,
  type text default 'other'::text not null,
  code text,
  open_drawer boolean default false not null,
  active boolean default true not null,
  sort integer,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  constraint payment_methods_pkey PRIMARY KEY (id),
  constraint payment_methods_type_check CHECK ((type = ANY (ARRAY['cash'::text, 'card'::text, 'other'::text])))
);

create table if not exists public.products (
  id text default ('prd_'::text || substr(md5((random())::text), 1, 10)) not null,
  name text not null,
  name_ar text,
  sku text,
  category_id text,
  price numeric(10,2) default 0 not null,
  tax_group text default 'TAX'::text,
  description text,
  image_url text,
  channels text[] default ARRAY['pos'::text, 'callcenter'::text, 'delivery'::text, 'takeaway'::text, 'dinein'::text] not null,
  branch_ids text[] default '{}'::text[] not null,
  active boolean default true not null,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  brand_id text,
  ingredients jsonb default '[]'::jsonb not null,
  pricing_method text default 'fixed'::text not null,
  costing_method text default 'ingredients'::text not null,
  selling_method text default 'unit'::text not null,
  cost numeric,
  barcode text,
  prep_time integer,
  calories numeric,
  custom_prices jsonb default '{}'::jsonb not null,
  inactive_branch_ids text[] default '{}'::text[] not null,
  out_of_stock_branch_ids text[] default '{}'::text[] not null,
  modifiers jsonb default '[]'::jsonb not null,
  sort integer,
  variant_set_id text,
  variants jsonb default '[]'::jsonb not null,
  variant_recipes jsonb default '{}'::jsonb not null,
  nutrition jsonb default '{}'::jsonb not null,
  allergens jsonb default '[]'::jsonb not null,
  constraint products_sku_key UNIQUE (sku),
  constraint products_pkey PRIMARY KEY (id)
);

create table if not exists public.roles (
  id text default ('role_'::text || replace((gen_random_uuid())::text, '-'::text, ''::text)) not null,
  name text not null,
  description text,
  permissions text[] default '{}'::text[] not null,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  name_ar text,
  constraint roles_pkey PRIMARY KEY (id)
);

create table if not exists public.settings (
  id text not null,
  data jsonb default '{}'::jsonb not null,
  updated_at timestamp with time zone default now() not null,
  constraint settings_pkey PRIMARY KEY (id)
);

create table if not exists public.shifts (
  id text default ('sh_'::text || substr(md5((random())::text), 1, 10)) not null,
  device_id text,
  branch_id text,
  cashier text,
  opening_cash numeric(10,2) default 0,
  opened_at timestamp with time zone default now() not null,
  closed_at timestamp with time zone,
  orders integer,
  sales numeric(12,2),
  expected_cash numeric(12,2),
  counted_cash numeric(12,2),
  difference numeric(12,2),
  constraint shifts_pkey PRIMARY KEY (id)
);

create table if not exists public.slick_act_fails (
  at timestamp with time zone default now() not null
);

create table if not exists public.slick_rt (
  id integer default 1 not null,
  topic text not null,
  constraint slick_rt_pkey PRIMARY KEY (id)
);

create table if not exists public.staff (
  user_id uuid not null,
  name text,
  role text default 'cashier'::text not null,
  branch_id text,
  created_at timestamp with time zone default now() not null,
  constraint staff_pkey PRIMARY KEY (user_id),
  constraint staff_role_check CHECK ((role = ANY (ARRAY['owner'::text, 'admin'::text, 'agent'::text, 'cashier'::text])))
);

create table if not exists public.staff_users (
  id text default ('usr_'::text || replace((gen_random_uuid())::text, '-'::text, ''::text)) not null,
  name text not null,
  email text,
  phone text,
  employee_no text,
  role_id text,
  branch_ids text[] default '{}'::text[] not null,
  pin_hash text,
  active boolean default true not null,
  user_id uuid,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  role_ids jsonb default '[]'::jsonb not null,
  language text,
  display_localized boolean default false not null,
  role text,
  constraint staff_users_user_id_key UNIQUE (user_id),
  constraint staff_users_pkey PRIMARY KEY (id)
);

create table if not exists public.stock_counts (
  id text default ('sc_'::text || replace((gen_random_uuid())::text, '-'::text, ''::text)) not null,
  branch_id text not null,
  item_id text not null,
  qty numeric not null,
  counted_at timestamp with time zone default now() not null,
  counted_by text,
  batch text,
  note text,
  constraint stock_counts_pkey PRIMARY KEY (id)
);

create table if not exists public.suppliers (
  id text default ('sup_'::text || replace((gen_random_uuid())::text, '-'::text, ''::text)) not null,
  name text not null,
  code text,
  contact_name text,
  phone text,
  email text,
  address text,
  notes text,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  constraint suppliers_pkey PRIMARY KEY (id)
);

create table if not exists public.tax_groups (
  id text default ('tg_'::text || replace((gen_random_uuid())::text, '-'::text, ''::text)) not null,
  name text not null,
  name_ar text,
  reference text,
  tax_ids text[] default '{}'::text[] not null,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  constraint tax_groups_pkey PRIMARY KEY (id)
);

create table if not exists public.taxes (
  id text default ('tax_'::text || replace((gen_random_uuid())::text, '-'::text, ''::text)) not null,
  name text not null,
  name_ar text,
  rate numeric default 0 not null,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  inclusive boolean default true not null,
  constraint taxes_pkey PRIMARY KEY (id),
  constraint taxes_rate_check CHECK (((rate >= (0)::numeric) AND (rate <= (100)::numeric)))
);

create table if not exists public.variant_sets (
  id text default ('var_'::text || replace((gen_random_uuid())::text, '-'::text, ''::text)) not null,
  name text not null,
  name_ar text,
  options jsonb default '[]'::jsonb not null,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  constraint variant_sets_pkey PRIMARY KEY (id)
);

create table if not exists public.warehouses (
  id text default ('wh_'::text || replace((gen_random_uuid())::text, '-'::text, ''::text)) not null,
  name text not null,
  reference text,
  address text,
  deleted boolean default false not null,
  created_at timestamp with time zone default now() not null,
  constraint warehouses_pkey PRIMARY KEY (id)
);

create table if not exists public.web_customers (
  id uuid not null,
  first_name text,
  last_name text,
  nickname text,
  dob date,
  email text,
  phone text,
  addresses jsonb default '[]'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  constraint web_customers_pkey PRIMARY KEY (id)
);

CREATE OR REPLACE FUNCTION public.slick_activate_device(p_code text)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare d record;
begin
  if auth.uid() is null then return json_build_object('error', 'auth'); end if;
  select * into d from public.devices where code = p_code and coalesce(deleted, false) = false limit 1;
  if not found then return json_build_object('error', 'invalid'); end if;
  if d.activated_at is not null and d.auth_uid is distinct from auth.uid() then return json_build_object('error', 'used'); end if;
  update public.devices set activated_at = now(), last_seen = now(), auth_uid = auth.uid() where id = d.id;
  return json_build_object('id', d.id);
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_activate_device_key(p_code text)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare d record; k text;
begin
  if (select count(*) from public.slick_act_fails where at > now() - interval '10 minutes') >= 30 then
    return json_build_object('error', 'wait');                    -- too many wrong codes: slow down guessing
  end if;
  select * into d from public.devices where code = p_code and coalesce(deleted, false) = false limit 1;
  if not found or coalesce(p_code, '') !~ '^[0-9]{6}$' then
    insert into public.slick_act_fails default values;
    delete from public.slick_act_fails where at < now() - interval '1 day';
    return json_build_object('error', 'invalid');
  end if;
  if d.activated_at is not null then return json_build_object('error', 'used'); end if;
  k := encode(extensions.gen_random_bytes(32), 'hex');
  update public.devices set activated_at = now(), last_seen = now(), key_hash = encode(extensions.digest(k, 'sha256'), 'hex') where id = d.id;
  return json_build_object('id', d.id, 'key', k, 'topic', (select topic from public.slick_rt where id = 1));
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_branch_numbers()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare since timestamptz; n bigint; prev orders%rowtype; bkey text;
begin
  -- an offline register re-sending a sale it already sent: keep the numbers it got the first time
  if tg_op = 'INSERT' then
    select * into prev from orders where id = new.id;
    if found then
      new.ref := coalesce(prev.ref, new.ref); new.invoice_no := coalesce(prev.invoice_no, new.invoice_no); new.return_no := coalesce(prev.return_no, new.return_no);
      return new;
    end if;
  end if;
  -- reference: this brand's next number, given only once the order is sent (a call-center draft has none yet)
  if coalesce(new.status, '') = 'draft' then
    if tg_op = 'INSERT' then new.ref := null; end if;
  elsif new.ref is null or (tg_op = 'INSERT') or (coalesce(old.status, '') = 'draft' and old.ref is null) then
    if tg_op = 'INSERT' or new.ref is null then
      bkey := coalesce(new.brand_id::text, (select b.brand_id::text from branches b where b.id::text = new.branch_id::text), 'none');
      perform pg_advisory_xact_lock(hashtext('slick_brand_ref:' || bkey));
      insert into brand_counters (brand_id, ref) values (bkey, 100001)
        on conflict (brand_id) do update set ref = greatest(brand_counters.ref, 100000) + 1
        returning ref into n;
      new.ref := 'REF-' || n::text;
    end if;
  end if;

  if new.branch_id is null then return new; end if;
  perform pg_advisory_xact_lock(hashtext('slick_branch_numbers:' || new.branch_id::text));

  -- return ticket: this branch's next return number
  if new.status = 'refund' then
    if new.return_no is not null and (tg_op = 'INSERT' or old.return_no is null) then
      insert into branch_counters (branch_id, ret) values (new.branch_id::text, 100001)
        on conflict (branch_id) do update set ret = greatest(coalesce(branch_counters.ret, 0), 100000) + 1
        returning ret into n;
      new.return_no := n;
    end if;
    return new;
  end if;

  -- invoice: when the order first gets one, this branch's next number
  if new.invoice_no is not null and (tg_op = 'INSERT' or old.invoice_no is null) then
    insert into branch_counters (branch_id, invoice) values (new.branch_id::text, 100001)
      on conflict (branch_id) do update set invoice = greatest(coalesce(branch_counters.invoice, 0), 100000) + 1
      returning invoice into n;
    new.invoice_no := n;
  end if;

  -- call number: unique in the branch since its last end of day
  if new.no is not null and (tg_op = 'INSERT' or old.no is distinct from new.no) then
    select max(closed_at) into since from day_closes where branch_id::text = new.branch_id::text;
    if exists (select 1 from orders o where o.branch_id = new.branch_id and o.id <> new.id and o.status <> 'refund'
               and o.no::text = new.no::text and o.created_at > coalesce(since, '-infinity'::timestamptz)) then
      select coalesce(max(nullif(regexp_replace(o.no::text, '\D', '', 'g'), '')::bigint), 0) + 1 into n
        from orders o where o.branch_id = new.branch_id and o.id <> new.id and o.status <> 'refund' and o.created_at > coalesce(since, '-infinity'::timestamptz);
      new.no := n;
    end if;
  end if;
  return new;
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_claim_login()
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare u staff_users; lvl text; em text;
begin
  if auth.uid() is null then return null; end if;
  if exists(select 1 from staff where user_id = auth.uid()) then return (select role from staff where user_id = auth.uid()); end if;
  select email into em from auth.users where id = auth.uid();
  select * into u from staff_users where lower(email) = lower(em) and active and not deleted and (user_id is null or user_id = auth.uid()) limit 1;
  if u.id is null then return null; end if;
  select case when 'bo_manage' = any(r.permissions) then 'admin' when exists(select 1 from unnest(r.permissions) p where p like 'bo_%') then 'agent' else null end
    into lvl from roles r where r.id = u.role_id and not r.deleted;
  if lvl is null then return null; end if;
  update staff_users set user_id = auth.uid() where id = u.id;
  insert into staff (user_id, name, role, branch_id) values (auth.uid(), u.name, lvl, u.branch_ids[1]);
  return lvl;
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_close_inv_doc(p_id text, p_by text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
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
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_customers(p_q text DEFAULT ''::text, p_filter text DEFAULT 'all'::text, p_sort text DEFAULT 'last'::text, p_limit integer DEFAULT 50, p_offset integer DEFAULT 0)
 RETURNS jsonb
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
with st as (
  select customer_id, count(*) n, sum(total) spent, max(created_at) last_at, min(created_at) first_at
  from orders where customer_id is not null and status in ('pending','active','closed') group by customer_id
), c as (
  select c.*, coalesce(st.n,0) n, coalesce(st.spent,0) spent, st.last_at, st.first_at
  from customers c left join st on st.customer_id = c.id
), f as (
  select * from c
  where (coalesce(p_q,'') = '' or c.name ilike '%'||p_q||'%' or c.phone ilike '%'||regexp_replace(p_q,'[^0-9+]','','g')||'%' and regexp_replace(p_q,'[^0-9+]','','g') <> '' or c.email ilike '%'||p_q||'%')
    and case p_filter
      when 'deleted' then deleted_at is not null
      when 'blacklisted' then blacklisted and deleted_at is null
      when 'repeat' then n >= 2 and deleted_at is null
      when 'new' then first_at >= now() - interval '30 days' and deleted_at is null
      when 'inactive' then last_at < now() - interval '60 days' and deleted_at is null
      else deleted_at is null end
)
select jsonb_build_object(
  'count', (select count(*) from f),
  'summary', (select jsonb_build_object('total', count(*), 'new30', count(*) filter (where first_at >= now() - interval '30 days'),
                 'repeat', count(*) filter (where n >= 2), 'withOrders', count(*) filter (where n >= 1),
                 'avgSpend', coalesce(avg(spent) filter (where n >= 1), 0), 'blacklisted', count(*) filter (where blacklisted)) from c where deleted_at is null),
  'rows', (select coalesce(jsonb_agg(x), '[]') from (
      select id, phone, name, email, tags, blacklisted, n, spent, last_at, first_at, deleted_at from f
      order by case when p_sort = 'spent' then spent end desc nulls last,
               case when p_sort = 'orders' then n end desc nulls last,
               case when p_sort = 'name' then lower(coalesce(name, phone)) end asc,
               case when p_sort = 'new' then created_at end desc,
               last_at desc nulls last, created_at desc
      limit p_limit offset p_offset) x)
);
$function$
;

CREATE OR REPLACE FUNCTION public.slick_dashboard(p_day date, p_days integer DEFAULT 1, p_branches text[] DEFAULT NULL::text[], p_brand text DEFAULT NULL::text, p_tz text DEFAULT 'Asia/Beirut'::text, p_cut integer DEFAULT 0)
 RETURNS jsonb
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
with rng as (
  select (((p_day - (p_days - 1))::timestamp + make_interval(mins => p_cut)) at time zone p_tz) as t0, (((p_day + 1)::timestamp + make_interval(mins => p_cut)) at time zone p_tz) as t1
), o as (
  select o.*, (o.created_at at time zone p_tz) as lt,
         coalesce(o.total, 0) - coalesce(o.tax, 0) as net,          -- net sales = payments minus tax
         case when o.status = 'closed' then 1 else 0 end as sale
  from orders o, rng
  where o.created_at >= rng.t0 and o.created_at < rng.t1
    and (p_branches is null or o.branch_id = any(p_branches))
    and (p_brand is null or o.brand_id = p_brand)
), ok as (select * from o where status in ('closed','refund'))
select jsonb_build_object(
  'orders',    (select count(*) from ok where sale = 1),
  'net',       (select coalesce(sum(net),0) from ok),
  'discount',  (select coalesce(sum(discount),0) from ok where sale = 1),
  'payments',  (select coalesce(sum(total),0) from ok),
  'tax',       (select coalesce(sum(tax),0) from ok),
  'deliveryFees', (select coalesce(sum(delivery_fee),0) from ok where sale = 1),
  'refunds',   (select jsonb_build_object('n', count(*), 'v', coalesce(-sum(total),0), 'tax', coalesce(-sum(tax),0)) from ok where status = 'refund'),
  'declined',  (select jsonb_build_object('n', count(*), 'v', coalesce(sum(total),0)) from o where status = 'declined'),
  'open',      (select count(*) from o where status in ('pending','active')),
  'hours',     (select coalesce(jsonb_agg(x order by x.h), '[]') from (
                  select extract(hour from lt)::int h, sum(sale) n, sum(net) net, sum(total) pay, sum(discount) disc from ok group by 1) x),
  'days',      (select coalesce(jsonb_agg(x order by x.d), '[]') from (
                  select (lt - make_interval(mins => p_cut))::date d, sum(sale) n, sum(net) net from ok group by 1) x),
  'branches',  (select coalesce(jsonb_agg(x), '[]') from (
                  select branch_id id, sum(sale) n, sum(net) net, sum(discount) disc, sum(total) pay from ok group by 1) x),
  'types',     (select coalesce(jsonb_agg(x), '[]') from (
                  select coalesce(type,'other') k, sum(sale) n, sum(net) net from ok group by 1) x),
  'channels',  (select coalesce(jsonb_agg(x), '[]') from (
                  select coalesce(channel,'other') k, sum(sale) n, sum(net) net from ok group by 1) x),
  'payMethods',(select coalesce(jsonb_agg(x), '[]') from (
                  select coalesce(payment->>'method', case when channel = 'pos' then 'cash' else 'on delivery' end) k, sum(sale) n, sum(total) v from ok group by 1) x),
  'products',  (select coalesce(jsonb_agg(x order by x.v desc), '[]') from (
                  select i->>'name' name, sum(coalesce((i->>'qty')::numeric,1) * case when ok.sale = 1 then 1 else -1 end) qty,
                         sum(coalesce((i->>'qty')::numeric,1) * coalesce((i->>'price')::numeric,0) * case when ok.sale = 1 then 1 else -1 end) v
                  from ok, jsonb_array_elements(case when jsonb_typeof(ok.items) = 'array' then ok.items else '[]'::jsonb end) i
                  where i->>'name' is not null group by 1 order by 3 desc limit 10) x),
  'callcenter',(select jsonb_build_object(
                  'byStatus', (select coalesce(jsonb_object_agg(status, n), '{}') from (select status, count(*) n from o where channel = 'callcenter' group by 1) s),
                  'byAgent',  (select coalesce(jsonb_agg(a), '[]') from (select coalesce(agent,'-') k, count(*) n, sum(net) net from ok where channel = 'callcenter' and sale = 1 group by 1 order by 2 desc) a),
                  'byBranch', (select coalesce(jsonb_agg(b), '[]') from (select branch_id id, count(*) n, sum(net) net from ok where channel = 'callcenter' and sale = 1 group by 1) b)))
);
$function$
;

CREATE OR REPLACE FUNCTION public.slick_declined_no_numbers()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  if new.status = 'declined' then new.invoice_no := null; new.no := null; end if;
  return new;
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_device_id()
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select d.id::text from public.devices d
  where d.key_hash is not null
    and d.key_hash = encode(extensions.digest(coalesce(nullif(current_setting('request.headers', true), '')::json ->> 'x-slick-device', ''), 'sha256'), 'hex')
    and d.activated_at is not null and coalesce(d.deleted, false) = false
  limit 1;
$function$
;

CREATE OR REPLACE FUNCTION public.slick_device_ok()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$ select public.slick_device_id() is not null; $function$
;

CREATE OR REPLACE FUNCTION public.slick_doc_action(p_id text, p_action text, p_by text DEFAULT NULL::text, p_lines jsonb DEFAULT NULL::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
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
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_inv_doc_ref()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
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
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_inv_history(p_from timestamp with time zone, p_to timestamp with time zone, p_loc text DEFAULT NULL::text, p_item text DEFAULT NULL::text)
 RETURNS TABLE(id text, branch_id text, item_id text, qty numeric, delta numeric, counted_at timestamp with time zone, counted_by text, batch text, note text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select x.id, x.branch_id, x.item_id, x.qty, x.delta, x.counted_at, x.counted_by, x.batch, x.note from (
    select s.id::text id, s.branch_id::text branch_id, s.item_id::text item_id, s.qty,
           s.qty - coalesce(lag(s.qty) over (partition by s.branch_id, s.item_id order by s.counted_at, s.id), 0) delta,
           s.counted_at, s.counted_by::text counted_by, s.batch::text batch, s.note::text note
      from stock_counts s
     where (p_loc is null or s.branch_id::text = p_loc) and (p_item is null or s.item_id::text = p_item) and s.counted_at <= p_to
  ) x
  where x.counted_at >= p_from and staff_role() is not null
  order by x.counted_at desc
  limit 3000
$function$
;

CREATE OR REPLACE FUNCTION public.slick_inventory(p_branches text[] DEFAULT NULL::text[])
 RETURNS jsonb
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
with items as (select * from inventory_items where not coalesce(deleted,false)),
br as (select id from branches where coalesce(active,true) and (p_branches is null or id = any(p_branches))),
latest as (
  select distinct on (s.branch_id, s.item_id) s.branch_id, s.item_id, s.qty, s.counted_at
  from stock_counts s join br on br.id = s.branch_id
  order by s.branch_id, s.item_id, s.counted_at desc
), l as (
  select latest.*, i.name, i.category, i.storage_unit unit, coalesce(i.cost,0) cost, i.min_level, i.par_level,
         latest.qty * coalesce(i.cost,0) value
  from latest join items i on i.id = latest.item_id
)
select jsonb_build_object(
  'items',      (select count(*) from items),
  'withCost',   (select count(*) from items where coalesce(cost,0) > 0),
  'withMin',    (select count(*) from items where coalesce(min_level,0) > 0),
  'value',      (select coalesce(sum(value),0) from l),
  'counted',    (select count(distinct item_id) from l),
  'belowMin',   (select count(*) from l where min_level > 0 and qty < min_level),
  'outOfStock', (select count(*) from l where qty = 0),
  'branches',   (select coalesce(jsonb_agg(x), '[]') from (
                   select br.id, coalesce(sum(l.value),0) value, count(l.item_id) counted,
                          count(*) filter (where l.min_level > 0 and l.qty < l.min_level) below_min, max(l.counted_at) last_count
                   from br left join l on l.branch_id = br.id group by br.id) x),
  'categories', (select coalesce(jsonb_agg(x order by x.value desc), '[]') from (
                   select coalesce(category,'Uncategorized') k, sum(value) value, count(*) n from l group by 1) x),
  'low',        (select coalesce(jsonb_agg(x order by x.ratio), '[]') from (
                   select branch_id, item_id, name, unit, qty, min_level, par_level, counted_at,
                          case when min_level > 0 then qty / min_level else 1 end ratio
                   from l where min_level > 0 and qty < min_level order by ratio limit 50) x)
);
$function$
;

CREATE OR REPLACE FUNCTION public.slick_item_recipe(p products, li jsonb)
 RETURNS jsonb
 LANGUAGE sql
 STABLE
AS $function$
  select coalesce(case when coalesce(li->>'variant','') <> '' and jsonb_typeof(p.variant_recipes->(li->>'variant')) = 'array' then p.variant_recipes->(li->>'variant') end, p.ingredients, '[]'::jsonb) $function$
;

CREATE OR REPLACE FUNCTION public.slick_items_tax(p_items jsonb, p_discount numeric)
 RETURNS numeric
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare it jsonb; r numeric; line numeric; gross numeric := 0; t numeric := 0;
        incl boolean := coalesce((select (data->>'taxInclusive')::boolean from settings where id = 'company'), true);
begin
  if p_items is null or jsonb_typeof(p_items) <> 'array' then return 0; end if;
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
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_keep_numbered_orders()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  if coalesce(current_setting('slick.reset', true), '') = 'on' then return old; end if;
  if old.ref is not null or old.invoice_no is not null or old.return_no is not null then
    raise exception 'Order % has a number and can''t be deleted. Void it instead.', coalesce(old.ref, old.id::text);
  end if;
  return old;
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_kitchen(p_day date, p_days integer DEFAULT 1, p_branches text[] DEFAULT NULL::text[], p_brand text DEFAULT NULL::text, p_tz text DEFAULT 'Asia/Beirut'::text, p_cut integer DEFAULT 0)
 RETURNS jsonb
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
with rng as (
  select (((p_day - (p_days - 1))::timestamp + make_interval(mins => p_cut)) at time zone p_tz) as t0, (((p_day + 1)::timestamp + make_interval(mins => p_cut)) at time zone p_tz) as t1
), o as (
  select o.*, extract(epoch from (o.accepted_at - o.created_at))/60 as acc_min,
         extract(epoch from (o.done_at - coalesce(o.accepted_at, o.created_at)))/60 as prep_min,
         extract(epoch from (o.done_at - o.created_at))/60 as total_min
  from orders o, rng
  where o.created_at >= rng.t0 and o.created_at < rng.t1 and o.status <> 'draft'
    and (p_branches is null or o.branch_id = any(p_branches))
    and (p_brand is null or o.brand_id = p_brand)
), inc as (select * from o where channel <> 'pos'),
q as (  -- live queue right now (last 24h), ignores the date filter
  select branch_id, status, created_at, accepted_at from orders
  where status in ('pending','active') and channel <> 'pos' and created_at > now() - interval '24 hours'
    and (p_branches is null or branch_id = any(p_branches)) and (p_brand is null or brand_id = p_brand)
)
select jsonb_build_object(
  'tickets',   (select count(*) from o where status <> 'declined'),
  'incoming',  (select count(*) from inc),
  'accepted',  (select count(*) from inc where accepted_at is not null),
  'declined',  (select count(*) from inc where status = 'declined'),
  'avgAccept', (select round(avg(acc_min)::numeric, 1) from inc where acc_min is not null),
  'avgPrep',   (select round(avg(prep_min)::numeric, 1) from inc where status = 'closed' and prep_min is not null),
  'avgTotal',  (select round(avg(total_min)::numeric, 1) from inc where status = 'closed' and total_min is not null),
  'slowAccept',(select count(*) from inc where acc_min > 5),
  'late',      (select count(*) from inc where status = 'closed' and total_min > 45),
  'hours',     (select coalesce(jsonb_agg(x order by x.h), '[]') from (
                  select extract(hour from created_at at time zone p_tz)::int h, count(*) n,
                         round(avg(prep_min) filter (where channel <> 'pos' and status = 'closed')::numeric, 1) prep
                  from o where status <> 'declined' group by 1) x),
  'branches',  (select coalesce(jsonb_agg(x), '[]') from (
                  select branch_id id, count(*) n, count(*) filter (where status = 'declined') declined,
                         round(avg(acc_min)::numeric, 1) acc, round(avg(prep_min) filter (where status = 'closed')::numeric, 1) prep,
                         count(*) filter (where status = 'closed' and total_min > 45) late
                  from inc group by 1) x),
  'queue',     (select coalesce(jsonb_agg(x), '[]') from (
                  select branch_id id, count(*) filter (where status = 'pending') pending, count(*) filter (where status = 'active') active,
                         round(max(extract(epoch from (now() - created_at))/60) filter (where status = 'pending')::numeric, 0) oldest_pending,
                         round(max(extract(epoch from (now() - coalesce(accepted_at, created_at)))/60) filter (where status = 'active')::numeric, 0) oldest_active
                  from q group by 1) x)
);
$function$
;

CREATE OR REPLACE FUNCTION public.slick_move(p_loc text, p_item text, p_delta numeric, p_by text, p_batch text, p_note text)
 RETURNS numeric
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
declare cur numeric;
begin
  if coalesce(p_delta,0) = 0 then return null; end if;
  select qty into cur from stock_counts where branch_id = p_loc and item_id = p_item order by counted_at desc limit 1;
  insert into stock_counts(branch_id, item_id, qty, counted_by, batch, note) values (p_loc, p_item, coalesce(cur,0) + p_delta, p_by, p_batch, p_note);
  return coalesce(cur,0) + p_delta;
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_my_orders(p_brand text DEFAULT NULL::text)
 RETURNS SETOF json
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select json_build_object('id', o.id, 'no', o.no, 'created_at', o.created_at, 'status', o.status, 'type', o.type,
                           'branch_id', o.branch_id, 'brand_id', o.brand_id, 'items', o.items, 'total', o.total)
  from orders o
  where o.customer_user_id = auth.uid() and (p_brand is null or o.brand_id::text = p_brand)
  order by o.created_at desc
  limit 50;
$function$
;

CREATE OR REPLACE FUNCTION public.slick_my_points()
 RETURNS numeric
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select coalesce(floor(sum(total)), 0) from orders where customer_user_id = auth.uid() and status = 'closed';
$function$
;

CREATE OR REPLACE FUNCTION public.slick_norm_phone(p text)
 RETURNS text
 LANGUAGE sql
 IMMUTABLE
AS $function$
  select nullif(regexp_replace(coalesce(p,''), '[^0-9+]', '', 'g'), '')
$function$
;

CREATE OR REPLACE FUNCTION public.slick_order_customer()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare ph text := slick_norm_phone(new.phone); cid text;
begin
  if ph is null or length(ph) < 6 then return new; end if;
  insert into customers(phone, name, addresses)
  values (ph, nullif(trim(new.customer_name),''),
          case when coalesce(trim(new.address),'') <> '' then jsonb_build_array(jsonb_build_object('address', trim(new.address), 'lat', new.lat, 'lng', new.lng)) else '[]'::jsonb end)
  on conflict (phone) do update set
    name = coalesce(nullif(customers.name,''), excluded.name),
    addresses = case
      when coalesce(trim(new.address),'') = '' or customers.addresses @> jsonb_build_array(jsonb_build_object('address', trim(new.address))) then customers.addresses
      else (jsonb_build_array(jsonb_build_object('address', trim(new.address), 'lat', new.lat, 'lng', new.lng)) || customers.addresses) end,
    updated_at = now()
  returning id into cid;
  new.customer_id := cid;
  return new;
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_order_no()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  if new.channel <> 'pos' then new.no := null; end if;
  return new;
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_order_numbers()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  if tg_op = 'INSERT' then
    new.ref := slick_ref_prefix(new.channel) || '-' || lpad(nextval('order_ref_seq')::text, 6, '0');
  else
    new.ref := old.ref;                       -- a reference never changes
  end if;
  if new.status = 'refund' then
    new.invoice_no := null;
    if new.return_no is null then new.return_no := nextval('return_no_seq'); end if;
  elsif tg_op = 'INSERT' and coalesce(new.channel,'pos') <> 'pos' and new.status not in ('active','closed') then
    new.invoice_no := null;                   -- call center / online: the POS bills it
  elsif new.invoice_no is null and (coalesce(new.channel,'pos') = 'pos' or new.status in ('active','closed')) then
    new.invoice_no := nextval('invoice_no_seq');
  end if;
  return new;
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_order_stock()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
        for g in select * from jsonb_array_elements(slick_item_recipe(p, li)) loop
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
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_order_tax()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin new.tax := slick_items_tax(new.items, abs(coalesce(new.discount,0))) * case when new.status = 'refund' then -1 else 1 end; return new; end $function$
;

CREATE OR REPLACE FUNCTION public.slick_order_times()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  if tg_op = 'INSERT' then
    if new.status = 'active' then new.accepted_at := coalesce(new.accepted_at, now()); end if;
    if new.status in ('closed','declined') and new.channel <> 'pos' then new.done_at := coalesce(new.done_at, now()); end if;
  elsif new.status is distinct from old.status then
    if new.status = 'active' and new.accepted_at is null then new.accepted_at := now(); end if;
    if new.status in ('closed','declined') and new.done_at is null then new.done_at := now(); end if;
  end if;
  return new;
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_order_usage(p_items jsonb, p_type text)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare li jsonb; op jsonb; g jsonb; p products; mo modifier_options; used jsonb := '{}'::jsonb;
begin
  for li in select * from jsonb_array_elements(coalesce(p_items,'[]'::jsonb)) loop
    select * into p from products where id = li->>'productId';
    if p.id is not null and coalesce(p.costing_method,'ingredients') = 'ingredients' then
      for g in select * from jsonb_array_elements(slick_item_recipe(p, li)) loop
        if g ? 'types' and not (g->'types') ? p_type then continue; end if;
        used := jsonb_set(used, array[g->>'itemId'], to_jsonb(coalesce((used->>(g->>'itemId'))::numeric,0) + coalesce((g->>'qty')::numeric,0) * coalesce((li->>'qty')::numeric,1)));
      end loop;
    end if;
    for op in select * from jsonb_array_elements(coalesce(li->'options','[]'::jsonb)) loop
      select * into mo from modifier_options where id = op->>'id';
      if mo.id is null or coalesce(mo.costing_method,'ingredients') <> 'ingredients' then continue; end if;
      for g in select * from jsonb_array_elements(coalesce(mo.ingredients,'[]'::jsonb)) loop
        if g ? 'types' and not (g->'types') ? p_type then continue; end if;
        used := jsonb_set(used, array[g->>'itemId'], to_jsonb(coalesce((used->>(g->>'itemId'))::numeric,0) + coalesce((g->>'qty')::numeric,0) * coalesce((li->>'qty')::numeric,1)));
      end loop;
    end loop;
  end loop;
  return used;
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_order_void()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  if new.status = 'void' and old.status is distinct from 'void' then
    if staff_role() not in ('owner','admin') then raise exception 'Only an owner or admin can void orders'; end if;
    new.voided_at := now();
  end if;
  return new;
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_owner_on_signup()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if lower(new.email) = 'ziad.khayat91@gmail.com' then
    insert into public.staff (user_id, name, role) values (new.id, 'Ziad', 'owner') on conflict (user_id) do update set role = 'owner';
  end if;
  return new;
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_public_settings()
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$ select jsonb_build_object( 'taxInclusive', coalesce((data->>'taxInclusive')::boolean, true), 'decimals', coalesce((data->>'priceDecimals')::int, 2), 'currency', coalesce(data->>'currency', 'USD'), 'currency2', data->>'currency2', 'rate2', (data->>'rate2')::numeric, 'decimals2', coalesce((data->>'decimals2')::int, 0), 'country', coalesce(data->>'country', 'Lebanon')) from settings where id = 'company' $function$
;

CREATE OR REPLACE FUNCTION public.slick_ref_prefix(ch text)
 RETURNS text
 LANGUAGE sql
 IMMUTABLE
AS $function$ select 'REF'::text $function$
;

CREATE OR REPLACE FUNCTION public.slick_rename_lookup()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if new.name is not distinct from old.name or old.name is null then return new; end if;
  if tg_table_name = 'order_sources' then
    update orders set source = new.name where source = old.name;
    update settings set data = jsonb_set(data::jsonb, '{ccDefaultSource}', to_jsonb(new.name)) where id = 'app' and data::jsonb->>'ccDefaultSource' = old.name;
  elsif tg_table_name = 'payment_methods' then
    update orders set payment = jsonb_set(payment::jsonb, '{method}', to_jsonb(new.name))
      where payment is not null
        and (payment::jsonb->>'methodId' = new.id::text or (coalesce(payment::jsonb->>'methodId', '') = '' and payment::jsonb->>'method' = old.name));
  end if;
  return new;
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_ring()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  perform realtime.send(jsonb_build_object('t', TG_TABLE_NAME), 'chg', (select topic from public.slick_rt where id = 1), false);
  return null;
exception when others then return null;                         -- never block a save because of the bell
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_set_user_password(p_user uuid, p_password text)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
begin
  if coalesce(public.staff_role_user(), '') not in ('owner', 'admin') then return json_build_object('error', 'forbidden'); end if;
  if length(coalesce(p_password, '')) < 8 then return json_build_object('error', 'short'); end if;
  -- only logins that belong to a Slick user can be changed here
  if not exists (select 1 from public.staff_users s where s.user_id = p_user and coalesce(s.deleted, false) = false) then
    return json_build_object('error', 'nouser');
  end if;
  update auth.users set encrypted_password = extensions.crypt(p_password, extensions.gen_salt('bf')), updated_at = now() where id = p_user;
  if not found then return json_build_object('error', 'nouser'); end if;
  return json_build_object('ok', true);
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_stock_all()
 RETURNS TABLE(location_id text, item_id text, qty numeric, counted_at timestamp with time zone)
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  select distinct on (branch_id, item_id) branch_id, item_id, qty, counted_at
  from stock_counts order by branch_id, item_id, counted_at desc;
$function$
;

CREATE OR REPLACE FUNCTION public.slick_stock_items(p_order text, p_items jsonb, p_mode text)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare o orders; used jsonb; k text; it inventory_items; q numeric; out_items jsonb := '[]'::jsonb; total numeric := 0; typ text; n int := 0; tag text;
begin
  if staff_role() is null then raise exception 'not allowed'; end if;
  if p_mode not in ('waste','restock') then raise exception 'mode must be waste or restock'; end if;
  select * into o from orders where id = p_order;
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
    insert into order_transactions(ref, kind, order_id, order_no, branch_id, items, total_cost)
    values (tag, case when p_mode = 'waste' then 'waste' else 'return' end, o.id, o.no::text, o.branch_id, out_items, round(total, 5));
  end if;
  return n;
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_stock_levels(p_branch text)
 RETURNS TABLE(item_id text, qty numeric, counted_at timestamp with time zone, counted_by text)
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  select distinct on (item_id) item_id, qty, counted_at, counted_by
  from stock_counts where branch_id = p_branch order by item_id, counted_at desc;
$function$
;

CREATE OR REPLACE FUNCTION public.slick_sync_staff()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare lvl text;
begin
  if new.user_id is null then return new; end if;
  if exists(select 1 from staff where user_id = new.user_id and role = 'owner') then return new; end if;
  select case when 'bo_manage' = any(r.permissions) then 'admin' when exists(select 1 from unnest(r.permissions) p where p like 'bo_%') then 'agent' else null end
    into lvl from roles r where r.id = new.role_id and not r.deleted;
  if not new.active or new.deleted or lvl is null then delete from staff where user_id = new.user_id;
  else update staff set role = lvl, name = new.name where user_id = new.user_id; end if;
  return new;
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_sync_web_customer()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare d text; ph text; nm text; cid uuid; ad jsonb; cur jsonb;
begin
  d := regexp_replace(coalesce(new.phone, ''), '\D', '', 'g');
  if length(d) < 6 then return new; end if;
  ph := case when new.phone ~ '^\s*\+' then '+' || d when d like '00%' then '+' || substr(d, 3) else '+961' || ltrim(d, '0') end;
  nm := nullif(trim(coalesce(new.first_name, '') || ' ' || coalesce(new.last_name, '')), '');
  ad := coalesce((select jsonb_agg(jsonb_strip_nulls(jsonb_build_object(
          'address', trim(case when coalesce(a->>'label', '') <> '' then '[' || (a->>'label') || '] ' else '' end
                   || concat_ws(' · ', nullif(a->>'street', ''), 'Bldg: ' || nullif(a->>'building', ''), 'Floor: ' || nullif(a->>'floor', ''), 'Info: ' || nullif(a->>'extra', ''))),
          'lat', a->'lat', 'lng', a->'lng', 'webId', a->>'id', 'createdAt', to_char(now() at time zone 'utc', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'))))
        from jsonb_array_elements(case when jsonb_typeof(new.addresses) = 'array' then new.addresses else '[]'::jsonb end) a), '[]'::jsonb);
  select id, addresses into cid, cur from customers where web_customer_id = new.id limit 1;
  if cid is null then
    select id, addresses into cid, cur from customers
      where regexp_replace(coalesce(phone, ''), '\D', '', 'g') = ltrim(ph, '+')
         or right(regexp_replace(coalesce(phone, ''), '\D', '', 'g'), 8) = right(d, 8)
      order by created_at limit 1;
  end if;
  if cid is null then
    insert into customers (name, phone, email, birthday, addresses, web_customer_id)
    values (coalesce(nm, new.email, ph), ph, new.email, new.dob, ad, new.id);
  else
    -- keep the back office's addresses; replace only the ones that came from this web account
    cur := coalesce((select jsonb_agg(x) from jsonb_array_elements(case when jsonb_typeof(cur) = 'array' then cur else '[]'::jsonb end) x where x->>'webId' is null), '[]'::jsonb);
    update customers set name = coalesce(nm, name), email = coalesce(new.email, email),
      addresses = cur || ad, web_customer_id = new.id, updated_at = now()
    where id = cid;
    if new.dob is not null then update customers set birthday = new.dob where id = cid; end if;
  end if;
  return new;
exception when others then
  raise warning 'slick_sync_web_customer: %', sqlerrm;   -- never block the customer's sign-up or profile save
  return new;
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_tax_inclusive()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select coalesce((select (data->>'taxInclusive')::boolean from settings where id = 'company'), true) $function$
;

CREATE OR REPLACE FUNCTION public.slick_undelete_customer()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if new.customer_id is not null then update customers set deleted_at = null where id = new.customer_id and deleted_at is not null; end if;
  return new;
exception when others then return new;
end $function$
;

CREATE OR REPLACE FUNCTION public.slick_wipe_branch_orders(p_branch text)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare n integer;
begin
  if not exists (select 1 from staff where user_id = auth.uid() and role in ('owner','admin')) then
    raise exception 'Only the owner or an admin can delete a branch''s orders.';
  end if;
  perform set_config('slick.reset', 'on', true);   -- lets this run delete numbered orders
  delete from orders where branch_id::text = p_branch;
  get diagnostics n = row_count;
  if to_regclass('public.shifts') is not null then delete from shifts where branch_id::text = p_branch; end if;
  if to_regclass('public.day_closes') is not null then delete from day_closes where branch_id::text = p_branch; end if;
  delete from branch_counters where branch_id = p_branch;   -- invoices and returns start again from the first number
  return n;
end $function$
;

CREATE OR REPLACE FUNCTION public.staff_role()
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select coalesce(
    public.staff_role_user(),
    (select 'cashier'::text from public.devices d
      where d.auth_uid = auth.uid() and d.activated_at is not null and coalesce(d.deleted, false) = false limit 1),
    (select 'cashier'::text where public.slick_device_id() is not null)
  );
$function$
;

CREATE OR REPLACE FUNCTION public.staff_role_user()
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$ select role from staff where user_id = auth.uid() $function$
;

CREATE OR REPLACE FUNCTION public.touch()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$ begin new.updated_at = now(); return new; end $function$
;

alter table public.branches add constraint branches_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES brands(id);

alter table public.categories add constraint categories_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES brands(id);

alter table public.day_closes add constraint day_closes_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE;

alter table public.delivery_zones add constraint delivery_zones_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES branches(id);

alter table public.devices add constraint devices_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES branches(id);

alter table public.house_account_txns add constraint house_account_txns_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE;

alter table public.modifier_options add constraint modifier_options_modifier_id_fkey FOREIGN KEY (modifier_id) REFERENCES modifiers(id) ON DELETE CASCADE;

alter table public.orders add constraint orders_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES branches(id);

alter table public.orders add constraint orders_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES brands(id);

alter table public.orders add constraint orders_device_id_fkey FOREIGN KEY (device_id) REFERENCES devices(id);

alter table public.orders add constraint orders_shift_id_fkey FOREIGN KEY (shift_id) REFERENCES shifts(id);

alter table public.orders add constraint orders_zone_id_fkey FOREIGN KEY (zone_id) REFERENCES delivery_zones(id);

alter table public.products add constraint products_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES brands(id);

alter table public.products add constraint products_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id);

alter table public.shifts add constraint shifts_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES branches(id);

alter table public.shifts add constraint shifts_device_id_fkey FOREIGN KEY (device_id) REFERENCES devices(id);

alter table public.staff add constraint staff_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES branches(id);

alter table public.staff add constraint staff_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

alter table public.staff_users add constraint staff_users_role_id_fkey FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL;

alter table public.staff_users add constraint staff_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

alter table public.stock_counts add constraint stock_counts_item_id_fkey FOREIGN KEY (item_id) REFERENCES inventory_items(id) ON DELETE CASCADE;

alter table public.web_customers add constraint web_customers_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE UNIQUE INDEX branches_brand_name ON public.branches USING btree (brand_id, name);

CREATE INDEX house_account_txns_customer ON public.house_account_txns USING btree (customer_id, created_at DESC);

CREATE INDEX inventory_docs_kind ON public.inventory_docs USING btree (kind, created_at DESC);

CREATE INDEX modifier_options_mod ON public.modifier_options USING btree (modifier_id);

CREATE UNIQUE INDEX order_transactions_consumed_once ON public.order_transactions USING btree (order_id) WHERE (kind = 'consumption'::text);

CREATE INDEX order_transactions_recent ON public.order_transactions USING btree (created_at DESC);

CREATE INDEX orders_branch_created ON public.orders USING btree (branch_id, created_at DESC);

CREATE UNIQUE INDEX orders_branch_invoice_no ON public.orders USING btree (branch_id, invoice_no) WHERE (invoice_no IS NOT NULL);

CREATE UNIQUE INDEX orders_branch_return_no ON public.orders USING btree (branch_id, return_no) WHERE (return_no IS NOT NULL);

CREATE INDEX orders_branch_status ON public.orders USING btree (branch_id, status);

CREATE INDEX orders_created ON public.orders USING btree (created_at DESC);

CREATE INDEX orders_created_desc ON public.orders USING btree (created_at DESC);

CREATE INDEX orders_customer ON public.orders USING btree (customer_id, created_at DESC);

CREATE UNIQUE INDEX orders_ref ON public.orders USING btree (ref);

CREATE INDEX stock_counts_latest ON public.stock_counts USING btree (branch_id, item_id, counted_at DESC);

alter table public.branch_counters enable row level security;

alter table public.branches enable row level security;

alter table public.brand_counters enable row level security;

alter table public.brands enable row level security;

alter table public.categories enable row level security;

alter table public.charges enable row level security;

alter table public.customers enable row level security;

alter table public.day_closes enable row level security;

alter table public.delivery_zones enable row level security;

alter table public.devices enable row level security;

alter table public.house_account_txns enable row level security;

alter table public.inventory_categories enable row level security;

alter table public.inventory_docs enable row level security;

alter table public.inventory_items enable row level security;

alter table public.modifier_options enable row level security;

alter table public.modifiers enable row level security;

alter table public.order_sources enable row level security;

alter table public.order_transactions enable row level security;

alter table public.orders enable row level security;

alter table public.payment_methods enable row level security;

alter table public.products enable row level security;

alter table public.roles enable row level security;

alter table public.settings enable row level security;

alter table public.shifts enable row level security;

alter table public.slick_act_fails enable row level security;

alter table public.slick_rt enable row level security;

alter table public.staff enable row level security;

alter table public.staff_users enable row level security;

alter table public.stock_counts enable row level security;

alter table public.suppliers enable row level security;

alter table public.tax_groups enable row level security;

alter table public.taxes enable row level security;

alter table public.variant_sets enable row level security;

alter table public.warehouses enable row level security;

alter table public.web_customers enable row level security;

CREATE TRIGGER slick_inv_doc_ref BEFORE INSERT OR UPDATE ON public.inventory_docs FOR EACH ROW EXECUTE FUNCTION slick_inv_doc_ref();

CREATE TRIGGER slick_keep_numbered_orders BEFORE DELETE ON public.orders FOR EACH ROW EXECUTE FUNCTION slick_keep_numbered_orders();

CREATE TRIGGER slick_order_customer BEFORE INSERT OR UPDATE OF phone, customer_name, address ON public.orders FOR EACH ROW EXECUTE FUNCTION slick_order_customer();

CREATE TRIGGER slick_order_no BEFORE INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION slick_order_no();

CREATE TRIGGER slick_order_numbers BEFORE INSERT OR UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION slick_order_numbers();

CREATE TRIGGER slick_order_numbers_za_declined BEFORE INSERT OR UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION slick_declined_no_numbers();

CREATE TRIGGER slick_order_numbers_zb BEFORE INSERT OR UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION slick_branch_numbers();

CREATE TRIGGER slick_order_stock AFTER INSERT OR UPDATE OF status ON public.orders FOR EACH ROW EXECUTE FUNCTION slick_order_stock();

CREATE TRIGGER slick_order_tax BEFORE INSERT OR UPDATE OF items, discount ON public.orders FOR EACH ROW EXECUTE FUNCTION slick_order_tax();

CREATE TRIGGER slick_order_times BEFORE INSERT OR UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION slick_order_times();

CREATE TRIGGER slick_order_void BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION slick_order_void();

CREATE TRIGGER slick_owner_on_signup AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION slick_owner_on_signup();

CREATE TRIGGER slick_rename_payment AFTER UPDATE OF name ON public.payment_methods FOR EACH ROW EXECUTE FUNCTION slick_rename_lookup();

CREATE TRIGGER slick_rename_source AFTER UPDATE OF name ON public.order_sources FOR EACH ROW EXECUTE FUNCTION slick_rename_lookup();

CREATE TRIGGER slick_ring AFTER INSERT OR DELETE OR UPDATE ON public.staff_users FOR EACH STATEMENT EXECUTE FUNCTION slick_ring();

CREATE TRIGGER slick_ring AFTER INSERT OR DELETE OR UPDATE ON public.order_sources FOR EACH STATEMENT EXECUTE FUNCTION slick_ring();

CREATE TRIGGER slick_ring AFTER INSERT OR DELETE OR UPDATE ON public.charges FOR EACH STATEMENT EXECUTE FUNCTION slick_ring();

CREATE TRIGGER slick_ring AFTER INSERT OR DELETE OR UPDATE ON public.day_closes FOR EACH STATEMENT EXECUTE FUNCTION slick_ring();

CREATE TRIGGER slick_ring AFTER INSERT OR DELETE OR UPDATE ON public.settings FOR EACH STATEMENT EXECUTE FUNCTION slick_ring();

CREATE TRIGGER slick_ring AFTER INSERT OR DELETE OR UPDATE ON public.brands FOR EACH STATEMENT EXECUTE FUNCTION slick_ring();

CREATE TRIGGER slick_ring AFTER INSERT OR DELETE OR UPDATE ON public.devices FOR EACH STATEMENT EXECUTE FUNCTION slick_ring();

CREATE TRIGGER slick_ring AFTER INSERT OR DELETE OR UPDATE ON public.branches FOR EACH STATEMENT EXECUTE FUNCTION slick_ring();

CREATE TRIGGER slick_ring AFTER INSERT OR DELETE OR UPDATE ON public.categories FOR EACH STATEMENT EXECUTE FUNCTION slick_ring();

CREATE TRIGGER slick_ring AFTER INSERT OR DELETE OR UPDATE ON public.products FOR EACH STATEMENT EXECUTE FUNCTION slick_ring();

CREATE TRIGGER slick_ring AFTER INSERT OR DELETE OR UPDATE ON public.orders FOR EACH STATEMENT EXECUTE FUNCTION slick_ring();

CREATE TRIGGER slick_ring AFTER INSERT OR DELETE OR UPDATE ON public.shifts FOR EACH STATEMENT EXECUTE FUNCTION slick_ring();

CREATE TRIGGER slick_ring AFTER INSERT OR DELETE OR UPDATE ON public.modifiers FOR EACH STATEMENT EXECUTE FUNCTION slick_ring();

CREATE TRIGGER slick_ring AFTER INSERT OR DELETE OR UPDATE ON public.modifier_options FOR EACH STATEMENT EXECUTE FUNCTION slick_ring();

CREATE TRIGGER slick_ring AFTER INSERT OR DELETE OR UPDATE ON public.taxes FOR EACH STATEMENT EXECUTE FUNCTION slick_ring();

CREATE TRIGGER slick_ring AFTER INSERT OR DELETE OR UPDATE ON public.tax_groups FOR EACH STATEMENT EXECUTE FUNCTION slick_ring();

CREATE TRIGGER slick_ring AFTER INSERT OR DELETE OR UPDATE ON public.payment_methods FOR EACH STATEMENT EXECUTE FUNCTION slick_ring();

CREATE TRIGGER slick_ring AFTER INSERT OR DELETE OR UPDATE ON public.roles FOR EACH STATEMENT EXECUTE FUNCTION slick_ring();

CREATE TRIGGER slick_sync_staff AFTER UPDATE ON public.staff_users FOR EACH ROW EXECUTE FUNCTION slick_sync_staff();

CREATE TRIGGER slick_undelete_customer AFTER INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION slick_undelete_customer();

CREATE TRIGGER slick_web_customer_sync AFTER INSERT OR UPDATE ON public.web_customers FOR EACH ROW EXECUTE FUNCTION slick_sync_web_customer();

CREATE TRIGGER touch_branches BEFORE UPDATE ON public.branches FOR EACH ROW EXECUTE FUNCTION touch();

CREATE TRIGGER touch_brands BEFORE UPDATE ON public.brands FOR EACH ROW EXECUTE FUNCTION touch();

CREATE TRIGGER touch_categories BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION touch();

CREATE TRIGGER touch_delivery_zones BEFORE UPDATE ON public.delivery_zones FOR EACH ROW EXECUTE FUNCTION touch();

CREATE TRIGGER touch_devices BEFORE UPDATE ON public.devices FOR EACH ROW EXECUTE FUNCTION touch();

CREATE TRIGGER touch_inventory_items BEFORE UPDATE ON public.inventory_items FOR EACH ROW EXECUTE FUNCTION touch();

CREATE TRIGGER touch_orders BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION touch();

CREATE TRIGGER touch_products BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION touch();

CREATE TRIGGER touch_settings BEFORE UPDATE ON public.settings FOR EACH ROW EXECUTE FUNCTION touch();

create policy "admin write branches" on public.branches for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "public read branches" on public.branches for SELECT to public using (active);

create policy "admin write brands" on public.brands for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "public read brands" on public.brands for SELECT to public using ((active AND (NOT deleted)));

create policy "staff read brands" on public.brands for SELECT to public using ((staff_role() IS NOT NULL));

create policy "admin write categories" on public.categories for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "public read categories" on public.categories for SELECT to public using ((NOT deleted));

create policy "admin write charges" on public.charges for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "staff read charges" on public.charges for SELECT to public using ((staff_role() IS NOT NULL));

create policy "admin delete customers" on public.customers for DELETE to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "staff add customers" on public.customers for INSERT to public with check ((staff_role() IS NOT NULL));

create policy "staff edit customers" on public.customers for UPDATE to public using ((staff_role() IS NOT NULL)) with check ((staff_role() IS NOT NULL));

create policy "staff read customers" on public.customers for SELECT to public using ((staff_role() IS NOT NULL));

create policy "admin edit day_closes" on public.day_closes for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "staff add day_closes" on public.day_closes for INSERT to public with check ((staff_role() IS NOT NULL));

create policy "staff read day_closes" on public.day_closes for SELECT to public using ((staff_role() IS NOT NULL));

create policy "admin write zones" on public.delivery_zones for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "public read zones" on public.delivery_zones for SELECT to public using ((active AND (NOT deleted)));

create policy "admin write devices" on public.devices for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "staff read devices" on public.devices for SELECT to public using ((staff_role() IS NOT NULL));

create policy "staff update devices" on public.devices for UPDATE to public using ((staff_role() IS NOT NULL)) with check ((staff_role() IS NOT NULL));

create policy "house txns via customer" on public.house_account_txns for ALL to public using ((EXISTS ( SELECT 1
   FROM customers c
  WHERE (c.id = house_account_txns.customer_id)))) with check ((EXISTS ( SELECT 1
   FROM customers c
  WHERE (c.id = house_account_txns.customer_id))));

create policy "admin write inv cats" on public.inventory_categories for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "staff read inv cats" on public.inventory_categories for SELECT to public using ((staff_role() IS NOT NULL));

create policy "admin delete inv docs" on public.inventory_docs for DELETE to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "staff add inv docs" on public.inventory_docs for INSERT to public with check ((staff_role() IS NOT NULL));

create policy "staff edit inv docs" on public.inventory_docs for UPDATE to public using ((staff_role() IS NOT NULL)) with check ((staff_role() IS NOT NULL));

create policy "staff read inv docs" on public.inventory_docs for SELECT to public using ((staff_role() IS NOT NULL));

create policy "admin write inventory" on public.inventory_items for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "staff read inventory" on public.inventory_items for SELECT to public using ((staff_role() IS NOT NULL));

create policy "admin write modifier options" on public.modifier_options for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "public read modifier options" on public.modifier_options for SELECT to public using (((active AND (NOT deleted)) OR (staff_role() IS NOT NULL)));

create policy "admin write modifiers" on public.modifiers for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "public read modifiers" on public.modifiers for SELECT to public using (((NOT deleted) OR (staff_role() IS NOT NULL)));

create policy "admin write sources" on public.order_sources for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "staff read sources" on public.order_sources for SELECT to public using ((staff_role() IS NOT NULL));

create policy "staff read order tx" on public.order_transactions for SELECT to public using ((staff_role() IS NOT NULL));

create policy "customer place online order" on public.orders for INSERT to authenticated with check (((channel = 'online'::text) AND (status = 'pending'::text) AND (customer_user_id = auth.uid())));

create policy "public place online order" on public.orders for INSERT to anon with check (((channel = 'online'::text) AND (status = 'pending'::text)));

create policy "staff read orders" on public.orders for SELECT to public using ((staff_role() IS NOT NULL));

create policy "staff write orders" on public.orders for ALL to public using ((staff_role() IS NOT NULL)) with check ((staff_role() IS NOT NULL));

create policy "admin write payment_methods" on public.payment_methods for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "staff read payment_methods" on public.payment_methods for SELECT to public using ((staff_role() IS NOT NULL));

create policy "admin write products" on public.products for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "public read products" on public.products for SELECT to public using ((active AND (NOT deleted)));

create policy "admin write roles" on public.roles for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "staff read roles" on public.roles for SELECT to public using ((staff_role() IS NOT NULL));

create policy "admin write settings" on public.settings for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "public read online" on public.settings for SELECT to public using ((id ~~ 'online%'::text));

create policy "staff read all settings" on public.settings for SELECT to public using ((staff_role() IS NOT NULL));

create policy "staff read shifts" on public.shifts for SELECT to public using ((staff_role() IS NOT NULL));

create policy "staff write shifts" on public.shifts for ALL to public using ((staff_role() IS NOT NULL)) with check ((staff_role() IS NOT NULL));

create policy "admin write staff_users" on public.staff_users for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "staff read staff_users" on public.staff_users for SELECT to public using ((staff_role() IS NOT NULL));

create policy "owner manages staff" on public.staff for ALL to public using ((staff_role() = 'owner'::text)) with check ((staff_role() = 'owner'::text));

create policy "staff read staff" on public.staff for SELECT to public using ((staff_role() IS NOT NULL));

create policy "admin edit stock" on public.stock_counts for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "staff add stock" on public.stock_counts for INSERT to public with check ((staff_role() IS NOT NULL));

create policy "staff read stock" on public.stock_counts for SELECT to public using ((staff_role() IS NOT NULL));

create policy "admin write suppliers" on public.suppliers for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "staff read suppliers" on public.suppliers for SELECT to public using ((staff_role() IS NOT NULL));

create policy "admin write tax_groups" on public.tax_groups for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "customer read tax groups" on public.tax_groups for SELECT to authenticated using ((NOT deleted));

create policy "public read tax groups" on public.tax_groups for SELECT to anon using ((NOT deleted));

create policy "staff read tax_groups" on public.tax_groups for SELECT to public using ((staff_role() IS NOT NULL));

create policy "admin write taxes" on public.taxes for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "customer read taxes" on public.taxes for SELECT to authenticated using ((NOT deleted));

create policy "public read taxes" on public.taxes for SELECT to anon using ((NOT deleted));

create policy "staff read taxes" on public.taxes for SELECT to public using ((staff_role() IS NOT NULL));

create policy "admin write variant sets" on public.variant_sets for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "public read variant sets" on public.variant_sets for SELECT to public using (((NOT deleted) OR (staff_role() IS NOT NULL)));

create policy "admin write warehouses" on public.warehouses for ALL to public using ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text]))) with check ((staff_role() = ANY (ARRAY['owner'::text, 'admin'::text])));

create policy "staff read warehouses" on public.warehouses for SELECT to public using ((staff_role() IS NOT NULL));

create policy "own profile insert" on public.web_customers for INSERT to public with check ((id = auth.uid()));

create policy "own profile read" on public.web_customers for SELECT to public using ((id = auth.uid()));

create policy "own profile update" on public.web_customers for UPDATE to public using ((id = auth.uid())) with check ((id = auth.uid()));

create policy "staff read web customers" on public.web_customers for SELECT to public using ((staff_role() IS NOT NULL));

revoke select on public.modifier_options, public.modifiers, public.products, public.variant_sets from anon;

grant select (active, custom_prices, deleted, id, inactive_branch_ids, modifier_id, name, name_ar, out_of_stock_branch_ids, price, sort) on public.modifier_options to anon;

grant select (deleted, id, name, name_ar, sort) on public.modifiers to anon;

grant select (active, branch_ids, brand_id, calories, category_id, channels, created_at, custom_prices, deleted, description, id, image_url, inactive_branch_ids, modifiers, name, name_ar, out_of_stock_branch_ids, price, pricing_method, selling_method, sku, sort, tax_group, variant_set_id, variants) on public.products to anon;

grant select (deleted, id, name, name_ar, options) on public.variant_sets to anon;

revoke execute on function public.slick_close_inv_doc(p_id text, p_by text) from public, anon;

revoke execute on function public.slick_customers(p_q text, p_filter text, p_sort text, p_limit integer, p_offset integer) from public, anon;

revoke execute on function public.slick_dashboard(p_day date, p_days integer, p_branches text[], p_brand text, p_tz text, p_cut integer) from public, anon;

revoke execute on function public.slick_doc_action(p_id text, p_action text, p_by text, p_lines jsonb) from public, anon;

revoke execute on function public.slick_inventory(p_branches text[]) from public, anon;

revoke execute on function public.slick_kitchen(p_day date, p_days integer, p_branches text[], p_brand text, p_tz text, p_cut integer) from public, anon;

revoke execute on function public.slick_set_user_password(p_user uuid, p_password text) from public, anon;

revoke execute on function public.slick_stock_all() from public, anon;

revoke execute on function public.slick_stock_levels(p_branch text) from public, anon;

alter publication supabase_realtime add table public.branches, public.brands, public.categories, public.charges, public.day_closes, public.devices, public.inventory_categories, public.inventory_docs, public.modifier_options, public.modifiers, public.order_sources, public.orders, public.payment_methods, public.products, public.roles, public.shifts, public.staff_users, public.tax_groups, public.taxes, public.variant_sets, public.warehouses;