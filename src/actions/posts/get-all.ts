"use server"

import { API_SOCIAL_POSTS, apiPath } from "@/lib/consts"
import superFetch from "@/src/actions/fetch"
import { PostType } from "./types"

export async function getPosts({limit = 20, offset = 0, query}: {
  limit?: number
  offset?: number
  query: string
}): Promise<PostType[]> {
  const method = "GET"
  const url = `${API_SOCIAL_POSTS}?limit=${limit}&offset=${offset}&_reactions=true&_author=true` // search not working?
  const request = {
    method: method,
    url: url,
  }
  const response = await superFetch(request)

  if (response.success) {
    return response.data
  }

  throw new Error(response.data.status)
}
