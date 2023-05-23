<script setup lang="ts">
import axios from 'axios'
import type { IPost } from '~/types'

const props = defineProps<{ id: string }>()
const targetPost = ref<IPost | undefined>()
watchEffect(async () => {
  const res = await axios.get(`http://localhost:3000/posts/${props.id}`)
  targetPost.value = res.data
})
</script>

<template>
  <div>
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
</template>
