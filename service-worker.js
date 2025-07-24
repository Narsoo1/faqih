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
  "/manifest.json"
];

// Install service worker dan cache file
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // langsung aktif
});

// Ambil file dari cache saat offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => caches.match('/index.html')) // fallback
  );
});

// Hapus cache lama saat versi baru diaktifkan
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
  self.clients.claim(); // kontrol halaman langsung
});

// Push Notification
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Notifikasi Baru!";
  const options = {
    body: data.body || "Kamu punya pesan baru.",
    icon: "/faqih.png",
    badge: "/faqih.png"
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Background Sync
self.addEventListener("sync", function(event) {
  if (event.tag === "sync-chats") {
    event.waitUntil(syncChats());
  }
});

// Simulasi background sync
async function syncChats() {
  console.log("⏳ Melakukan background sync chat...");
  // Simulasi: ambil dari IndexedDB dan kirim ulang ke server
  // Bisa dihubungkan ke Firebase jika kamu pakai IndexedDB
}

// Periodic Sync (opsional)
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "update-chats") {
    event.waitUntil(updateChats());
  }
});

async function updateChats() {
  console.log("🔄 Periodic sync: memperbarui chat...");
}
