# Database tests

Runs the live schema on a plain local Postgres (with small stand-ins for Supabase's `auth` and roles), adds sample data, applies a migration and checks that companies can't see or change each other's data.

```
createdb live
psql -d live -f supabase/tests/supabase-stubs.sql
PGOPTIONS='-c check_function_bodies=off' psql -d live -f supabase/schema-live-2026-11-09.sql
psql -d live -f supabase/tests/seed.sql
psql -d live -f supabase/2026-11-10-multi-company.sql
psql -d live -f supabase/tests/multi-company-tests.sql
```
