// import axios from 'axios'
import { acceptHMRUpdate, defineStore } from 'pinia'
import MiniSearch from 'minisearch'
import type { IPost } from '~/types'

// const BASE_URL = 'http://127.0.0.1:3000/posts'
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

    // for mock
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    postList.value = MOCK_POST

    // const res = await axios.get(BASE_URL)
    // postList.value = res.data
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

const MOCK_POST: IPost[] = [
  {
    id: '3947077577e+11',
    title: '와이파이를 설치 해봅시다.',
    content: 'LAN을 연결 합니다.',
  },
  {
    id: '3947077577e+12',
    title: '와이파이를 설치 해봅시다.',
    content: 'WAN을 연결 합니다.',
  },
  {
    id: '2241244208e+11',
    title: '현장 방문시 절차 (1)',
    content: '**반갑습니다**\n여러분의 교육을 맡게된 최성필입니다.',
  },
  {
    id: '1586846317e+12',
    title: '현장 방문시 절차 (2)',
    content: '고객님께 안부 인사를 전하도록 합니다.\npart 3',
  },
  {
    id: '4290937734e+10',
    title: '현장 방문시 절차(3)',
    content: '가격을 말씀드립니다 e.g  15,000원 선불입니다.',
  },
  {
    id: '1010646886e+12',
    title: '현장 방문시 절차(4)',
    content: '배가 고픈데 혹시 남는 밥이 있을까 여쭙습니다.',
  },
  {
    id: '3852356647e+11',
    title: '현장 방문시 절차(5)',
    content: '맛있게 밥을 먹으며, 김치는 없냐고 묻습니다.',
  },
]
