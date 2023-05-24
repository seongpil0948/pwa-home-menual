<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import '~/styles/test.scss'
// https://github.com/vueuse/head
useHead({
  title: 'Vue Dev Guide',
  meta: [
    { name: 'description', content: 'Vue3, Typescript 기반 개발 가이드' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
// const auth = useAuthStore()
// const router = useRouter()

// watch(() => auth.isAuthenticated, (val) => {
//   if (!val && router.currentRoute.value.name !== 'login')
//     router.push('/login')
// }, { immediate: true })

const { updateServiceWorker } = useRegisterSW({
  immediate: true,
  onNeedRefresh() {
    ElMessageBox.confirm(
      '새로운 컨텐츠가 있습니다. 새로고침 하시겠습니까?',
      'Info',
      {
        confirmButtonText: '새로고침',
        cancelButtonText: '취소',
        type: 'info',
      },
    ).then(() => updateServiceWorker(true))
  },
  onOfflineReady() {
    console.info('offline ready in search')
  },

})
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed')
})

function getPWADisplayMode() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
  if (document.referrer.startsWith('android-app://'))
    return 'twa'
  // @ts-expect-error ggg
  else if (window.matchMedia('(display-mode: standalone)').matches || navigator.standalone || isStandalone)
    return 'standalone'

  return 'browser'
}

onMounted(() => {
  console.log('DISPLAY_MODE_LAUNCH:', getPWADisplayMode())
  // @ts-expect-error only worked in https
  navigator.getInstalledRelatedApps().then((appList) => {
    console.log('installed apps: ', appList)
  })
  // if (getPWADisplayMode() === 'browser') {
  //   const el = document.createElement('a')
  //   el.setAttribute('href', 'http://localhost:3333/')
  //   el.setAttribute('target', '_blank')
  //   el.click()
  // }
})

const showBanner = ref(false)
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault()
  // window.promptEvent = event
  // if (getPWADisplayMode() === 'standalone')
  // console.log('pwa 앱 모드입니다. display-mode is standalone')
  showBanner.value = true
})

function addToHomeScreen() {
  // @ts-expect-error ggg
  window.promptEvent.prompt()
  // @ts-expect-error ggg
  window.promptEvent.userChoice.then((choiceResult: any) => console.log(choiceResult))
}
</script>

<template>
  <el-alert v-if="showBanner" title="앱설치하기" type="success">
    <template #default>
      <el-row justify="end" style="width: 100vw">
        <el-col :span="3">
          <el-button size="small" @click="addToHomeScreen">
            설치
          </el-button>
        </el-col>
      </el-row>
    </template>
  </el-alert>
  <RouterView />
</template>
