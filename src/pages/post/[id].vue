<script setup lang="ts">
// import axios from 'axios'
import { BIconChevronDoubleLeft, BIconChevronDoubleRight, BIconChevronLeft, BIconChevronRight } from 'bootstrap-icons-vue'
import type { IPost } from '~/types'

const props = defineProps<{ id: string }>()
// eslint-disable-next-line vue/no-dupe-keys
const { id } = toRefs(props)
const postStore = usePostStore()
const { targetPostList } = toRefs(postStore)

const targetPost = ref<IPost | undefined>()
const paging = reactive({
  targetIdx: 0,
  hasNext: false,
  hasPrev: false,
  doublePreAble: false,
  maxPage: 0,
})
const siblings = ref<IPost[]>([])
watchEffect(async () => {
  // const res = await axios.get(`http://localhost:3000/posts/${props.id}`)
  // targetPost.value = res.data
  targetPost.value = targetPostList.value.find(p => p.id === id.value)

  if (!targetPost || !targetPost.value)
    return console.error('targetPost가 없습니다')

  else if (!targetPost.value.parentId)
    return console.error('parentId가 없어서는 안됩니다.(is Leaf Node) at', targetPost.value)
  siblings.value = targetPostList.value.filter(p => targetPost.value!.parentId === p.parentId).slice()
  siblings.value.sort((a, b) => a.order - b.order)
  paging.targetIdx = siblings.value.findIndex(s => s.id === targetPost.value!.id)
  paging.maxPage = siblings.value.length - 1
  paging.hasNext = paging.targetIdx < paging.maxPage
  paging.hasPrev = paging.targetIdx > 0
  paging.doublePreAble = paging.targetIdx !== 0
})

const router = useRouter()
function handlePrevDouble() {
  router.push(`/post/${siblings.value[0].id}`)
}
function handlePrev() {
  router.push(`/post/${siblings.value[paging.targetIdx - 1].id}`)
}
function handleNext() {
  router.push(`/post/${siblings.value[paging.targetIdx + 1].id}`)
}
function handleNextDouble() {
  router.push(`/post/${siblings.value[paging.maxPage].id}`)
}
</script>

<template>
  <el-container v-if="targetPost" style="height: 100vh;">
    <div style="min-height: 50vh; overflow-y: auto;">
      <div text-4xl>
        <div i-carbon-pedestrian inline-block />
      </div>
      <div v-if="targetPost">
        <p text-sm opacity-75>
          <em>{{ targetPost.title }}</em>
        </p>
        <editor-view :content="targetPost.content" />
      </div>
    </div>
    <el-footer style="height: 10vh;">
      <el-row justify="center">
        <el-col :span="1" class="mx-1">
          <el-button :disabled="!paging.hasPrev" :icon="BIconChevronDoubleLeft" @click="handlePrevDouble" />
        </el-col>
        <el-col :span="1" class="mx-1">
          <el-button :disabled="!paging.hasPrev" :icon="BIconChevronLeft" @click="handlePrev" />
        </el-col>
        <el-col :span="1" class="mx-1">
          <!-- <el-button :disabled="-1 < paging.targetIdx && paging.targetIdx < paging.maxPage" :icon="BIconChevronRight" @click="handleNext" /> -->
          <el-button :disabled="!paging.hasNext" :icon="BIconChevronRight" @click="handleNext" />
        </el-col>
        <el-col :span="1" class="mx-1">
          <el-button :disabled="paging.targetIdx >= paging.maxPage" :icon="BIconChevronDoubleRight" @click="handleNextDouble" />
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
  <el-result
    v-else
    icon="error"
    title="존재하지 않는 게시글"
    sub-title="잠시후에 다시 시도해주세요"
  >
    <template #extra>
      <el-button type="primary" @click="router.back()">
        뒤로가기
      </el-button>
    </template>
  </el-result>
</template>
