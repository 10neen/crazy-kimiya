const cacheName = 'chem-lab-v4';
// قائمة الملفات اللي هيتم حفظها للعمل بدون إنترنت
const assets = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './assets/كيميا_المرح.png'
];

// 1. مرحلة التثبيت: حفظ الملفات في الكاش
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('جاري حفظ ملفات الكيمياء للعمل أوفلاين...');
      return cache.addAll(assets);
    })
  );
});

// 2. مرحلة الاستجابة: جلب الملفات من الكاش لو الإنترنت مقطوع
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      // لو الملف موجود في الكاش رجعه، لو مش موجود حاول تجيبه من النت
      return res || fetch(e.request);
    })
  );
});

// 3. تحديث التطبيق: مسح الكاش القديم لو نزل إصدار جديد
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName)
            .map(key => caches.delete(key))
      );
    })
  );

});


