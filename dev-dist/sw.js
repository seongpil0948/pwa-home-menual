if(!self.define){let e,n={};const t=(t,i)=>(t=new URL(t+".js",i).href,n[t]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=n,document.head.appendChild(e)}else e=t,importScripts(t),n()})).then((()=>{let e=n[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(i,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(n[o])return;let r={};const l=e=>t(e,o),c={module:{uri:o},exports:r,require:l};n[o]=Promise.all(i.map((e=>c[e]||l(e)))).then((e=>(s(...e),r)))}}define(["./workbox-eb53aaf9"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"registerSW.js",revision:"3ca0b8505b4bec776b69afdba2768812"},{revision:null,url:"index.html"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{allowlist:[/^\/$/]})),e.registerRoute(/\w*/,new e.NetworkFirst({cacheName:"network-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new e.BackgroundSyncPlugin("myQueueName",{maxRetentionTime:1440}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
