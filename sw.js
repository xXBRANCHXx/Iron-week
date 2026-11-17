const CACHE = 'ironweek-v2';
const SHELL = ['./', './index.html', './guide.js', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'];
// Machine-guide photos, precached so guides work offline at the gym.
const GUIDE_IMGS = ['./guides/bench-press-0.jpg','./guides/bench-press-1.jpg','./guides/cable-row-0.jpg','./guides/cable-row-1.jpg','./guides/calf-raise-0.jpg','./guides/calf-raise-1.jpg','./guides/db-curl-0.jpg','./guides/db-curl-1.jpg','./guides/dips-0.jpg','./guides/dips-1.jpg','./guides/flyes-0.jpg','./guides/flyes-1.jpg','./guides/hack-squat-0.jpg','./guides/hack-squat-1.jpg','./guides/hip-thrust-0.jpg','./guides/hip-thrust-1.jpg','./guides/incline-db-press-0.jpg','./guides/incline-db-press-1.jpg','./guides/lateral-raise-0.jpg','./guides/lateral-raise-1.jpg','./guides/leg-curl-0.jpg','./guides/leg-curl-1.jpg','./guides/leg-extension-0.jpg','./guides/leg-extension-1.jpg','./guides/leg-press-0.jpg','./guides/leg-press-1.jpg','./guides/overhead-triceps-0.jpg','./guides/overhead-triceps-1.jpg','./guides/pull-up-0.jpg','./guides/pull-up-1.jpg','./guides/pushdown-0.jpg','./guides/pushdown-1.jpg','./guides/rdl-0.jpg','./guides/rdl-1.jpg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.concat(GUIDE_IMGS))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const key = req.mode === 'navigate' ? './index.html' : req;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(key);
    const fresh = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(key, res.clone());
      return res;
    }).catch(() => cached);
    return cached || fresh;
  }));
});
