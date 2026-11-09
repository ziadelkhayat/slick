-- pretend this is today's live data (one company, The Wok)
insert into auth.users(id,email) values ('00000000-0000-0000-0000-00000000000a','ziad.khayat91@gmail.com');
insert into brands(id,name) values ('brd_thewok','The Wok');
insert into branches(id,name,brand_id,code) values ('br_hamra','Hamra','brd_thewok','HAM');
insert into categories(id,name,brand_id) values ('cat_1','Noodles','brd_thewok');
insert into taxes(id,name,rate) values ('tax_vat','VAT',11);
insert into tax_groups(id,name,tax_ids) values ('TAX','VAT',array['tax_vat']);
insert into products(id,name,category_id,price,brand_id,sku) values ('prd_1','Chicken Noodles','cat_1',10,'brd_thewok','SKU1');
insert into settings(id,data) values ('company','{"taxInclusive":true,"currency":"USD"}'),('app','{"ccDefaultSource":"Phone"}');
insert into order_sources(id,name) values ('os_phone','Phone');
insert into roles(id,name,permissions) values ('role_admin','Admin',array['bo_manage']);
insert into staff_users(id,name,email,role_id) values ('usr_1','Ziad','ziad.khayat91@gmail.com','role_admin');
update staff_users set user_id='00000000-0000-0000-0000-00000000000a';
insert into staff(user_id,name,role) values ('00000000-0000-0000-0000-00000000000a','Ziad','owner') on conflict do nothing;
insert into orders(id,channel,type,status,branch_id,brand_id,phone,customer_name,items,total,source)
  values ('ord_1','pos','pickup','closed','br_hamra','brd_thewok','03123456','Rami','[{"productId":"prd_1","price":10,"qty":1}]',10,'Phone');
