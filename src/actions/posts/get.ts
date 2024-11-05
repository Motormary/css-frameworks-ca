"use server"

import { apiPath } from "@/lib/consts"
import superFetch from "@/src/actions/fetch"
import { PostType } from "./types"

export async function getPost(id: string | number): Promise<PostType> {
  const method = "GET"
  const url = `${apiPath}/social/posts/${id}?_author=true&_comments=true&_reactions=true`
  const request = {
    method: method,
    url: url,
  }
  const response = await superFetch(request)

  return response.data
}
