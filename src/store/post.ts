// import axios from 'axios'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import MiniSearch from 'minisearch'
import type { IPost, ITreePost } from '~/types'
import { MOCK_POST, PERMISSIONS } from '~/temp'

// const BASE_URL = 'http://127.0.0.1:3000/posts'
const ID_FIELD = 'id'
const FIELD_LIST: (keyof IPost)[] = [ID_FIELD, 'title', 'content', 'parentId']

export const usePostStore = defineStore('post', () => {
  const authStore = useAuthStore()
  const { auth } = storeToRefs(authStore)
  const postList = shallowRef<IPost[]>([])
  const postSearched = shallowRef<IPost[]>([])
  const postSearch = new MiniSearch({
    fields: FIELD_LIST,
    storeFields: FIELD_LIST,
    idField: ID_FIELD,
    tokenize: (string) => {
      const s = string.trim()
      return [s]
    },
  })
  const userPostIds = computed(() => PERMISSIONS.filter(p => p.postId && p.userId === auth.value.userId).map(x => x.postId!))
  const targetPostList = computed(() => {
    if (postSearched.value.length > 0) {
      const targetIds = postSearched.value.map(x => x.id).filter(y => userPostIds.value.includes(y))
      console.log('targetIds: ', targetIds)
      return postList.value.filter(y => y.isCategory || targetIds.includes(y.id))
    }
    return postList.value.filter(y => y.isCategory || userPostIds.value.includes(y.id))
  })
  // const leafIds = computed(() => new Set(...postList.value.filter(x => !x.isCategory).map(y => y.id)))

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
    console.log('postSearched: ', postSearched.value)
  }

  function searchSuggest(word?: string) {
    if (!word || word.trim().length < 1)
      return []
    const result = postSearch.autoSuggest(word, {
      fields: ['title'],
      fuzzy: 12,
      // filter(result) {
      //   return leafIds.value.has(result.id)
      // },
    }).slice(0, 5)
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
    postsToTree,
    targetPostList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot))

function isParentNode(parent: ITreePost, child: ITreePost): boolean {
  return parent.id === child.parentId
}
function insertChild(parent: ITreePost, child: ITreePost) {
  parent.children.push(child)
  parent.children.sort((a, b) => a.order - b.order)
}
function isNotEmptyTree(t: ITreePost): ITreePost | null {
  if (!t.isCategory)
    return t
  for (let i = 0; i < t.children.length; i++) {
    const c = t.children[i]
    const exist = isNotEmptyTree(c)
    if (exist)
      return exist
  }

  return null
}

function addTreeToParent(parent: ITreePost, target: ITreePost) {
  if (isParentNode(parent, target)) {
    insertChild(parent, target)
    return parent
  }

  for (let i = 0; i < parent.children.length; i++) {
    const existParent: any = addTreeToParent(parent.children[i], target)
    if (existParent)
      return existParent
  }
  return null
}

function postsToTree(posts: IPost[]) {
  const result: ITreePost[] = []
  for (let i = 0; i < posts.length; i++) {
    const data = posts[i]
    const currNode: ITreePost = { ...data, label: data.title, children: [] }

    if (!data.parentId) {
      // 최상위 노드일 경우 continue
      result.push(currNode)
      console.info('currNode is top', currNode.id)
      continue
    }

    const added = false
    for (let i = 0; i < result.length; i++) {
      // 기존 노드를 불러와 하위 노드들을 탐색, 추가한다.
      const exist = result[i]
      const parent = addTreeToParent(exist, currNode)
      if (parent)
        break
    }
    if (!added)
      console.log('not added any nodes', currNode.id)
  }
  // 빈트리 삭제
  for (let z = 0; z < result.length; z++) {
    const root = result[z]
    if (!isNotEmptyTree(root)) {
      console.log('empty tree delete: ', JSON.parse(JSON.stringify(result[z])))
      result.splice(z, 1)
    }
  }

  console.info('result of Treeeee: ', result)
  return result
}

// class TreeNode {
//   data: IPost
//   parent: TreeNode | null
//   children: TreeNode[]

//   constructor(data: IPost) {
//     this.data = data
//     this.parent = null
//     this.children = []
//   }

//   get isLeaf(): boolean {
//     return this.children.length < 1
//   }

//   insertChild(node: TreeNode) {
//     // this.parent = node;
//     this.children.push(node)
//     this.children.sort((a, b) => a.data.order - b.data.order)
//   }

//   static isParentNode(parent: TreeNode, child: TreeNode): boolean {
//     return parent.data.id === child.data.parentId
//   }

//   addTreeToParent(target: TreeNode): TreeNode | null {
//     if (TreeNode.isParentNode(this, target)) {
//       this.insertChild(target)
//       return this
//     }

//     for (let i = 0; i < this.children.length; i++) {
//       const existParent: any = this.children[i].addTreeToParent(target)
//       if (existParent)
//         return existParent
//     }
//     return null
//   }
// }
