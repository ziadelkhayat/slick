-- Slick: kitchen timing + stock counts for the Kitchen and Inventory dashboards.

-- 1) Kitchen timing: stamp when an order is accepted and when it is finished (set automatically, no app change needed)
alter table orders add column if not exists accepted_at timestamptz, add column if not exists done_at timestamptz;
create or replace function slick_order_times() returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    if new.status = 'active' then new.accepted_at := coalesce(new.accepted_at, now()); end if;
    if new.status in ('closed','declined') and new.channel <> 'pos' then new.done_at := coalesce(new.done_at, now()); end if;
  elsif new.status is distinct from old.status then
    if new.status = 'active' and new.accepted_at is null then new.accepted_at := now(); end if;
    if new.status in ('closed','declined') and new.done_at is null then new.done_at := now(); end if;
  end if;
  return new;
end $$;
drop trigger if exists slick_order_times on orders;
create trigger slick_order_times before insert or update on orders for each row execute function slick_order_times();

create or replace function public.slick_kitchen(
  p_day date, p_days int default 1, p_branches text[] default null, p_brand text default null, p_tz text default 'Asia/Beirut')
returns jsonb language sql stable security invoker set search_path = public as $$
with rng as (
  select ((p_day - (p_days - 1))::timestamp at time zone p_tz) as t0, ((p_day + 1)::timestamp at time zone p_tz) as t1
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
$$;
revoke all on function public.slick_kitchen(date,int,text[],text,text) from public, anon;
grant execute on function public.slick_kitchen(date,int,text[],text,text) to authenticated;

-- 2) Stock counts: each count saves the quantity on hand of an item at a branch (in its storage unit)
create table if not exists stock_counts (
  id text primary key default 'sc_' || replace(gen_random_uuid()::text, '-', ''),
  branch_id text not null references branches(id) on delete cascade,
  item_id text not null references inventory_items(id) on delete cascade,
  qty numeric not null check (qty >= 0),
  counted_at timestamptz not null default now(),
  counted_by text, batch text, note text
);
create index if not exists stock_counts_latest on stock_counts(branch_id, item_id, counted_at desc);
alter table stock_counts enable row level security;
drop policy if exists "staff read stock" on stock_counts;
drop policy if exists "staff add stock" on stock_counts;
drop policy if exists "admin edit stock" on stock_counts;
create policy "staff read stock" on stock_counts for select using (staff_role() is not null);
create policy "staff add stock"  on stock_counts for insert with check (staff_role() is not null);
create policy "admin edit stock" on stock_counts for all using (staff_role() in ('owner','admin')) with check (staff_role() in ('owner','admin'));

-- latest count of every item at one branch
create or replace function public.slick_stock_levels(p_branch text)
returns table(item_id text, qty numeric, counted_at timestamptz, counted_by text)
language sql stable security invoker set search_path = public as $$
  select distinct on (item_id) item_id, qty, counted_at, counted_by
  from stock_counts where branch_id = p_branch order by item_id, counted_at desc;
$$;
revoke all on function public.slick_stock_levels(text) from public, anon;
grant execute on function public.slick_stock_levels(text) to authenticated;

-- inventory dashboard: stock value, low stock, counting coverage
create or replace function public.slick_inventory(p_branches text[] default null)
returns jsonb language sql stable security invoker set search_path = public as $$
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
$$;
revoke all on function public.slick_inventory(text[]) from public, anon;
grant execute on function public.slick_inventory(text[]) to authenticated;

notify pgrst, 'reload schema';
select public.slick_kitchen(current_date, 30)::text as kitchen, public.slick_inventory(null)::text as inventory;
