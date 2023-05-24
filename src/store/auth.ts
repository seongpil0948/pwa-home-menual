import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const auth = ref({
    userId: '',
    userName: '',
  })
  const isAuthenticated = computed(
    () => auth.value.userId && auth.value.userId !== '',
  )
  const setUser = (id: string, name: string) => {
    auth.value.userId = id
    auth.value.userName = name
  }
  const clearUser = () => {
    auth.value.userId = ''
    auth.value.userName = ''
  }
  return {
    setUser,
    clearUser,
    isAuthenticated,
    auth,
  }
})
