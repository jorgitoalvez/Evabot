const CACHE = 'evabot-v1';
const assets = ['/', '/index.html', '/styles/style.css', '/img/evabot.png', '/scripts/app.js'];

self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE).then(c => c.addAll(assets))
));

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});