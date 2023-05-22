import { type ViteSSGContext } from 'vite-ssg'
export * from './post'

export type UserModule = (ctx: ViteSSGContext) => void
