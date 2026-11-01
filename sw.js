/* Slick POS — keeps the register's files on the device so it opens without internet.
   Network first (always the latest version when online), cached copy when offline. */
const CACHE = "slick-pos-v2";
const FILES = ["pos.html", "wokdb.js", "supabase.js", "modpick.js"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if(e.request.method !== "GET" || u.origin !== location.origin) return;           // Supabase calls are never cached here
  const name = u.pathname.split("/").pop() || "index.html";
  if(!FILES.includes(name)) return;                                                 // back office & ordering page untouched
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true })));
});
