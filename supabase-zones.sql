-- Slick: delivery zones drawn on a map, and the customer's pinned location on orders
alter table delivery_zones add column if not exists polygon jsonb;
alter table orders add column if not exists lat double precision;
alter table orders add column if not exists lng double precision;
