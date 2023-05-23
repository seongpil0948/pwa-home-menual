<script setup lang="ts">
import type { EditorOptions } from '@toast-ui/editor'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style

const props = defineProps<{
  initialValue?: string // Initial value. Set Markdown string
}>()

const editor = shallowRef<Editor | undefined>()
onMounted(() => {
  const el = document.querySelector('#editor')
  if (!el)
    return
  editor.value = new Editor({
    el,
    height: '500px',
    initialEditType: 'markdown',
    initialValue: props.initialValue ?? '내용을 작성 해주세요.',
    previewStyle: 'vertical',
  } as EditorOptions)
})
function getMarkdown() {
  return editor.value?.getMarkdown()
}
function focus() {
  return editor.value?.focus()
}
function clear() {
  return editor.value?.setMarkdown('')
}

defineExpose({ getMarkdown, focus, clear })
</script>

<template>
  <div id="editor" />
</template>

