<script setup>
import axios from 'axios'
import { set } from 'nprogress'
import { storeToRefs } from 'pinia'

const router = useRouter()
const authStore = useAuthStore()
const { auth, isAuthenticated } = storeToRefs(authStore)

const loginId = ref('')
const loginPassword = ref('')
const userInputIdRef = ref('')
const userInputPwdRef = ref('')
const validationId = ref(false)
const validationPassword = ref(false)

const messageBox = (msg) => {
  ElMessageBox.alert(msg, {
    confirmButtonText: '확인',
  })
}

const submitForm = async () => {
  if (loginId.value === '') {
    messageBox('아이디를 입력해주세요.')
    validationId.value = true
    userInputIdRef.value.focus()
    return
  }

  if (loginPassword.value === '') {
    messageBox('비밀번호를 입력해주세요.')
    validationPassword.value = true
    userInputPwdRef.value.focus()
    return
  }

  const loginUser = {
    id: loginId.value,
    pwd: loginPassword.value,
  }

  // const res = await axios.post('/api/v1/users', loginUser)

  // if (!res.data.success) {
  //   messageBox('아이디 또는 비밀번호가 일치하지 않습니다.')
  //   validationId.value = false
  //   validationPassword.value = false
  //   userInputIdRef.value.focus()
  //   return
  // }

  // authStore.setUser(res.data.userid, res.data.username)
  authStore.setUser(loginUser.id, 'sp')
  router.push('/')
}
onMounted(() => {
  userInputIdRef.value.focus()
})
</script>

<template>
  <div class="ma-auto">
    <div class="text-center w-[60%] h14 text-5xl text-blue-400 mt-10 mx-auto">
      Login
    </div>
    <div
      class="drop-shadow rounded border-black bg-white w-[40%] mx-auto p-4 my-5"
    >
      <el-form>
        <div class="flex-col w-[60%] justify-center mx-auto my-10 text-left">
          <el-input
            ref="userInputIdRef"
            v-model="loginId"
            type="text"
            placeholder="아이디를 입력하세요."
          />
          <span v-if="validationId" class="color-red mb-4 text-sm">아이디를 입력해주세요.</span>
          <span v-else class="block p-3" />

          <el-input
            ref="userInputPwdRef"
            v-model="loginPassword"
            type="password"
            placeholder="비밀번호를 입력하세요."
            @keyup.enter="submitForm"
          />
          <span v-if="validationPassword" class="color-red text-sm">비밀번호를 입력해주세요.</span>
          <span v-else class="block p-3" />
        </div>
        <el-row justify="center" class="my-5">
          <el-col :span="4">
            <el-button type="primary" plain @click="submitForm">
              로그인
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: headless
</route>

<style lang="scss" scoped>
.background {
  height: 80vh;
  background-color: white;
  overflow: hidden;
  background-position: center;
}
</style>
