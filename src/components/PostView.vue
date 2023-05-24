<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePostStore } from '~/store/post'
import { PERMISSIONS } from '~/temp'

const postStore = usePostStore()
const { postList, postSearched } = storeToRefs(postStore)
const authStore = useAuthStore()
const userPostIds = PERMISSIONS.filter(p => p.postId && p.userId === authStore.auth.userId).map(x => x.postId!)

const targetPostList = computed(() => {
  if (postSearched.value.length > 0) {
    const targetIds = postSearched.value.map(x => x.id).filter(y => userPostIds.includes(y))
    console.log('targetIds: ', targetIds)
    return postList.value.filter(y => y.isCategory || targetIds.includes(y.id))
  }
  return postList.value.filter(y => y.isCategory || userPostIds.includes(y.id))
})
const treeData = computed(() => postStore.postsToTree(targetPostList.value))
</script>

<template>
  <el-card class="pa-3">
    <template #header>
      <post-search-selector />
    </template>
    <!-- <el-card v-for="p in targetPostList" :key="p.id" style="width: 100%;" class="box-card icon-btn mx-2 items-center mt-2">
      <RouterLink :to="`/post/${p.id}`">
        {{ p.title }}
      </RouterLink>
    </el-card> -->
    <el-tree node-key="id" :data="treeData" />
  </el-card>
</template>

