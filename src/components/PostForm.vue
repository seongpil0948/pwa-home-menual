<script setup lang="ts">
import axios from 'axios'
import type { FormInstance } from 'element-plus'
import AppEditor from './AppEditor.vue'
import type { IPost } from '~/types'

const postStore = usePostStore()
const postModel = reactive<IPost>({
  id: getUniqueId(10),
  title: '',
  content: '',
})
const contentRef = ref<InstanceType<typeof AppEditor> | undefined>()
function resetPost() {
  postModel.id = getUniqueId(10)
  postModel.title = ''
  postModel.content = ''
  contentRef.value?.clear()
}
const formRef = ref<FormInstance>()
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl || !contentRef)
    return
  formEl.validate(async (valid) => {
    postModel.content = contentRef.value?.getMarkdown() ?? ''
    if (valid) {
      console.log('submit!', postModel)
      const res = await axios.post('http://localhost:3000/posts', postModel)
      resetPost()
      postStore.addPost(res.data)
    }
    else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>가이드 작성 양식</span>
        </div>
      </template>
      <el-form ref="formRef" :model="postModel" label-width="120px">
        <el-form-item label="제목 입력">
          <el-input v-model="postModel.title" placeholder="Wifi 설치 방법" />
        </el-form-item>
        <el-form-item label="작성란">
          <!-- <el-input
            v-model="postModel.content"
            :rows="4"
            type="textarea"
            placeholder="1번 LAN을 연결 합니다"
          /> -->
          <AppEditor ref="contentRef" />
        </el-form-item>
        <el-form-item>
          <el-button size="large" style="margin-left: auto;" @click="submitForm(formRef)">
            제출
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
