import type { IPost } from './types'

export interface IUser {
  id: string
  name: string
  permissions: string[]
}
export interface IUserLogin extends IUser {
  pw: string
}
export interface IPermission {
  id: string
  userId: string
  menuId?: string
  postId?: string
}
export const USERS: IUserLogin[] = [
  {
    id: '1',
    name: 'admin',
    pw: 'qwer1234',
    permissions: ['admin'],
  }, {
    id: '2',
    name: 'worker',
    pw: '1',
    permissions: ['post.read'],
  },
]
export const PERMISSIONS: IPermission[] = [
  {
    id: 'worker.post.read',
    userId: '2',
    postId: '1-1',
  },
  {
    id: 'worker.post.read',
    userId: '2',
    postId: '1-3-1',
  },
  {
    id: 'worker.post.read',
    userId: '2',
    postId: '2-1',
  },
  {
    id: 'worker.post.read',
    userId: '2',
    postId: '2-2',
  },
  {
    id: 'worker.post.read',
    userId: '2',
    postId: '2-3',
  },
  {
    id: 'worker.post.read',
    userId: '2',
    postId: '2-5',
  },
]
export const MOCK_POST: IPost[] = [
  {
    id: '1',
    title: 'WIFI',
    content: '',
    order: 1,
    isCategory: true,
  },
  {
    parentId: '1',
    id: '1-1',
    title: '와이파이를 설치 해봅시다.',
    content: 'LAN을 연결 합니다.',
    order: 1,
    isCategory: false,
  },
  {
    parentId: '1',
    id: '1-2',
    title: '와이파이를 설치 해봅시다.',
    content: 'WAN을 연결 합니다.',
    order: 2,
    isCategory: false,
  },

  {
    parentId: '1',
    id: '1-3',
    title: 'WIFI 제거',
    content: '',
    order: 2,
    isCategory: true,
  },
  {
    parentId: '1-3',
    id: '1-3-1',
    title: '제거 절차',
    content: '제거를 하십시오.',
    order: 2,
    isCategory: false,
  },

  {
    id: '2',
    title: '현장방문',
    content: '',
    order: 1,
    isCategory: true,
  },
  {
    parentId: '2',
    id: '2-1',
    title: '현장 방문시 절차 (1)',
    content: '**반갑습니다**\n여러분의 교육을 맡게된 최성필입니다.',
    order: 1,
    isCategory: false,
  },
  {
    parentId: '2',
    id: '2-2',
    title: '현장 방문시 절차 (2)',
    content: '고객님께 안부 인사를 전하도록 합니다.\npart 3',
    order: 2,
    isCategory: false,
  },
  {
    parentId: '2',
    id: '2-3',
    title: '현장 방문시 절차(3)',
    content: '가격을 말씀드립니다 e.g  15,000원 선불입니다.',
    order: 12,
    isCategory: false,
  },
  {
    parentId: '2',
    id: '2-4',
    title: '현장 방문시 절차(4)',
    content: '배가 고픈데 혹시 남는 밥이 있을까 여쭙습니다.',
    order: 4,
    isCategory: false,
  },
  {
    parentId: '2',
    id: '2-5',
    title: '현장 방문시 절차(5)',
    content: '맛있게 밥을 먹으며, 김치는 없냐고 묻습니다.',
    order: 3,
    isCategory: false,
  },
]
