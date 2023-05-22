# Mockup 기능과 fetch 사용하기
제공하는 서비스의 복잡도가 높아 짐에 따라 **Frontend**와 **Backend** 개발이 나눠지며, 각각 전문적으로 개발을 수행하고 있습니다. 여기서 오는 괴리가 바로, **Frontend** 개발 간 모든 리소스가 준비되어 있지 않는다는 것입니다. **Backend**에서 필요한 API가 다 구성되면 좋겠지만, 물질적/시간적 등 한계에 따라 거의 불가능한 일입니다. 이를 해결하기 위해서 `API Mock-up` 기능을 도입해야만 합니다. 문제는 많은 시도를 해왔고, 그 경험에 따라 더 좋은 방법을 찾아야만 했습니다. `axios-mock-server`와 같은 좋은 도구들이 있지만, 소스에 Mockup 데이터가 들어가게 되면 빌드 문제가 발생할 수 있고, 이제 `fetch()`를 사용해야 하기 때문에 제한적인 선택이 되었습니다.

이에, 사용이 간편하면서, 빌드에 문제 없고, 개발에서만 사용할 수 있는 방법을 찾아야만 했었고, 이번의 시도는 `node-mock-server`를 사용하는 것입니다. 이 기능은 이전 **mockup**과는 다르게 따로 nodejs 서버를 이용하여 서비스를 제공합니다. 그러므로, 빌드에 완전히 분리되어 있습니다. 또한, 직접 path나 값을 넣기 위한 파일 생성도 `UI`를 통해 손쉽게 할 수 있는 장점이 있습니다.

## 빠르게 만들어 보기
`/api/v1/comm/echo` 라는 `GET` 전용의 **Mock API** 만들어 보겠습니다. 프레임워크에서는 `pnpm dev`만 해도 자동으로 해당 **Mock Server**가 동작하며, `http://localhost:3001`에 **UI**를 접근할 수 있습니다.
> `/api/v1`은 프레임워크 설정에 자동 지정되어 있고, 그 이후인 `/comm/echo` 만 설정해서 생성하면 됩니다.
1. `+add new endpoint`를 선택합니다.
2. **Path** 영역에 `/comm/echo`를 입력합니다.
3. **Method**에 `GET`을 선택합니다.
4. **Description**에 설명글을 적어 줍니다.

위 순서로 진행하면, 자동으로 해당 Blank 형식의 API가 만들어 집니다. **UI**에서 생성된 해당 API를 선택해서 들어가면, `success.json`이 자동 선택되어 있고, 여기에 `open` 버튼을 선택하면, vscode에서 해당 파일이 오픈됩니다. 여기에 `mockup` 데이터를 넣어주면 끝입니다. 단순하게 구성해서 바로 사용이 가능합니다. [`node-mock-server`](https://github.com/smollweide/node-mock-server)에서 사용 예제와 가이드를 확인할 수 있습니다.

## 좀 더 견고하게 만들어 보기
`mockup` 데이터는 **DTO** 기능을 통해, 데이터 타입을 사전에 지정할 수 있습니다. 또한, `response` 데이터도 `Scheme`형식으로 타입을 지정할 수 있습니다.
```json
// /mock/rest/_DTO/CardDTO.json
{
  "cardId": "string",
  "message": "string",
  "price": "number"
}
```
`_DTO` 디렉토리에 타입 정의를 할 수 있습니다. 이를 가지고, 특정 API에서 사용할 수 있습니다.
```json
// /mock/rest/comm/#hello/GET/response_schema.json
{
  "success": "boolean",
  "body": "$ref-CardDTO"
}
```
**UI** 에서 자동으로 생성된 `response_schema.json`에서 return 되는 타입을 정의하고, 여기서 `DTO`를 가져와 사용 가능합니다.
```json
// /mock/rest/comm/#hello/GET/mock/success.json
{
  "success": true,
  "body": {
    "cardId": "f3dfx4",
    "message": "GOOD!",
    "price": 32.99
  }
}
```
위와 같이 정의가 마무리되면 `validate` 기능을 통해 `mockup` 데이터 검증이 가능합니다.

## 개발환경에서 서버 API 접근하기
`local` 개발 환경에서 mockup 서버에 접근 혹은, 실제 서버에 접근하는 방법은 `vitejs`에서 제공하는 proxy 기능으로 접근이 가능합니다. `API`들은 proxy 설정이 가능할 수 있도록 `api`와 같이 기준 **subpath**가 존재합니다. 혹은 `context-path` 라고 부르기도 합니다. 이를 기준으로 개발 환경에서 해당 서버들을 접근할 수 있도록 `proxy` 설정이 가능합니다. 해당 기능은 `vite.config.js` 내 [`server.proxy` 항목](https://vitejs.dev/config/server-options.html#server-proxy)을 확인하면 됩니다.

프레임워크는 기본적으로 mock 서버인 `http://localhost:3001`를 가르키고 있습니다. 기준 값은 `/api` 입니다.

## `fetch()` 사용하기
이전의 프레임워크나 대부분 프로젝트에서는 `axios` 라이브러리를 많이 사용하여, **restful api** 사용을 하였습니다. 사실 이를 사용하지 않아도 `fetch()`라는 것을 통해 손쉽게 restful api를 조회할 수 있습니다. 크롬의 경우 42 버전 부터 사용이 가능합니다. 프레임워크에서는 일반적으로 `Wrapper`를 구성해서 사용합니다. 그대로 fetch()를 사용하는 것도 낭만적이지만, 공통에서 처리해야 할 (interceptor와 같이) 부분이 있기 때문입니다.

`composables` 항목에 `request.ts`로 정의했고, 어디든 선언 없이 비동기 함수인 `request()`를 사용하면 됩니다. `src\composables\request.ts` 파일 내용을 확인하고 공통으로 처리가 필요한 항목들을 Customizing 하면 됩니다. 한편, 현재 프레임워크는 이전 항목들과 같이 `.env` 파일에 주요 환경 내용을 선언하여 처리합니다. request 경우, prefixUrl로 `/api/v1`을 사용하는데, 이는 `.env`에 정의하고 있습니다. 자세한 내용은 [여기](https://vitejs.dev/guide/env-and-mode.html)를 참고하십시오.

간단한 샘플로 [`src\guide\pages\samp\fetch.vue`](/guide/samp/fetch)를 확인하십시오.
## Links
- [Node Mock Server](https://github.com/smollweide/node-mock-server)