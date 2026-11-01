-- Slick: modifiers (groups) and modifier options, linked to products (Foodics-style)

create table if not exists modifiers (
  id text primary key default 'mod_' || replace(gen_random_uuid()::text, '-', ''),
  name text not null, name_ar text, reference text,
  deleted boolean not null default false, created_at timestamptz not null default now()
);
create table if not exists modifier_options (
  id text primary key default 'mo_' || replace(gen_random_uuid()::text, '-', ''),
  modifier_id text references modifiers(id) on delete cascade,
  name text not null, name_ar text, sku text,
  price numeric not null default 0, tax_group text default 'TAX',
  costing_method text not null default 'ingredients', cost numeric, calories numeric,
  ingredients jsonb not null default '[]',             -- [{itemId, qty, types}]
  custom_prices jsonb not null default '{}', inactive_branch_ids text[] not null default '{}', out_of_stock_branch_ids text[] not null default '{}',
  sort int, active boolean not null default true, deleted boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists modifier_options_mod on modifier_options(modifier_id);
-- on each product: [{modifierId, min, max, free}] in display order
alter table products add column if not exists modifiers jsonb not null default '[]';

alter table modifiers enable row level security;
alter table modifier_options enable row level security;
drop policy if exists "public read modifiers" on modifiers;
drop policy if exists "admin write modifiers" on modifiers;
drop policy if exists "public read modifier options" on modifier_options;
drop policy if exists "admin write modifier options" on modifier_options;
drop policy if exists "staff read modifiers" on modifiers;
drop policy if exists "staff read modifier options" on modifier_options;
create policy "public read modifiers"        on modifiers        for select using (not deleted or staff_role() is not null);
create policy "admin write modifiers"        on modifiers        for all using (staff_role() in ('owner','admin')) with check (staff_role() in ('owner','admin'));
create policy "public read modifier options" on modifier_options for select using ((active and not deleted) or staff_role() is not null);
create policy "admin write modifier options" on modifier_options for all using (staff_role() in ('owner','admin')) with check (staff_role() in ('owner','admin'));

-- the public ordering page sees names and prices, never costs or recipes
revoke select on modifier_options from anon;
grant select (id, modifier_id, name, name_ar, price, custom_prices, inactive_branch_ids, out_of_stock_branch_ids, sort, active, deleted) on modifier_options to anon;
revoke select on modifiers from anon;
grant select (id, name, name_ar, deleted) on modifiers to anon;
grant select (modifiers) on products to anon;

do $$ begin
  begin alter publication supabase_realtime add table modifiers; exception when others then null; end;
  begin alter publication supabase_realtime add table modifier_options; exception when others then null; end;
end $$;

notify pgrst, 'reload schema';
select (select count(*) from modifiers) modifiers, (select count(*) from modifier_options) options;
