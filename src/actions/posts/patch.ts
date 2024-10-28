"use server"
import { apiPath } from "@/lib/consts"
import { PostType } from "./types"
import superFetch from "../fetch"

export default async function patchPost({
  id,
  data,
}: {
  id: number
  data: Partial<PostType>
}): Promise<PostType> {
  if (!id || !data) throw new Error("Missing params")
  const method = "PATCH"
  const url = `${apiPath}/social/posts/${id}`
  const request = {
    method: method,
    url: url,
    body: data
  }
  const response = await superFetch(request)

  if (response.success) {
    return response.data
  }

  throw new Error(response.data.status)
}
