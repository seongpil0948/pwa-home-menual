# PWA prototype

# Issue, Discuss
- [ ] SearchEngine
  - [ ] auto suggestion 과정에서 이상발견: 현장 방문시 절차(1) -> 1 현장 방문시 절차  
  역 인덱싱이 원인?, 필터링이나 다른방법 모색필요.
- [ ] PWA
  - [x] 캐시 스토리지 전략 선정: __Network first__



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