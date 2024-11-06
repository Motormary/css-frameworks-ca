"use server"
import { API_SOCIAL_POSTS, apiPath } from "@/lib/consts"
import { PostType } from "./types"
import superFetch from "../fetch"
import { ErrorMessage, Fetch } from "../auth/types"
import { revalidatePath } from "next/cache"

export default async function patchPost({
  id,
  data,
}: {
  id: number
  data: Partial<PostType>
}): Promise<Fetch<PostType & ErrorMessage[]>> {
  if (!id || !data) throw new Error("Missing params")
  const method = "PUT"
  const url = `${API_SOCIAL_POSTS}/${id}`
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
