<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import MyWorker from '~/my-worker?worker'

const pong = ref<any>(null)
const mode = ref<any>(null)
const worker = new MyWorker()

// replaced dyanmicaly
const date = '__DATE__'
const timeAgo = useTimeAgo(date)

const runWorker = async () => {
  worker.postMessage('ping')
}
const resetMessage = async () => {
  worker.postMessage('clear')
}

const messageFromWorker = async (payload: any) => {
  console.log('messageFromWorker: ', messageFromWorker)
  pong.value = payload.data.msg
  mode.value = payload.data.useMode
}
onBeforeMount(() => {
  worker.addEventListener('message', messageFromWorker)
  // 브라우저가 서버로 요청을 보내면 Service Worker 는 fetch 이벤트를 구독해서 요청에 접근할 수 있다.
})
</script>

<template>
  <div>
    <post-view />
    <div class="mt-12">
      Built at: {{ date }} ({{ timeAgo }})
    </div>
    <button @click="runWorker">
      Ping web worker
    </button>
  &#160;&#160;
    <button @click="resetMessage">
      Reset message
    </button>
    <br>
    <template v-if="pong">
      Response from web worker: <span> Message: {{ pong }} </span>&#160;&#160;<span> Using ENV mode: {{ mode }}</span>
    </template>
  </div>
</template>
