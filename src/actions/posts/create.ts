"use server"
import { API_SOCIAL_POSTS, apiPath } from "@/lib/consts"
import { PostType } from "./types"
import superFetch from "../fetch"
import { revalidatePath } from "next/cache"
import { ErrorMessage, Fetch } from "../auth/types"

export default async function createPost(
  data: Partial<PostType>
): Promise<Fetch<PostType & ErrorMessage[]>> {
  if (!data) throw new Error("Missing params")
  const method = "POST"
  const url = API_SOCIAL_POSTS
  const request = {
    method: method,
    url: url,
    body: data,
  }

  const response = await superFetch(request)
  if (response?.success) revalidatePath("/feed")
  return {
    success: response?.success,
    data: response?.success ? response?.data : response?.data.errors,
  }
}
