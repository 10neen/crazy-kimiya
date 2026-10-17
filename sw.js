
/* ============================================================
   Service Worker - معمل الكيمياء الذكي
   برمجيات العدوي 2026
   Version: 2.1.0
   ============================================================ */

const CACHE_NAME = 'chem-lab-v8';
const CACHE_VERSION = '2.1.0';

const ASSETS = [
  './',
  './index.html',
  './offline.html',
  './style.css',
  './script.js',
  './database.js',
  './manifest.json',
  './assets/كيميا_المرح.png',
  './sounds/bubble.mp3',
  './sounds/pop.mp3',
  './sounds/success.mp3',
  './sounds/error.mp3'
];

// 1. Installation: cache the required application files.
self.addEventListener('install', event => {
  console.log(`🚀 Installing Chemistry Lab SW ${CACHE_VERSION}`);

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
      .catch(error => {
        console.error('❌ Cache installation failed:', error);
        throw error;
      })
  );
});

// 2. Fetch: cache first, then network.
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Handle only same-origin GET requests.
  if (
    request.method !== 'GET' ||
    url.origin !== self.location.origin
  ) {
    return;
  }

  // Do not cache analytics or Google requests.
  if (
    url.hostname.includes('google') ||
    url.pathname.includes('analytics')
  ) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async cache => {
      const cachedResponse = await cache.match(request);

      if (cachedResponse) {
        return cachedResponse;
      }

      try {
        const response = await fetch(request);

        // Cache successful same-origin responses.
        if (
          response &&
          response.status === 200 &&
          response.type === 'basic'
        ) {
          event.waitUntil(
            cache.put(request, response.clone())
          );
        }

        return response;
      } catch (error) {
        console.warn('🔴 Network request failed:', request.url);

        // Show the offline page for navigation requests.
        if (request.mode === 'navigate') {
          const offlinePage = await cache.match('./offline.html');

          if (offlinePage) {
            return offlinePage;
          }
        }

        // No cached response or offline page available.
        return new Response(
          'أنت غير متصل بالإنترنت، حاول مرة أخرى عند عودة الاتصال.',
          {
            status: 503,
            statusText: 'Service Unavailable',
            headers: {
              'Content-Type': 'text/plain; charset=utf-8'
            }
          }
        );
      }
    })
  );
});

// 3. Activation: remove old Chemistry Lab caches only.
self.addEventListener('activate', event => {
  console.log(`⚡ Activating Chemistry Lab SW ${CACHE_VERSION}`);

  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key =>
            key.startsWith('chem-lab-') &&
            key !== CACHE_NAME
          )
          .map(key => {
            console.log('🧹 Removing old cache:', key);
            return caches.delete(key);
          })
      ))
      .then(() => self.clients.claim())
      .then(() => {
        console.log('✅ Chemistry Lab is ready!');
      })
  );
});

// 4. Optional messages from the application.
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    event.waitUntil(self.skipWaiting());
  }

  if (event.data === 'updateCache') {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => cache.addAll(ASSETS))
        .then(() => {
          console.log('🔄 Cache updated successfully');
        })
        .catch(error => {
          console.error('❌ Cache update failed:', error);
          throw error;
        })
    );
  }
});

console.log(`🧪 Chemistry Lab SW ${CACHE_VERSION} loaded`);
