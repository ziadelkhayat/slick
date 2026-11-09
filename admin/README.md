# Slick back office (React)

The new back office, replacing `index.html` screen by screen. Published at `/admin/` on the same site; screens not rebuilt yet link to the same screen in the current back office.

- React 18 + TypeScript + Vite, React Router (hash URLs), TanStack Query, Supabase JS.
- Same Supabase project and logins as the current back office; data is limited to the signed-in user's company by the database.

```
cd admin
npm install
npm run dev      # local preview
npm run build    # output in admin/dist (the GitHub workflow copies it to site/admin)
```

Rebuilt so far: sign-in, sidebar and tabs (same menu as today), Manage → Brands.
