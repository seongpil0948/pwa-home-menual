import axios from 'axios'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { IPost } from '~/types'

const BASE_URL = 'http://127.0.0.1:3000/posts'

export const usePostStore = defineStore('post', () => {
  const postList = shallowRef<IPost[]>([])

  function addPost(post: IPost) {
    postList.value = [...postList.value, post]
  }

  async function refreshPostList(p?: { page?: number; size?: number }) {
    const url = `${BASE_URL}?_page=${p?.page ?? 1}&_limit=${p?.size ?? 10}`
    const res = await axios.get(url)
    postList.value = res.data
  }
  async function searchSuggest(queryString?: string): Promise<string[]> {
    if (!queryString)
      return []
    const res = await axios.get(`${BASE_URL}/search/${queryString}`)
    return res.data
  }

  return {
    postList,
    refreshPostList,
    searchSuggest,
    addPost,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot))
