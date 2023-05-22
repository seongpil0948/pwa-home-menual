<script setup lang="ts">
import axios from 'axios'
import type { IPost } from '~/types'

const emit = defineEmits<{
  (e: 'postList', todo: IPost[]): void
}>()

const searchWord = ref('')
const postList = ref<IPost[]>([])
const router = useRouter()

const handleSelect = (item: any) => {
  router.push(`/post/${encodeURIComponent(item.id)}`)
}

const searchPost = async (p?: { page?: number; size?: number }) => {
  const url = `http://localhost:3000/posts?_page=${p?.page ?? 1}&_limit=${p?.size ?? 10}`
  const res = await axios.get(url)
  postList.value = res.data
  emit('postList', postList.value)
}
searchPost()
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  console.log('queryString: ', queryString)
  if (!queryString)
    return cb([])
  Promise.all([
    axios.get(`http://localhost:3000/posts?title_like=${queryString}`),
    axios.get(`http://localhost:3000/posts?content_like=${queryString}`),
  ]).then((res) => {
    const result: IPost[] = [...res[0].data, ...res[1].data].reduce((acc, val) => {
      if (acc[val.id])
        return acc
      acc[val.id] = val
      return acc
    }, {} as { [k: string]: any })
    cb(Object.values(result))
  })
}
</script>

<template>
  <el-autocomplete
    v-model="searchWord"
    :fetch-suggestions="querySearchAsync"
    placeholder="메뉴얼 가이드 검색"
    value-key="title"
    @select="handleSelect"
  />
</template>

