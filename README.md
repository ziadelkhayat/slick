# Slick ERP

Slick: back office, POS (Android APK) and multi-brand online ordering for restaurants, running on Supabase.

| Page | What it is |
|---|---|
| `index.html` | Back office: dashboard, menu, inventory, call center, devices, online ordering settings |
| `pos.html` | POS register. Built into an Android APK on every push |
| `order.html` | Public online ordering (delivery, takeaway, dine-in via table QR: `order.html?brand=<id>&branch=<id>&table=<n>`) |
| `wokdb.js` | Supabase connection and staff login |

Every push to `main` runs **Build and publish**: it builds `the-wok-pos.apk` and publishes the site to GitHub Pages.

Database setup: run `supabase-schema.sql`, then `supabase-brands.sql`, then `supabase-staff.sql`, in the Supabase SQL editor.
The Supabase key in `wokdb.js` is the public (publishable) key; data is protected by row-level security.
