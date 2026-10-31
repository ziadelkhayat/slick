-- Slick: Customers — one record per phone number, filled automatically from orders.
create table if not exists customers (
  id text primary key default 'cu_' || replace(gen_random_uuid()::text, '-', ''),
  phone text unique not null,
  name text, email text, birthday date, notes text,
  tags text[] not null default '{}',
  blacklisted boolean not null default false,
  addresses jsonb not null default '[]',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
alter table orders add column if not exists customer_id text;
create index if not exists orders_customer on orders(customer_id, created_at desc);
alter table customers enable row level security;
drop policy if exists "staff read customers" on customers;
drop policy if exists "staff add customers" on customers;
drop policy if exists "staff edit customers" on customers;
drop policy if exists "admin delete customers" on customers;
create policy "staff read customers"   on customers for select using (staff_role() is not null);
create policy "staff add customers"    on customers for insert with check (staff_role() is not null);
create policy "staff edit customers"   on customers for update using (staff_role() is not null) with check (staff_role() is not null);
create policy "admin delete customers" on customers for delete using (staff_role() in ('owner','admin'));

create or replace function slick_norm_phone(p text) returns text language sql immutable as $$
  select nullif(regexp_replace(coalesce(p,''), '[^0-9+]', '', 'g'), '')
$$;

-- every order with a phone is linked to (or creates) its customer; runs as definer so online orders work too
create or replace function slick_order_customer() returns trigger language plpgsql security definer set search_path = public as $$
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
end $$;
drop trigger if exists slick_order_customer on orders;
create trigger slick_order_customer before insert or update of phone, customer_name, address on orders
  for each row execute function slick_order_customer();

-- link existing orders
update orders set phone = phone where slick_norm_phone(phone) is not null and customer_id is null;

-- list with order stats, filters, sorting and paging
create or replace function public.slick_customers(
  p_q text default '', p_filter text default 'all', p_sort text default 'last', p_limit int default 50, p_offset int default 0)
returns jsonb language sql stable security invoker set search_path = public as $$
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
      when 'repeat' then n >= 2
      when 'new' then first_at >= now() - interval '30 days'
      when 'inactive' then last_at < now() - interval '60 days'
      when 'blacklisted' then blacklisted
      else true end
)
select jsonb_build_object(
  'count', (select count(*) from f),
  'summary', (select jsonb_build_object('total', count(*), 'new30', count(*) filter (where first_at >= now() - interval '30 days'),
                 'repeat', count(*) filter (where n >= 2), 'withOrders', count(*) filter (where n >= 1),
                 'avgSpend', coalesce(avg(spent) filter (where n >= 1), 0), 'blacklisted', count(*) filter (where blacklisted)) from c),
  'rows', (select coalesce(jsonb_agg(x), '[]') from (
      select id, phone, name, email, tags, blacklisted, n, spent, last_at, first_at from f
      order by case when p_sort = 'spent' then spent end desc nulls last,
               case when p_sort = 'orders' then n end desc nulls last,
               case when p_sort = 'name' then lower(coalesce(name, phone)) end asc,
               case when p_sort = 'new' then created_at end desc,
               last_at desc nulls last, created_at desc
      limit p_limit offset p_offset) x)
);
$$;
revoke all on function public.slick_customers(text,text,text,int,int) from public, anon;
grant execute on function public.slick_customers(text,text,text,int,int) to authenticated;

notify pgrst, 'reload schema';
select (select count(*) from customers) customers, (select count(*) from orders where customer_id is not null) linked_orders;
