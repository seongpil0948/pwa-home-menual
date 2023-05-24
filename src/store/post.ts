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
    postsToTree,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot))

const MOCK_POST: IPost[] = [
  {
    id: '1',
    title: 'WIFI',
    content: '',
    order: 1,
  },
  {
    parentId: '1',
    id: '1-1',
    title: '와이파이를 설치 해봅시다.',
    content: 'LAN을 연결 합니다.',
    order: 1,
  },
  {
    parentId: '1',
    id: '1-2',
    title: '와이파이를 설치 해봅시다.',
    content: 'WAN을 연결 합니다.',
    order: 2,
  },

  {
    parentId: '1',
    id: '1-3',
    title: 'WIFI 제거',
    content: '',
    order: 2,
  },
  {
    parentId: '1-3',
    id: '1-3-1',
    title: '제거 절차',
    content: '제거를 하십시오.',
    order: 2,
  },

  {
    id: '2',
    title: '현장방문',
    content: '',
    order: 1,
  },
  {
    parentId: '2',
    id: '2-1',
    title: '현장 방문시 절차 (1)',
    content: '**반갑습니다**\n여러분의 교육을 맡게된 최성필입니다.',
    order: 1,
  },
  {
    parentId: '2',
    id: '2-2',
    title: '현장 방문시 절차 (2)',
    content: '고객님께 안부 인사를 전하도록 합니다.\npart 3',
    order: 2,
  },
  {
    parentId: '2',
    id: '2-3',
    title: '현장 방문시 절차(3)',
    content: '가격을 말씀드립니다 e.g  15,000원 선불입니다.',
    order: 12,
  },
  {
    parentId: '2',
    id: '2-4',
    title: '현장 방문시 절차(4)',
    content: '배가 고픈데 혹시 남는 밥이 있을까 여쭙습니다.',
    order: 4,
  },
  {
    parentId: '2',
    id: '2-5',
    title: '현장 방문시 절차(5)',
    content: '맛있게 밥을 먹으며, 김치는 없냐고 묻습니다.',
    order: 3,
  },
]
interface TreePost extends IPost {
  parent?: TreePost
  label: string
  children: TreePost[]
}
function isParentNode(parent: TreePost, child: TreePost): boolean {
  return parent.id === child.parentId
}
function insertChild(parent: TreePost, child: TreePost) {
  parent.children.push(child)
  parent.children.sort((a, b) => a.order - b.order)
}

function addTreeToParent(parent: TreePost, target: TreePost) {
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
  const result: TreePost[] = []
  for (let i = 0; i < posts.length; i++) {
    const data = posts[i]
    const currNode: TreePost = { ...data, label: data.title, children: [] }

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
