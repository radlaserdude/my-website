self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('jft-cache').then(cache => {
      return cache.addAll(['./']);
    })
  );
});
