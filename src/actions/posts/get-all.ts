"use server"

import { API_SOCIAL_POSTS, apiPath } from "@/lib/consts"
import superFetch from "@/src/actions/fetch"
import { PostType } from "./types"

export async function getPosts({
  limit = 20,
  offset = 0,
  query,
  page = 1,
  sort = "desc"
}: {
  limit?: number
  offset?: number
  query?: string
  page?: number
  sort?: string
}): Promise<{
  data: PostType[],
  meta: any
}> {
  const method = "GET"
  const url = `${API_SOCIAL_POSTS}/${query ? `search?q=${query}&` : "?"}limit=${limit}&sortOrder=${sort}&offset=${offset}&_reactions=true&_author=true`
  const request = {
    method: method,
    url: url,
  }
  const response = await superFetch(request)

  if (response?.success) {
    return {
      data: response?.data,
      meta: response?.meta,
    }
  }

  throw new Error(response?.data.status)
}
