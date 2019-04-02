importScripts("/precache-manifest.7fdb8c2212a7e7e0c59ab8ff302f87fd.js");


        importScripts('/static/workbox-v3.6.3/workbox-sw.js');
        workbox.setConfig({
            modulePathPrefix: '/static/workbox-v3.6.3/'
        });
    /**
 * @file service-worker.js with workbox api
 * @desc [example](https://workbox-samples.glitch.me/examples/workbox-sw/)
 * @author jwchan1996(741755613@qq.com)
 */

/* globals workbox */
workbox.core.setCacheNameDetails({
    prefix: 'lavas-cache',
    suffix: 'v1',
    precache: 'install-time',
    runtime: 'run-time',
    googleAnalytics: 'ga'
});
workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

/**
 * example runningCache with api
 */
workbox.routing.registerRoute(/^https:\/\/www\.apiopen\.top/,
    workbox.strategies.networkFirst());


/**
 * example runningCache with resources from CDN
 * including maxAge, maxEntries
 * cacheableResponse is important for CDN
 */
workbox.routing.registerRoute(/^https:\/\/cdn\.baidu\.com/i,
    workbox.strategies.cacheFirst({
        cacheName: 'lavas-cache-images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ]
    })
);
workbox.routing.registerNavigationRoute('/index.html');
