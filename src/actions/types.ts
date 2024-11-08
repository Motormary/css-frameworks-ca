import { UserData } from "./auth/types"

export enum CacheOptions {
  NoStore = "no-store",
  ForceCache = "force-cache",
}

export type CommentType = {
  author: Partial<UserData>
  body: string
  created: string
  id: number
  owner: string
  postId: number
  replyToId: number | null
}

export type metaType = {
  isFirstPage: boolean
  isLastPage: boolean
  currentPage: number
  previousPage: number | null
  nextPage: number | null
  pageCount: number
  totalCount: number
}
