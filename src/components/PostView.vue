<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePostStore } from '~/store/post'

const postStore = usePostStore()
const { postList, postSearched } = storeToRefs(postStore)
const targetPostList = computed(() => postSearched.value.length > 0 ? postSearched.value : postList.value)
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

