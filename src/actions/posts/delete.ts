"use server"

import { API_SOCIAL_POSTS } from "@/lib/consts"
import superFetch from "@/src/actions/fetch"
import { PostType } from "./types"

export async function deletePost(id: string | number) {
  const method = "DELETE"
  const url = `${API_SOCIAL_POSTS}/${id}`
  const request = {
    method: method,
    url: url,
  }
  await superFetch(request)

}
