# PWA prototype

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