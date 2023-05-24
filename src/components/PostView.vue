<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePostStore } from '~/store/post'
import type { ITreePost } from '~/types'

const postStore = usePostStore()
const { targetPostList } = storeToRefs(postStore)

const treeData = computed(() => postStore.postsToTree(targetPostList.value))

const router = useRouter()
function handleClick(t: ITreePost) {
  if (t.isCategory)
    return
  router.push(`/post/${t.id}`)
}
</script>

<template>
  <el-card class="pa-3">
    <template #header>
      <post-search-selector />
    </template>
    <el-tree node-key="id" :data="treeData" @node-click="handleClick" />
  </el-card>
</template>

