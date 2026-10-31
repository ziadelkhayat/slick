-- Slick: dashboard numbers, summed in the database (fast even with many orders).
-- Counts orders that are pending, active or closed; drafts and declined orders are left out (declined shown separately).
-- Net sales = subtotal - discount (before delivery fee). Payments = order total.
create or replace function public.slick_dashboard(
  p_day date, p_days int default 1, p_branches text[] default null, p_brand text default null, p_tz text default 'Asia/Beirut')
returns jsonb language sql stable security invoker set search_path = public as $$
with rng as (
  select ((p_day - (p_days - 1))::timestamp at time zone p_tz) as t0, ((p_day + 1)::timestamp at time zone p_tz) as t1
), o as (
  select o.*, (o.created_at at time zone p_tz) as lt,
         coalesce(o.subtotal, o.total, 0) - coalesce(o.discount, 0) as net
  from orders o, rng
  where o.created_at >= rng.t0 and o.created_at < rng.t1
    and (p_branches is null or o.branch_id = any(p_branches))
    and (p_brand is null or o.brand_id = p_brand)
), ok as (select * from o where status in ('pending','active','closed'))
select jsonb_build_object(
  'orders',    (select count(*) from ok),
  'net',       (select coalesce(sum(net),0) from ok),
  'discount',  (select coalesce(sum(discount),0) from ok),
  'payments',  (select coalesce(sum(total),0) from ok),
  'deliveryFees', (select coalesce(sum(delivery_fee),0) from ok),
  'declined',  (select jsonb_build_object('n', count(*), 'v', coalesce(sum(total),0)) from o where status = 'declined'),
  'open',      (select count(*) from ok where status in ('pending','active')),
  'hours',     (select coalesce(jsonb_agg(x order by x.h), '[]') from (
                  select extract(hour from lt)::int h, count(*) n, sum(net) net, sum(total) pay, sum(discount) disc from ok group by 1) x),
  'days',      (select coalesce(jsonb_agg(x order by x.d), '[]') from (
                  select lt::date d, count(*) n, sum(net) net from ok group by 1) x),
  'branches',  (select coalesce(jsonb_agg(x), '[]') from (
                  select branch_id id, count(*) n, sum(net) net, sum(discount) disc, sum(total) pay from ok group by 1) x),
  'types',     (select coalesce(jsonb_agg(x), '[]') from (
                  select coalesce(type,'other') k, count(*) n, sum(net) net from ok group by 1) x),
  'channels',  (select coalesce(jsonb_agg(x), '[]') from (
                  select coalesce(channel,'other') k, count(*) n, sum(net) net from ok group by 1) x),
  'payMethods',(select coalesce(jsonb_agg(x), '[]') from (
                  select coalesce(payment->>'method', case when channel = 'pos' then 'cash' else 'on delivery' end) k, count(*) n, sum(total) v from ok group by 1) x),
  'products',  (select coalesce(jsonb_agg(x order by x.v desc), '[]') from (
                  select i->>'name' name, sum(coalesce((i->>'qty')::numeric,1)) qty, sum(coalesce((i->>'qty')::numeric,1) * coalesce((i->>'price')::numeric,0)) v
                  from ok, jsonb_array_elements(case when jsonb_typeof(ok.items) = 'array' then ok.items else '[]'::jsonb end) i
                  where i->>'name' is not null group by 1 order by 3 desc limit 10) x),
  'callcenter',(select jsonb_build_object(
                  'byStatus', (select coalesce(jsonb_object_agg(status, n), '{}') from (select status, count(*) n from o where channel = 'callcenter' group by 1) s),
                  'byAgent',  (select coalesce(jsonb_agg(a), '[]') from (select coalesce(agent,'-') k, count(*) n, sum(net) net from ok where channel = 'callcenter' group by 1 order by 2 desc) a),
                  'byBranch', (select coalesce(jsonb_agg(b), '[]') from (select branch_id id, count(*) n, sum(net) net from ok where channel = 'callcenter' group by 1) b)))
);
$$;
revoke all on function public.slick_dashboard(date,int,text[],text,text) from public, anon;
grant execute on function public.slick_dashboard(date,int,text[],text,text) to authenticated;
select 'slick_dashboard ready' as status;
