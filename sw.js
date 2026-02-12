// ============================================================
// Service Worker - معمل الكيمياء الذكي
// برمجيات العدوي 2026
// ============================================================

const cacheName = 'chem-lab-v2';
const cacheVersion = '2.0.0';

// قائمة الملفات اللي هتشتغل أوفلاين (حاولت أغطي كل حاجة)

const assets = [
  './',
  './index.html',
  './offline.html',  // <-- أضف هذا السطر
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




// 1. مرحلة التثبيت - حفظ كل الملفات في الكاش
self.addEventListener('install', e => {
  console.log(`🚀 تثبيت Service Worker الإصدار ${cacheVersion}`);
  
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('📦 جاري حفظ ملفات الكيمياء للعمل أوفلاين...');
      return cache.addAll(assets).then(() => {
        console.log('✅ تم حفظ جميع الملفات بنجاح');
        self.skipWaiting(); // تفعيل الـ SW الجديد فوراً
      });
    }).catch(error => {
      console.error('❌ فشل في حفظ بعض الملفات:', error);
    })
  );
});

// 2. مرحلة الاستجابة - استراتيجية Cache First ثم Network
self.addEventListener('fetch', e => {
  // تجاهل طلبات المتصفح الداخلية (chrome-extension, etc)
  if (!e.request.url.startsWith(self.location.origin)) {
    return;
  }

  // تجاهل طلبات التحليل (analytics) لو موجودة
  if (e.request.url.includes('analytics') || e.request.url.includes('google')) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      // لو الملف موجود في الكاش - رجعه فوراً
      if (cachedResponse) {
        return cachedResponse;
      }

      // لو مش موجود - حاول تجيبه من النت
      return fetch(e.request).then(networkResponse => {
        // لو الملف جاي من النت - احفظه في الكاش عشان المرات الجاية
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(cacheName).then(cache => {
            cache.put(e.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(error => {
        console.log('🔴 فشل في جلب الملف:', e.request.url);
        
        // لو المستخدم بيطلب صفحة HTML - رجعه صفحة أوفلاين مخصصة
        if (e.request.headers.get('accept').includes('text/html')) {
          return caches.match('./offline.html');
        }
      });
    })
  );
});

// 3. مرحلة التنشيط - تنظيف الكاش القديم
self.addEventListener('activate', e => {
  console.log('⚡ تنشيط Service Worker الجديد');
  
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            console.log('🧹 حذف الكاش القديم:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      console.log('✅ التحديث جاهز!');
      return self.clients.claim(); // السيطرة على كل الصفحات المفتوحة
    })
  );
});

// 4. استقبال رسائل من الصفحة الرئيسية (اختياري)
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (e.data === 'updateCache') {
    console.log('🔄 تحديث الكاش يدوياً...');
    e.waitUntil(
      caches.open(cacheName).then(cache => {
        return cache.addAll(assets);
      })
    );
  }
});

console.log('🧪 Service Worker جاهز للتشغيل');
