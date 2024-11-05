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
  const response = await superFetch(request)
  if (response.data) {
    if (response.data.errors) throw new Error("Something went wrong")
  }
}
