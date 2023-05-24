export interface IPost {
  id: string
  title: string
  content: string
  order: number
  parentId?: string
  isCategory: boolean
  // createDate: string
  // updateDate: string
}
