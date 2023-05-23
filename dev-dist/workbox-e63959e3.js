define(["exports"],(function(t){"use strict";try{self["workbox:core:6.5.3"]&&_()}catch(t){}const e=(t,...e)=>{let s=t;return e.length>0&&(s+=` :: ${JSON.stringify(e)}`),s};class s extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:6.5.3"]&&_()}catch(t){}const n=t=>t&&"object"==typeof t?t:{handle:t};class i{constructor(t,e,s="GET"){this.handler=n(e),this.match=t,this.method=s}setCatchHandler(t){this.catchHandler=n(t)}}class r extends i{constructor(t,e,s){super((({url:e})=>{const s=t.exec(e.href);if(s&&(e.origin===location.origin||0===s.index))return s.slice(1)}),e,s)}}class a{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(t=>{const{request:e}=t,s=this.handleRequest({request:e,event:t});s&&t.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(t=>{if(t.data&&"CACHE_URLS"===t.data.type){const{payload:e}=t.data,s=Promise.all(e.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const s=new Request(...e);return this.handleRequest({request:s,event:t})})));t.waitUntil(s),t.ports&&t.ports[0]&&s.then((()=>t.ports[0].postMessage(!0)))}}))}handleRequest({request:t,event:e}){const s=new URL(t.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:i,route:r}=this.findMatchingRoute({event:e,request:t,sameOrigin:n,url:s});let a=r&&r.handler;const c=t.method;if(!a&&this.i.has(c)&&(a=this.i.get(c)),!a)return;let o;try{o=a.handle({url:s,request:t,event:e,params:i})}catch(t){o=Promise.reject(t)}const h=r&&r.catchHandler;return o instanceof Promise&&(this.o||h)&&(o=o.catch((async n=>{if(h)try{return await h.handle({url:s,request:t,event:e,params:i})}catch(t){t instanceof Error&&(n=t)}if(this.o)return this.o.handle({url:s,request:t,event:e});throw n}))),o}findMatchingRoute({url:t,sameOrigin:e,request:s,event:n}){const i=this.t.get(s.method)||[];for(const r of i){let i;const a=r.match({url:t,sameOrigin:e,request:s,event:n});if(a)return i=a,(Array.isArray(i)&&0===i.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(i=void 0),{route:r,params:i}}return{}}setDefaultHandler(t,e="GET"){this.i.set(e,n(t))}setCatchHandler(t){this.o=n(t)}registerRoute(t){this.t.has(t.method)||this.t.set(t.method,[]),this.t.get(t.method).push(t)}unregisterRoute(t){if(!this.t.has(t.method))throw new s("unregister-route-but-not-found-with-method",{method:t.method});const e=this.t.get(t.method).indexOf(t);if(!(e>-1))throw new s("unregister-route-route-not-registered");this.t.get(t.method).splice(e,1)}}let c;const o=()=>(c||(c=new a,c.addFetchListener(),c.addCacheListener()),c);function h(t,e,n){let a;if("string"==typeof t){const s=new URL(t,location.href);a=new i((({url:t})=>t.href===s.href),e,n)}else if(t instanceof RegExp)a=new r(t,e,n);else if("function"==typeof t)a=new i(t,e,n);else{if(!(t instanceof i))throw new s("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=t}return o().registerRoute(a),a}const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},l=t=>[u.prefix,t,u.suffix].filter((t=>t&&t.length>0)).join("-"),f=t=>t||l(u.precache),w=t=>t||l(u.runtime);function d(t){t.then((()=>{}))}const y=new Set;function p(){return p=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},p.apply(this,arguments)}const m=(t,e)=>e.some((e=>t instanceof e));let g,R;const q=new WeakMap,b=new WeakMap,v=new WeakMap,D=new WeakMap,E=new WeakMap;let x={get(t,e,s){if(t instanceof IDBTransaction){if("done"===e)return b.get(t);if("objectStoreNames"===e)return t.objectStoreNames||v.get(t);if("store"===e)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return B(t[e])},set:(t,e,s)=>(t[e]=s,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function U(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(R||(R=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(L(this),e),B(q.get(this))}:function(...e){return B(t.apply(L(this),e))}:function(e,...s){const n=t.call(L(this),e,...s);return v.set(n,e.sort?e.sort():[e]),B(n)}}function I(t){return"function"==typeof t?U(t):(t instanceof IDBTransaction&&function(t){if(b.has(t))return;const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",r),t.removeEventListener("abort",r)},i=()=>{e(),n()},r=()=>{s(t.error||new DOMException("AbortError","AbortError")),n()};t.addEventListener("complete",i),t.addEventListener("error",r),t.addEventListener("abort",r)}));b.set(t,e)}(t),m(t,g||(g=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(t,x):t)}function B(t){if(t instanceof IDBRequest)return function(t){const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("success",i),t.removeEventListener("error",r)},i=()=>{e(B(t.result)),n()},r=()=>{s(t.error),n()};t.addEventListener("success",i),t.addEventListener("error",r)}));return e.then((e=>{e instanceof IDBCursor&&q.set(e,t)})).catch((()=>{})),E.set(e,t),e}(t);if(D.has(t))return D.get(t);const e=I(t);return e!==t&&(D.set(t,e),E.set(e,t)),e}const L=t=>E.get(t);function k(t,e,{blocked:s,upgrade:n,blocking:i,terminated:r}={}){const a=indexedDB.open(t,e),c=B(a);return n&&a.addEventListener("upgradeneeded",(t=>{n(B(a.result),t.oldVersion,t.newVersion,B(a.transaction),t)})),s&&a.addEventListener("blocked",(t=>s(t.oldVersion,t.newVersion,t))),c.then((t=>{r&&t.addEventListener("close",(()=>r())),i&&t.addEventListener("versionchange",(t=>i(t.oldVersion,t.newVersion,t)))})).catch((()=>{})),c}const N=["get","getKey","getAll","getAllKeys","count"],O=["put","add","delete","clear"],C=new Map;function T(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(C.get(e))return C.get(e);const s=e.replace(/FromIndex$/,""),n=e!==s,i=O.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!i&&!N.includes(s))return;const r=async function(t,...e){const r=this.transaction(t,i?"readwrite":"readonly");let a=r.store;return n&&(a=a.index(e.shift())),(await Promise.all([a[s](...e),i&&r.done]))[0]};return C.set(e,r),r}x=(t=>p({},t,{get:(e,s,n)=>T(e,s)||t.get(e,s,n),has:(e,s)=>!!T(e,s)||t.has(e,s)}))(x);try{self["workbox:expiration:6.5.3"]&&_()}catch(t){}const j="cache-entries",M=t=>{const e=new URL(t,location.href);return e.hash="",e.href};class S{constructor(t){this.h=null,this.u=t}l(t){const e=t.createObjectStore(j,{keyPath:"id"});e.createIndex("cacheName","cacheName",{unique:!1}),e.createIndex("timestamp","timestamp",{unique:!1})}p(t){this.l(t),this.u&&function(t,{blocked:e}={}){const s=indexedDB.deleteDatabase(t);e&&s.addEventListener("blocked",(t=>e(t.oldVersion,t))),B(s).then((()=>{}))}(this.u)}async setTimestamp(t,e){const s={url:t=M(t),timestamp:e,cacheName:this.u,id:this.m(t)},n=(await this.getDb()).transaction(j,"readwrite",{durability:"relaxed"});await n.store.put(s),await n.done}async getTimestamp(t){const e=await this.getDb(),s=await e.get(j,this.m(t));return null==s?void 0:s.timestamp}async expireEntries(t,e){const s=await this.getDb();let n=await s.transaction(j).store.index("timestamp").openCursor(null,"prev");const i=[];let r=0;for(;n;){const s=n.value;s.cacheName===this.u&&(t&&s.timestamp<t||e&&r>=e?i.push(n.value):r++),n=await n.continue()}const a=[];for(const t of i)await s.delete(j,t.id),a.push(t.url);return a}m(t){return this.u+"|"+M(t)}async getDb(){return this.h||(this.h=await k("workbox-expiration",1,{upgrade:this.p.bind(this)})),this.h}}class P{constructor(t,e={}){this.g=!1,this.R=!1,this.q=e.maxEntries,this.v=e.maxAgeSeconds,this.D=e.matchOptions,this.u=t,this._=new S(t)}async expireEntries(){if(this.g)return void(this.R=!0);this.g=!0;const t=this.v?Date.now()-1e3*this.v:0,e=await this._.expireEntries(t,this.q),s=await self.caches.open(this.u);for(const t of e)await s.delete(t,this.D);this.g=!1,this.R&&(this.R=!1,d(this.expireEntries()))}async updateTimestamp(t){await this._.setTimestamp(t,Date.now())}async isURLExpired(t){if(this.v){const e=await this._.getTimestamp(t),s=Date.now()-1e3*this.v;return void 0===e||e<s}return!1}async delete(){this.R=!1,await this._.expireEntries(1/0)}}try{self["workbox:background-sync:6.5.3"]&&_()}catch(t){}const K="requests",W="queueName";class A{constructor(){this.h=null}async addEntry(t){const e=(await this.getDb()).transaction(K,"readwrite",{durability:"relaxed"});await e.store.add(t),await e.done}async getFirstEntryId(){const t=await this.getDb(),e=await t.transaction(K).store.openCursor();return null==e?void 0:e.value.id}async getAllEntriesByQueueName(t){const e=await this.getDb(),s=await e.getAllFromIndex(K,W,IDBKeyRange.only(t));return s||new Array}async getEntryCountByQueueName(t){return(await this.getDb()).countFromIndex(K,W,IDBKeyRange.only(t))}async deleteEntry(t){const e=await this.getDb();await e.delete(K,t)}async getFirstEntryByQueueName(t){return await this.getEndEntryFromIndex(IDBKeyRange.only(t),"next")}async getLastEntryByQueueName(t){return await this.getEndEntryFromIndex(IDBKeyRange.only(t),"prev")}async getEndEntryFromIndex(t,e){const s=await this.getDb(),n=await s.transaction(K).store.index(W).openCursor(t,e);return null==n?void 0:n.value}async getDb(){return this.h||(this.h=await k("workbox-background-sync",3,{upgrade:this.l})),this.h}l(t,e){e>0&&e<3&&t.objectStoreNames.contains(K)&&t.deleteObjectStore(K);t.createObjectStore(K,{autoIncrement:!0,keyPath:"id"}).createIndex(W,W,{unique:!1})}}class F{constructor(t){this.U=t,this.I=new A}async pushEntry(t){delete t.id,t.queueName=this.U,await this.I.addEntry(t)}async unshiftEntry(t){const e=await this.I.getFirstEntryId();e?t.id=e-1:delete t.id,t.queueName=this.U,await this.I.addEntry(t)}async popEntry(){return this.B(await this.I.getLastEntryByQueueName(this.U))}async shiftEntry(){return this.B(await this.I.getFirstEntryByQueueName(this.U))}async getAll(){return await this.I.getAllEntriesByQueueName(this.U)}async size(){return await this.I.getEntryCountByQueueName(this.U)}async deleteEntry(t){await this.I.deleteEntry(t)}async B(t){return t&&await this.deleteEntry(t.id),t}}const $=["method","referrer","referrerPolicy","mode","credentials","cache","redirect","integrity","keepalive"];class H{constructor(t){"navigate"===t.mode&&(t.mode="same-origin"),this.L=t}static async fromRequest(t){const e={url:t.url,headers:{}};"GET"!==t.method&&(e.body=await t.clone().arrayBuffer());for(const[s,n]of t.headers.entries())e.headers[s]=n;for(const s of $)void 0!==t[s]&&(e[s]=t[s]);return new H(e)}toObject(){const t=Object.assign({},this.L);return t.headers=Object.assign({},this.L.headers),t.body&&(t.body=t.body.slice(0)),t}toRequest(){return new Request(this.L.url,this.L)}clone(){return new H(this.toObject())}}const Q="workbox-background-sync",G=new Set,z=t=>{const e={request:new H(t.requestData).toRequest(),timestamp:t.timestamp};return t.metadata&&(e.metadata=t.metadata),e};class V{constructor(t,{forceSyncFallback:e,onSync:n,maxRetentionTime:i}={}){if(this.k=!1,this.N=!1,G.has(t))throw new s("duplicate-queue-name",{name:t});G.add(t),this.O=t,this.C=n||this.replayRequests,this.T=i||10080,this.j=Boolean(e),this.M=new F(this.O),this.S()}get name(){return this.O}async pushRequest(t){await this.P(t,"push")}async unshiftRequest(t){await this.P(t,"unshift")}async popRequest(){return this.K("pop")}async shiftRequest(){return this.K("shift")}async getAll(){const t=await this.M.getAll(),e=Date.now(),s=[];for(const n of t){const t=60*this.T*1e3;e-n.timestamp>t?await this.M.deleteEntry(n.id):s.push(z(n))}return s}async size(){return await this.M.size()}async P({request:t,metadata:e,timestamp:s=Date.now()},n){const i={requestData:(await H.fromRequest(t.clone())).toObject(),timestamp:s};switch(e&&(i.metadata=e),n){case"push":await this.M.pushEntry(i);break;case"unshift":await this.M.unshiftEntry(i)}this.k?this.N=!0:await this.registerSync()}async K(t){const e=Date.now();let s;switch(t){case"pop":s=await this.M.popEntry();break;case"shift":s=await this.M.shiftEntry()}if(s){const n=60*this.T*1e3;return e-s.timestamp>n?this.K(t):z(s)}}async replayRequests(){let t;for(;t=await this.shiftRequest();)try{await fetch(t.request.clone())}catch(e){throw await this.unshiftRequest(t),new s("queue-replay-failed",{name:this.O})}}async registerSync(){if("sync"in self.registration&&!this.j)try{await self.registration.sync.register(`${Q}:${this.O}`)}catch(t){}}S(){"sync"in self.registration&&!this.j?self.addEventListener("sync",(t=>{if(t.tag===`${Q}:${this.O}`){const e=async()=>{let e;this.k=!0;try{await this.C({queue:this})}catch(t){if(t instanceof Error)throw e=t,e}finally{!this.N||e&&!t.lastChance||await this.registerSync(),this.k=!1,this.N=!1}};t.waitUntil(e())}})):this.C({queue:this})}static get W(){return G}}try{self["workbox:cacheable-response:6.5.3"]&&_()}catch(t){}class J{constructor(t={}){this.A=t.statuses,this.F=t.headers}isResponseCacheable(t){let e=!0;return this.A&&(e=this.A.includes(t.status)),this.F&&e&&(e=Object.keys(this.F).some((e=>t.headers.get(e)===this.F[e]))),e}}function X(t,e){const s=new URL(t);for(const t of e)s.searchParams.delete(t);return s.href}class Y{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}try{self["workbox:strategies:6.5.3"]&&_()}catch(t){}function Z(t){return"string"==typeof t?new Request(t):t}class tt{constructor(t,e){this.$={},Object.assign(this,e),this.event=e.event,this.H=t,this.G=new Y,this.V=[],this.J=[...t.plugins],this.X=new Map;for(const t of this.J)this.X.set(t,{});this.event.waitUntil(this.G.promise)}async fetch(t){const{event:e}=this;let n=Z(t);if("navigate"===n.mode&&e instanceof FetchEvent&&e.preloadResponse){const t=await e.preloadResponse;if(t)return t}const i=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))n=await t({request:n.clone(),event:e})}catch(t){if(t instanceof Error)throw new s("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const r=n.clone();try{let t;t=await fetch(n,"navigate"===n.mode?void 0:this.H.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))t=await s({event:e,request:r,response:t});return t}catch(t){throw i&&await this.runCallbacks("fetchDidFail",{error:t,event:e,originalRequest:i.clone(),request:r.clone()}),t}}async fetchAndCachePut(t){const e=await this.fetch(t),s=e.clone();return this.waitUntil(this.cachePut(t,s)),e}async cacheMatch(t){const e=Z(t);let s;const{cacheName:n,matchOptions:i}=this.H,r=await this.getCacheKey(e,"read"),a=Object.assign(Object.assign({},i),{cacheName:n});s=await caches.match(r,a);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await t({cacheName:n,matchOptions:i,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(t,e){const n=Z(t);var i;await(i=0,new Promise((t=>setTimeout(t,i))));const r=await this.getCacheKey(n,"write");if(!e)throw new s("cache-put-with-no-response",{url:(a=r.url,new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var a;const c=await this.Y(e);if(!c)return!1;const{cacheName:o,matchOptions:h}=this.H,u=await self.caches.open(o),l=this.hasCallback("cacheDidUpdate"),f=l?await async function(t,e,s,n){const i=X(e.url,s);if(e.url===i)return t.match(e,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),a=await t.keys(e,r);for(const e of a)if(i===X(e.url,s))return t.match(e,n)}(u,r.clone(),["__WB_REVISION__"],h):null;try{await u.put(r,l?c.clone():c)}catch(t){if(t instanceof Error)throw"QuotaExceededError"===t.name&&await async function(){for(const t of y)await t()}(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:o,oldResponse:f,newResponse:c.clone(),request:r,event:this.event});return!0}async getCacheKey(t,e){const s=`${t.url} | ${e}`;if(!this.$[s]){let n=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))n=Z(await t({mode:e,request:n,event:this.event,params:this.params}));this.$[s]=n}return this.$[s]}hasCallback(t){for(const e of this.H.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const s of this.iterateCallbacks(t))await s(e)}*iterateCallbacks(t){for(const e of this.H.plugins)if("function"==typeof e[t]){const s=this.X.get(e),n=n=>{const i=Object.assign(Object.assign({},n),{state:s});return e[t](i)};yield n}}waitUntil(t){return this.V.push(t),t}async doneWaiting(){let t;for(;t=this.V.shift();)await t}destroy(){this.G.resolve(null)}async Y(t){let e=t,s=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,s=!0,!e)break;return s||e&&200!==e.status&&(e=void 0),e}}class et{constructor(t={}){this.cacheName=w(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,s="string"==typeof t.request?new Request(t.request):t.request,n="params"in t?t.params:void 0,i=new tt(this,{event:e,request:s,params:n}),r=this.Z(i,s,e);return[r,this.tt(r,i,s,e)]}async Z(t,e,n){let i;await t.runCallbacks("handlerWillStart",{event:n,request:e});try{if(i=await this.et(e,t),!i||"error"===i.type)throw new s("no-response",{url:e.url})}catch(s){if(s instanceof Error)for(const r of t.iterateCallbacks("handlerDidError"))if(i=await r({error:s,event:n,request:e}),i)break;if(!i)throw s}for(const s of t.iterateCallbacks("handlerWillRespond"))i=await s({event:n,request:e,response:i});return i}async tt(t,e,s,n){let i,r;try{i=await t}catch(r){}try{await e.runCallbacks("handlerDidRespond",{event:n,request:s,response:i}),await e.doneWaiting()}catch(t){t instanceof Error&&(r=t)}if(await e.runCallbacks("handlerDidComplete",{event:n,request:s,response:i,error:r}),e.destroy(),r)throw r}}function st(t,e){const s=e();return t.waitUntil(s),s}try{self["workbox:precaching:6.5.3"]&&_()}catch(t){}function nt(t){if(!t)throw new s("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:e,url:n}=t;if(!n)throw new s("add-to-cache-list-unexpected-type",{entry:t});if(!e){const t=new URL(n,location.href);return{cacheKey:t.href,url:t.href}}const i=new URL(n,location.href),r=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",e),{cacheKey:i.href,url:r.href}}class it{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:t,state:e})=>{e&&(e.originalRequest=t)},this.cachedResponseWillBeUsed=async({event:t,state:e,cachedResponse:s})=>{if("install"===t.type&&e&&e.originalRequest&&e.originalRequest instanceof Request){const t=e.originalRequest.url;s?this.notUpdatedURLs.push(t):this.updatedURLs.push(t)}return s}}}class rt{constructor({precacheController:t}){this.cacheKeyWillBeUsed=async({request:t,params:e})=>{const s=(null==e?void 0:e.cacheKey)||this.st.getCacheKeyForURL(t.url);return s?new Request(s,{headers:t.headers}):t},this.st=t}}let at,ct;async function ot(t,e){let n=null;if(t.url){n=new URL(t.url).origin}if(n!==self.location.origin)throw new s("cross-origin-copy-response",{origin:n});const i=t.clone(),r={headers:new Headers(i.headers),status:i.status,statusText:i.statusText},a=e?e(r):r,c=function(){if(void 0===at){const t=new Response("");if("body"in t)try{new Response(t.body),at=!0}catch(t){at=!1}at=!1}return at}()?i.body:await i.blob();return new Response(c,a)}class ht extends et{constructor(t={}){t.cacheName=f(t.cacheName),super(t),this.nt=!1!==t.fallbackToNetwork,this.plugins.push(ht.copyRedirectedCacheableResponsesPlugin)}async et(t,e){const s=await e.cacheMatch(t);return s||(e.event&&"install"===e.event.type?await this.it(t,e):await this.rt(t,e))}async rt(t,e){let n;const i=e.params||{};if(!this.nt)throw new s("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const s=i.integrity,r=t.integrity,a=!r||r===s;n=await e.fetch(new Request(t,{integrity:"no-cors"!==t.mode?r||s:void 0})),s&&a&&"no-cors"!==t.mode&&(this.ct(),await e.cachePut(t,n.clone()))}return n}async it(t,e){this.ct();const n=await e.fetch(t);if(!await e.cachePut(t,n.clone()))throw new s("bad-precaching-response",{url:t.url,status:n.status});return n}ct(){let t=null,e=0;for(const[s,n]of this.plugins.entries())n!==ht.copyRedirectedCacheableResponsesPlugin&&(n===ht.defaultPrecacheCacheabilityPlugin&&(t=s),n.cacheWillUpdate&&e++);0===e?this.plugins.push(ht.defaultPrecacheCacheabilityPlugin):e>1&&null!==t&&this.plugins.splice(t,1)}}ht.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:t})=>!t||t.status>=400?null:t},ht.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await ot(t):t};class ut{constructor({cacheName:t,plugins:e=[],fallbackToNetwork:s=!0}={}){this.ot=new Map,this.ht=new Map,this.ut=new Map,this.H=new ht({cacheName:f(t),plugins:[...e,new rt({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.H}precache(t){this.addToCacheList(t),this.lt||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.lt=!0)}addToCacheList(t){const e=[];for(const n of t){"string"==typeof n?e.push(n):n&&void 0===n.revision&&e.push(n.url);const{cacheKey:t,url:i}=nt(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this.ot.has(i)&&this.ot.get(i)!==t)throw new s("add-to-cache-list-conflicting-entries",{firstEntry:this.ot.get(i),secondEntry:t});if("string"!=typeof n&&n.integrity){if(this.ut.has(t)&&this.ut.get(t)!==n.integrity)throw new s("add-to-cache-list-conflicting-integrities",{url:i});this.ut.set(t,n.integrity)}if(this.ot.set(i,t),this.ht.set(i,r),e.length>0){const t=`Workbox is precaching URLs without revision info: ${e.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(t)}}}install(t){return st(t,(async()=>{const e=new it;this.strategy.plugins.push(e);for(const[e,s]of this.ot){const n=this.ut.get(s),i=this.ht.get(e),r=new Request(e,{integrity:n,cache:i,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:t}))}const{updatedURLs:s,notUpdatedURLs:n}=e;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(t){return st(t,(async()=>{const t=await self.caches.open(this.strategy.cacheName),e=await t.keys(),s=new Set(this.ot.values()),n=[];for(const i of e)s.has(i.url)||(await t.delete(i),n.push(i.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.ot}getCachedURLs(){return[...this.ot.keys()]}getCacheKeyForURL(t){const e=new URL(t,location.href);return this.ot.get(e.href)}getIntegrityForCacheKey(t){return this.ut.get(t)}async matchPrecache(t){const e=t instanceof Request?t.url:t,s=this.getCacheKeyForURL(e);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(t){const e=this.getCacheKeyForURL(t);if(!e)throw new s("non-precached-url",{url:t});return s=>(s.request=new Request(t),s.params=Object.assign({cacheKey:e},s.params),this.strategy.handle(s))}}const lt=()=>(ct||(ct=new ut),ct);class ft extends i{constructor(t,e){super((({request:s})=>{const n=t.getURLsToCacheKeys();for(const i of function*(t,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:i}={}){const r=new URL(t,location.href);r.hash="",yield r.href;const a=function(t,e=[]){for(const s of[...t.searchParams.keys()])e.some((t=>t.test(s)))&&t.searchParams.delete(s);return t}(r,e);if(yield a.href,s&&a.pathname.endsWith("/")){const t=new URL(a.href);t.pathname+=s,yield t.href}if(n){const t=new URL(a.href);t.pathname+=".html",yield t.href}if(i){const t=i({url:r});for(const e of t)yield e.href}}(s.url,e)){const e=n.get(i);if(e){return{cacheKey:e,integrity:t.getIntegrityForCacheKey(e)}}}}),t.strategy)}}t.BackgroundSyncPlugin=class{constructor(t,e){this.fetchDidFail=async({request:t})=>{await this.ft.pushRequest({request:t})},this.ft=new V(t,e)}},t.CacheFirst=class extends et{async et(t,e){let n,i=await e.cacheMatch(t);if(!i)try{i=await e.fetchAndCachePut(t)}catch(t){t instanceof Error&&(n=t)}if(!i)throw new s("no-response",{url:t.url,error:n});return i}},t.CacheableResponsePlugin=class{constructor(t){this.cacheWillUpdate=async({response:t})=>this.wt.isResponseCacheable(t)?t:null,this.wt=new J(t)}},t.ExpirationPlugin=class{constructor(t={}){this.cachedResponseWillBeUsed=async({event:t,request:e,cacheName:s,cachedResponse:n})=>{if(!n)return null;const i=this.dt(n),r=this.yt(s);d(r.expireEntries());const a=r.updateTimestamp(e.url);if(t)try{t.waitUntil(a)}catch(t){}return i?n:null},this.cacheDidUpdate=async({cacheName:t,request:e})=>{const s=this.yt(t);await s.updateTimestamp(e.url),await s.expireEntries()},this.gt=t,this.v=t.maxAgeSeconds,this.Rt=new Map,t.purgeOnQuotaError&&function(t){y.add(t)}((()=>this.deleteCacheAndMetadata()))}yt(t){if(t===w())throw new s("expire-custom-caches-only");let e=this.Rt.get(t);return e||(e=new P(t,this.gt),this.Rt.set(t,e)),e}dt(t){if(!this.v)return!0;const e=this.qt(t);if(null===e)return!0;return e>=Date.now()-1e3*this.v}qt(t){if(!t.headers.has("date"))return null;const e=t.headers.get("date"),s=new Date(e).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[t,e]of this.Rt)await self.caches.delete(t),await e.delete();this.Rt=new Map}},t.NavigationRoute=class extends i{constructor(t,{allowlist:e=[/./],denylist:s=[]}={}){super((t=>this.bt(t)),t),this.vt=e,this.Dt=s}bt({url:t,request:e}){if(e&&"navigate"!==e.mode)return!1;const s=t.pathname+t.search;for(const t of this.Dt)if(t.test(s))return!1;return!!this.vt.some((t=>t.test(s)))}},t.cleanupOutdatedCaches=function(){self.addEventListener("activate",(t=>{const e=f();t.waitUntil((async(t,e="-precache-")=>{const s=(await self.caches.keys()).filter((s=>s.includes(e)&&s.includes(self.registration.scope)&&s!==t));return await Promise.all(s.map((t=>self.caches.delete(t)))),s})(e).then((t=>{})))}))},t.clientsClaim=function(){self.addEventListener("activate",(()=>self.clients.claim()))},t.createHandlerBoundToURL=function(t){return lt().createHandlerBoundToURL(t)},t.precacheAndRoute=function(t,e){!function(t){lt().precache(t)}(t),function(t){const e=lt();h(new ft(e,t))}(e)},t.registerRoute=h}));
