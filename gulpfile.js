'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');

/**
  * Cette tâche Gulp va permettre de générer le service Worker
  */
gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'public';

  swPrecache.write(path.join(rootDir, 'sw.js'), {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'], // staticFileGlobs permet d'aller chercher l'ensemble des fichiers statiques
    stripPrefix: rootDir,
    navigateFallback: '/',
    runtimeCaching: [{ // runtimeCaching permet de cacher les requêtes qui vont vers le serveur
      urlPattern: /\/planet/, // le pattern d'url
      handler: 'cacheFirst'
      /**
        * handler correspond à la façon de cacher, il en existes plusieurs :
        * "cacheFirst" = Prend ce qui se trouve dans le cache, s’il est vide, envoie la requête au serveur.
        * "networkFirst" : Envoie le requête au serveur, s’il ne répond pas prend ce qu’il y a dans le cache.
        * "fastest" : Envoie la requête au serveur et va chercher dans le cache, prend celui qui répond en premier.
        */
    }],
    verbose: true

  }, callback);
});
