import axios from 'axios'
import { acceptHMRUpdate, defineStore } from 'pinia'
import MiniSearch from 'minisearch'
import type { IPost } from '~/types'

const BASE_URL = 'http://127.0.0.1:3000/posts'
const ID_FIELD = 'id'
const FIELD_LIST: (keyof IPost)[] = [ID_FIELD, 'title', 'content']

export const usePostStore = defineStore('post', () => {
  const postList = shallowRef<IPost[]>([])
  const postSearched = shallowRef<IPost[]>([])
  const postSearch = new MiniSearch({
    fields: FIELD_LIST,
    storeFields: FIELD_LIST,
    idField: ID_FIELD,
  })

  function addPost(post: IPost) {
    postList.value = [...postList.value, post]
    refreshPostList()
  }

  function refreshPostList() {
    postSearch.removeAll()
    postSearch.addAll(postList.value)
  }
  // async function getPostList(p?: { page?: number; size?: number }) {
  async function getPostList() {
    // const url = `${BASE_URL}?_page=${p?.page ?? 1}&_limit=${p?.size ?? 10}`

    const res = await axios.get(BASE_URL)
    postList.value = res.data
    refreshPostList()
  }

  async function searchPostList(word: string) {
    postSearched.value = postSearch.search(word).reduce((acc, val) => {
      const serialized: Partial<IPost> = {}
      for (let i = 0; i < FIELD_LIST.length; i++)
        serialized[FIELD_LIST[i]] = val[FIELD_LIST[i]]

      acc.push(serialized as IPost)
      return acc
    }, [] as IPost[])
  }

  function searchSuggest(word?: string) {
    if (!word || word.trim().length < 1)
      return []
    const result = postSearch.autoSuggest(word, { fields: ['title'], fuzzy: 12 }).slice(0, 5)
    console.info('suggested list: ', result)
    return result
    // const res = await axios.get(`${BASE_URL}/search/${queryString}`)
    // return res.data
    // return Promise.resolve(result.reduce((acc, val) => {
    //   const keywords = val.suggestion.split(' ').map(x => x.trim()).filter(x => x)
    //   return [...acc, ...keywords]
    // }, [] as string[]))
  }

  return {
    postList,
    postSearched,
    searchPostList,
    getPostList,
    searchSuggest,
    addPost,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot))
