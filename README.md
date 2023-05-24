# PWA prototype



# Issue, Discuss
- SearchEngine
  - auto suggestion 과정에서 이상발견: 현장 방문시 절차(1) -> 1 현장 방문시 절차  
    - 역 인덱싱이 원인?, 필터링이나 다른방법 모색필요.
    - 기존 MiniSearch 사용 어떻게 했는지? git lab 검색 결과 없음
- PWA
  - PWA가 설치되어 있다면 PWA 앱이 자동으로 열리게?
    - 알아본 바로는 manifest 설정을 통해 기기에 앱이 설치된경우 브라우저가 아닌 앱으로 오픈된다고 하는데 http, desktop 환경에선 작동하지 않는 것으로 확인됌
    - 레딧, 스택에서 부가적으로 안드로이드, IOS 부가설정을 통해 가능하다고 하는데 확실하지 않음
    - 우선적으로 앱을 https로 배포 후 Desktop, And, Ios 플랫폼에서 더 테스트를 해보아야 합니다.
  - .apk 설치 가용 여부
    - 가장 많이 사용하는 서비스 pwabuilder 기준 설명
      - https 로 배포된 페이지
      - 
    - 절차
      - URL 입력
      - 해당 페이지 manifest 및 pwa 가용여부 심사(스코어링)
      - 각 플랫폼별 메시지등 메타데이터 입력
      - apk, abb, sign key 등 빌드에 필요한 zip 파일 다운
  - Ios
    - 이전과 같은방법으로 zip 파일 다운 (프로젝트 소스 파일)
    - IOS 시뮬레이터를 통해 테스트
    - build 이후 배포


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

# FIX_List
1. style 직접 바인딩 ->  UnoCss 클래스로 대체

# History
## PWA
### 캐시 스토리지 전략 선정
__Network first__ 네트워크 우선. 캐시는 오프라인인 경우.

```bash
pnpm dev
```
Just run and visit http://localhost:3333

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