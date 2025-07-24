const CACHE_NAME = "Qih-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/intro.html",
  "/verivikasi.html",
  "/login.html",
  "/register.html",
  "/password.html",
  "/reset.html",
  "/chat.html",
  "/faqih.png",
  "/oke.png",
  "/qih.svg",
  "/manifest.json",
];

// Install service worker dan cache file
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ambil file dari cache saat offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Update cache jika ada versi baru
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});
