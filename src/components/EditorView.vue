<script setup lang="ts">
import type { EditorOptions } from '@toast-ui/editor'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style

const props = defineProps<{
  content: string // Initial value. Set Markdown string
}>()
// eslint-disable-next-line vue/no-dupe-keys
const { content } = toRefs(props)
const viewer = shallowRef<Editor | undefined>()

watch(() => content.value, (c) => {
  console.log('mark down: ', c)
  console.log('viewer: ', viewer.value)
  if (!viewer.value)
    return

  viewer.value.setMarkdown(c)
})

onMounted(() => {
  const el = document.querySelector('#viewer')
  if (!el)
    return
  viewer.value = new Editor({
    el,
    initialValue: props.content,
  } as EditorOptions)
})
</script>

<template>
  <div id="viewer" />
</template>
