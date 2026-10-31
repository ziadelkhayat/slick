-- Slick: Orders screen — allow voiding a closed order (with reason) and speed up order lists.
do $$
declare c text;
begin
  select conname into c from pg_constraint
  where conrelid = 'public.orders'::regclass and contype = 'c' and pg_get_constraintdef(oid) ilike '%status%';
  if c is not null then execute format('alter table public.orders drop constraint %I', c); end if;
end $$;
alter table orders add constraint orders_status_check check (status in ('draft','pending','active','declined','closed','void'));
alter table orders add column if not exists void_reason text, add column if not exists voided_at timestamptz, add column if not exists voided_by text;
create index if not exists orders_created_desc on orders(created_at desc);
create index if not exists orders_branch_created on orders(branch_id, created_at desc);

-- only owners/admins may void; stamp who/when
create or replace function slick_order_void() returns trigger language plpgsql as $$
begin
  if new.status = 'void' and old.status is distinct from 'void' then
    if staff_role() not in ('owner','admin') then raise exception 'Only an owner or admin can void orders'; end if;
    new.voided_at := now();
  end if;
  return new;
end $$;
drop trigger if exists slick_order_void on orders;
create trigger slick_order_void before update on orders for each row execute function slick_order_void();

notify pgrst, 'reload schema';
select status, count(*) from orders group by 1;
