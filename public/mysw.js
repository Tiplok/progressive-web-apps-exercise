/**
  * Comment ce fichier fonctionne ?
  * Il lit des événements javascript et, en fonction de ce qui a été lu, il effectue une action
  *
  * --- event install ---
  * Dans l'exemple ci-dessous, on a l'event install qui permet de mettre en cache l'ensemble des pages statiques du site
  * Quand l'event est lancé, on ouvre un cache au nom "pwa" et on lui ajoute les fichiers statiques
  *
  * --- event fetch ---
  * Pour récupérer les appels serveur, il faut utiliser l'event "fetch"
  * Pour cet event, chaque requête est mise en cache
  *
  * Il est possible de voir ce que contient le cache dans le devtool, onglet "Application", partie "Cache Storage"
  * Dans notre exemple, on y verra l'ensemble des pages statiques
  *
  */

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('pwa').then(cache => {
      return cache.addAll([
        '/',
        '/sw.js',
        '/index.html',
        '/planets',
        '/bundle.js',
        '/index.css',
        '/cat.png',
        '/duck.png',
        '/donut.png',
        '/racoon.png',
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
