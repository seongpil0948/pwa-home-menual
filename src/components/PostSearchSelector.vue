<script setup lang="ts">
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
  <el-row justify="space-around">
    <el-col :span="20">
      <el-autocomplete
        v-model="searchWord"
        style="width: 100%"
        :fetch-suggestions="querySearchAsync"
        placeholder="메뉴얼 가이드 검색"
        value-key="suggestion"
        @select="handleSelect"
      />
    </el-col>
    <el-col :span="2">
      <el-button style="margin-left: auto;" :icon="Search" @click="search" />
    </el-col>
  </el-row>
</template>

