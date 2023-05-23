# PWA prototype

# Note
## PWA
### Service worker
- 불러올 경우 해당 어플리케이션 네트워크 요청을 intercept 한다.(scope의 영향을 받지 않음)
- 만약 `/subdir/index.html`, `/subdir/sw.js` 파일 존재시 scope 는 `/subdir/` 이고.
  서비스워커는 scope 범위내에서 페이지 동작을 조절 할 수 있다.(reload, message, .. etc)
- response header Service-Worker-Allowed 는 scope를 조절 할 수 있다.
#### The lifecycle of a new service worker
##### 1. Registration
```html
<script>
  window.addEventListener('load', () => {
    // Is service worker available?
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('Service worker registered!');
      }).catch((error) => {
        console.warn('Error registering service worker:');
        console.warn(error);
      });
    }
  });
</script>
```
- Service workers are only available over HTTPS or localhost.
- If a service worker's contents contain syntax errors, registration fails and the service worker is discarded.
- Reminder: service workers operate within a scope. Here, the scope is the entire origin, as it was loaded from the root directory.
- When registration begins, the service worker state is set to 'installing'.

##### 2. Installation
등록이 된 후, 워커당 단 한번 [install](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope/install_event) 이벤트 발생한다.  
통상 해당 이벤트에 대한 콜백으로 이벤트 리스너를 설정한다.
```javascript
// /sw.js
self.addEventListener('install', (event) => {
  const cacheKey = 'MyFancyCacheName_v1';
  // Creates a new Cache instance named 'MyFancyCache_v1'.
  // After the cache is created, an array of asset URLs are precached using its asynchronous addAll method.
  // Installation fails if the promise(s) passed to event.waitUntil are rejected. If this happens, the service worker is discarded.
  event.waitUntil(caches.open(cacheKey).then((cache) => {
    // Add all the assets in the array to the 'MyFancyCacheName_v1'
    // `Cache` instance for later use.
    return cache.addAll([
      '/css/global.bc7b80b7.css',
      '/css/home.fe5d0b23.css',
      '/js/home.d3cc4ba4.js',
      '/js/jquery.43ca4933.js'
    ]);
  }));
});
```
##### 3. Activation
서리가 완료되면 서비스워커는 활성화 됩니다. (become activating). 
이과정에서 새로운 워커가 아닌경우, 오래된 캐시삭제등의 작업을 진행합니다.

#### Handling service worker updates
##### 업데이트 조건
- 유저가 워커 scope 내에서 페이지를 이동하는 경우
- [when-updates-happen](https://developer.chrome.com/docs/workbox/service-worker-lifecycle/#when-updates-happen)

TODO: https://developer.chrome.com/docs/workbox/service-worker-lifecycle/#how-updates-happen

### 캐시 스토리지 전략
https://developer.chrome.com/docs/workbox/caching-strategies-overview/#caching-strategies
- Cache only
  - 모든 자원이 build 시에 precache 형태로 소유라고 가정, 업데이트 하지않는 전략
- Network only
  - The opposite of "Cache Only" is "Network Only"
  - never work when the user is offline.
- Cache first, falling back to network
  - 캐시 우선 탐색, 이후 실패 할 경우 네트워크 요청
- Network first, falling back to cache
  - 네트워크 요청 -> 캐시 업데이트
  - 오프라인: 캐시 사용
- Stale-while-revalidate
  - 캐시 사용, 백그라운드 네트워크 요청 -> 캐시와 비교 후 업데이트


# Test 내용
### Front
- tui 에디터 설치
- 게시글 작성 및 상세 페이지 라우팅
### Server
- json-server with mini-search
### PWA
- 온라인 상태
  - 게시글 목록 받아오기
  - "현장 방문시 절차 (1)" 페이지 방문하기
- 오프라인 상태에서 목록을 받아 올 수 있는지
- 오프라인 상태에서 상세 페이지를 접근 할 수 있는지
  - "현장 방문시 절차 (1)" 접근가능
  - "현장 방문시 절차 (2)" 접근불가

# Issue, Discuss
### Search Engine 테스트
fuzzy, accuracy 등 실제 검색 테스트 이후 옵션들을 수정해야합니다.

### 캐시 스토리지 전략 선정
[캐시 스토리지 전략](#캐시-스토리지-전략)  
__Network first, falling back to cache__ 로 임시 채택한 상태


### 빌드 전략 선정
### 설치 가능한 어플리케이션
https 환경 배포 필수.
- 설치 가능여부 테스트 필요.
- 아래 링크 테스트 필요
  - https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#required_manifest_members

### Scope Parameter Issue
아래 링크에 대한 확인이 필요합니다.
https://stackoverflow.com/questions/53173797/target-blank-link-opening-in-pwa-and-not-in-browser-in-android

----- 
Just run and visit http://localhost:3333

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist` that ready to be served.

### Deploy on Netlify

Go to [Netlify](https://app.netlify.com/start) and select your clone, `OK` along the way, and your App will be live in a minute.

### Docker Production Build

First, build the vitesse image by opening the terminal in the project's root directory.

```bash
docker buildx build . -t vitesse:latest
```

Run the image and specify port mapping with the `-p` flag.

```bash
docker run --rm -it -p 8080:80 vitesse:latest
```


## Refer
- https://developer.chrome.com/docs/workbox/
- https://vite-pwa-org.netlify.app/
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
- https://github.com/typicode/json-server#filter
- https://lucaong.github.io/minisearch/#search-options
- https://element-plus.org/en-US/component/message-box.html#confirm