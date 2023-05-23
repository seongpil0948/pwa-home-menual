# PWA prototype
pwa 기능 테스트를 위한 임시 레포지터리
# Test 내용
- 온라인 상태
  - 게시글 목록 받아오기
  - "현장 방문시 절차 (1)" 페이지 방문하기
- 오프라인 상태에서 목록을 받아 올 수 있는지
- 오프라인 상태에서 상세 페이지를 접근 할 수 있는지
  - "현장 방문시 절차 (1)" 접근가능
  - "현장 방문시 절차 (2)" 접근불가

# Issue, Discuss
## Search Engine 테스트
fuzzy, accuracy 등 실제 검색 테스트 이후 옵션들을 수정해야합니다.

## PWA
#### 캐시 스토리지 전략 선정
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

#### TODO 빌드 전략 선정
#### FIXME installable 
- 설치 가능여부 테스트 필요.
- https 환경 배포 필수.
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#required_manifest_members

#### Scope Parameter Issue
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
- https://lucaong.github.io/minisearch/#search-options
- https://element-plus.org/en-US/component/message-box.html#confirm