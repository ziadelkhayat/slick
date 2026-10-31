-- Slick: brands with branches under each brand. Run once in the Supabase SQL editor.
create table if not exists brands (
  id text primary key default 'brd_' || substr(md5(random()::text), 1, 10),
  name text not null unique, name_ar text,
  active boolean not null default true, deleted boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
alter table branches   add column if not exists brand_id text references brands(id);
alter table categories add column if not exists brand_id text references brands(id);
alter table products   add column if not exists brand_id text references brands(id);
alter table orders     add column if not exists brand_id text references brands(id);
alter table branches drop constraint if exists branches_name_key;
create unique index if not exists branches_brand_name on branches(brand_id, name);
drop trigger if exists touch_brands on brands; create trigger touch_brands before update on brands for each row execute function touch();

-- existing data becomes the first brand: The Wok
insert into brands (id, name) values ('brd_thewok', 'The Wok') on conflict (id) do nothing;
update branches   set brand_id = 'brd_thewok' where brand_id is null;
update categories set brand_id = 'brd_thewok' where brand_id is null;
update products   set brand_id = 'brd_thewok' where brand_id is null;
update orders     set brand_id = 'brd_thewok' where brand_id is null;
insert into settings (id, data) select 'online_brd_thewok', data from settings where id = 'online' on conflict (id) do nothing;

-- security
alter table brands enable row level security;
create policy "public read brands" on brands for select using (active and not deleted);
create policy "staff read brands"  on brands for select using (staff_role() is not null);
create policy "admin write brands" on brands for all using (staff_role() in ('owner','admin')) with check (staff_role() in ('owner','admin'));
drop policy if exists "public read online" on settings;
create policy "public read online" on settings for select using (id like 'online%');
-- cashiers activate their device on the POS
drop policy if exists "staff update devices" on devices;
create policy "staff update devices" on devices for update using (staff_role() is not null) with check (staff_role() is not null);

alter publication supabase_realtime add table brands;
select (select count(*) from brands) brands, (select count(*) from branches where brand_id is not null) branches_linked, (select count(*) from products where brand_id is not null) products_linked;
