\set ON_ERROR_STOP 0
\pset tuples_only on
-- second company B with its own owner, brand, branch, product, settings
insert into companies(id,name) values ('co_b','Burger Co');
insert into auth.users(id,email) values ('00000000-0000-0000-0000-00000000000b','owner@burger.test');
insert into staff(company_id,user_id,name,role) values ('co_b','00000000-0000-0000-0000-00000000000b','Bob','owner');

-- ===== as owner B
begin; set local role authenticated; set local test.uid = '00000000-0000-0000-0000-00000000000b';
select 'B company = '||slick_company();
insert into brands(id,name) values ('brd_b','Burger Co');              -- no company given: should become co_b
insert into branches(id,name,brand_id,code) values ('br_b','Verdun','brd_b','HAM');  -- same code as Eat Out: allowed
insert into products(id,name,price,brand_id,sku) values ('prd_b','Burger',8,'brd_b','SKU1');   -- same SKU: allowed
insert into products(id,name,price,company_id,sku) values ('prd_sneak','Sneaky',1,'co_eatout','SKU9');  -- tries Eat Out: forced to co_b
insert into settings(id,data) values ('company','{"taxInclusive":false,"currency":"LBP"}');   -- own 'company' row
select 'B sees products: '||string_agg(id||'@'||company_id, ', ' order by id) from products;
select 'B sees orders: '||count(*) from orders;
select 'B sees settings: '||string_agg(id, ', ' order by id) from settings;
update products set price = 0 where id = 'prd_1';  select 'B changed Eat Out product rows: 0 expected';
delete from orders; select 'B deleted Eat Out orders: none expected';
select 'B reset Eat Out user password: '||slick_set_user_password('00000000-0000-0000-0000-00000000000a','password123');
select 'B public settings currency: '||(slick_public_settings()->>'currency');
commit;

-- ===== as owner A (Eat Out)
begin; set local role authenticated; set local test.uid = '00000000-0000-0000-0000-00000000000a';
select 'A company = '||slick_company();
select 'A sees products: '||string_agg(id||'@'||company_id||' $'||price, ', ' order by id) from products;
select 'A sees branches: '||string_agg(id, ', ') from branches;
select 'A sees orders: '||count(*) from orders;
select 'A sees settings: '||string_agg(id||'@'||company_id, ', ' order by id) from settings;
insert into settings(id,data) values ('app','{"x":1}') on conflict (company_id,id) do update set data = excluded.data;  -- the app's upsert path
select 'A app setting: '||data::text from settings where id='app';
insert into orders(id,channel,type,status,branch_id,brand_id,phone,items,total) values ('ord_a2','pos','pickup','closed','br_hamra','brd_thewok','03123456','[{"productId":"prd_1","price":10,"qty":1}]',10);
select 'A order company: '||company_id||' customer '||customer_id from orders where id='ord_a2';
update products set company_id = 'co_b' where id = 'prd_1'; select 'A move product to B -> still '||company_id from products where id='prd_1';
commit;

-- ===== visitor on the online ordering page orders from company B's branch, with the same phone as an Eat Out customer
begin; set local role anon; set local test.uid = '';
select 'anon company = '||coalesce(slick_company(),'(none)');
select 'anon sees products: '||string_agg(id, ', ' order by id) from products;
insert into orders(id,channel,type,status,branch_id,brand_id,phone,customer_name,items,total) values ('ord_web','online','delivery','pending','br_b','brd_b','03123456','Rami','[]',8);
insert into orders(id,channel,type,status,branch_id,brand_id,company_id,items,total) values ('ord_web2','online','delivery','pending','br_b','brd_b','co_eatout','[]',8);  -- tries to pick Eat Out
select 'anon public settings for brand B: '||(slick_public_settings('brd_b')->>'currency');
commit;
select 'web order company: '||string_agg(id||'@'||company_id, ', ' order by id) from orders where id like 'ord_web%';
select 'customers with phone 03123456: '||string_agg(company_id, ', ' order by company_id) from customers where phone='03123456';

-- ===== a POS device of company B (signed in with its own device login)
insert into auth.users(id,email) values ('00000000-0000-0000-0000-0000000000d1','device@b');
insert into devices(id,name,branch_id,auth_uid,activated_at) values ('dev_b','Till 1','br_b','00000000-0000-0000-0000-0000000000d1',now());
begin; set local role authenticated; set local test.uid = '00000000-0000-0000-0000-0000000000d1';
select 'device role '||staff_role()||' company '||slick_company();
select 'device sees orders: '||string_agg(id, ', ' order by id) from orders;
insert into shifts(id,device_id,branch_id,cashier) values ('sh_b','dev_b','br_b','Bob');
commit;
select 'shift company: '||company_id from shifts where id='sh_b';
select 'device company: '||company_id from devices where id='dev_b';
