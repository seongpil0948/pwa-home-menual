<script setup lang="ts">
import axios from 'axios'
import { BIconChevronDoubleLeft, BIconChevronDoubleRight, BIconChevronLeft, BIconChevronRight } from 'bootstrap-icons-vue'
import type { IPost } from '~/types'

const props = defineProps<{ id: string }>()
const targetPost = ref<IPost | undefined>()
watchEffect(async () => {
  const res = await axios.get(`http://localhost:3000/posts/${props.id}`)
  targetPost.value = res.data
})
</script>

<template>
  <el-container style="height: 100vh;">
    <div style="height: 90vh; overflow-y: auto;">
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
          <el-button :icon="BIconChevronDoubleLeft" />
        </el-col>
        <el-col :span="1" class="mx-1">
          <el-button :icon="BIconChevronLeft" />
        </el-col>
        <el-col :span="1" class="mx-1">
          <el-button :icon="BIconChevronRight" />
        </el-col>
        <el-col :span="1" class="mx-1">
          <el-button :icon="BIconChevronDoubleRight" />
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>
