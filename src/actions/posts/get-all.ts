"use server"

import { apiPath } from "@/lib/consts"
import superFetch from "@/src/actions/fetch"
import { Post } from "./types"

export async function getPosts(limit = 20, offset = 0): Promise<Post[]> {
  const method = "GET"
  const url = `${apiPath}/social/posts?limit=${limit}&offset=${offset}&_reactions=true&_author=true&_comments=true`
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
