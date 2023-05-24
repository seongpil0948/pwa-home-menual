import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  // const router = useRouter()
  const auth = ref({
    userId: '',
    userName: '',
  })
  const isAuthenticated = computed(
    () => auth.value.userId && auth.value.userId !== '',
  )
  // watchEffect(() => {
  //   if (!isAuthenticated.value && router.currentRoute.value.name !== 'login')
  //     router.push('/login')
  // })
  const setUser = (id: string, name: string) => {
    auth.value.userId = id
    auth.value.userName = name
  }
  const logout = () => {
    auth.value.userId = ''
    auth.value.userName = ''
  }
  return {
    setUser,
    logout,
    isAuthenticated,
    auth,
  }
})
