<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { pwaInfo } from 'virtual:pwa-info'
import { Search } from '@element-plus/icons-vue'
import { usePostStore } from '~/store/post'

const postStore = usePostStore()
console.info('pwaInfo in search', pwaInfo)
const searchWord = ref('')
const search = () => postStore.searchPostList(searchWord.value)
const handleSelect = (item: any) => {
  console.log('selected Item', item)
  postStore.searchPostList(item.suggestion)
  // const router = useRouter()
  // router.push(`/post/${encodeURIComponent(item.id)}`)
}

const reloadSW: any = '__RELOAD_SW__'
useRegisterSW({
  immediate: true,

  onRegisteredSW(swUrl, r) {
    console.log(`Service Worker at in post search: ${swUrl}`)
    if (reloadSW === 'true') {
      r && setInterval(async () => {
        console.log('Checking for sw update')
        await r.update()
      }, 20000 /* 20s for testing purposes */)
    }
    else {
      console.log(`SW Registered: ${JSON.parse(JSON.stringify(r))}`)
      // 브라우저가 서버로 요청을 보내면 Service Worker 는 fetch 이벤트를 구독해서 요청에 접근할 수 있다.
      postStore.getPostList()
      // self.addEventListener('fetch', (e: Event) => {
      //   console.log('===> in fetch event')
      //   e.respondWith(
      //     // Cache 된 응답이 있는지 확인하고 응답이 없으면 서버로 요청을 전달한다.
      //     caches.match(e.request).then((response) => {
      //       console.log('===> match event: ', response)
      //       return response || fetch(e.request)
      //     }),
      //   )
      // })
    }
  },
})

const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  cb(postStore.searchSuggest(queryString))
  // postStore.searchSuggest(queryString).then((result) => {
  //   cb(result)
  // })

  // Promise.all([
  //   axios.get(`http://localhost:3000/posts?title_like=${queryString}`),
  //   axios.get(`http://localhost:3000/posts?content_like=${queryString}`),
  // ]).then((res) => {
  //   const result: IPost[] = [...res[0].data, ...res[1].data].reduce((acc, val) => {
  //     if (acc[val.id])
  //       return acc
  //     acc[val.id] = val
  //     return acc
  //   }, {} as { [k: string]: any })
  //   cb(Object.values(result))
  // })
}
</script>

<template>
  <el-row justify="space-between">
    <el-col :span="18">
      <el-autocomplete
        v-model="searchWord"
        style="width: 100%"
        :fetch-suggestions="querySearchAsync"
        placeholder="메뉴얼 가이드 검색"
        value-key="suggestion"
        @select="handleSelect"
      />
    </el-col>
    <el-col :span="4">
      <el-button style="margin-left: auto;" :icon="Search" @click="search" />
    </el-col>
  </el-row>
</template>

