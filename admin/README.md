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

Looks exactly like the current back office: it uses the same stylesheet (`src/legacy.css`, copied from index.html), the same page structure, menu, tabs, icons, titles and sign-in (account number + email + password). `src/screens.ts` holds every screen's tabs, title, icon and header buttons, taken from the current back office.

Rebuilt so far: sign-in, sidebar, top bar and account menu, section tabs, Manage → Brands. Other screens show their tabs and title and open in the current back office.
