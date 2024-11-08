"use server"
import { apiPath } from "@/lib/consts"
import { PostType } from "./types"
import superFetch from "../fetch"

export default async function reactToPost({
  id,
  symbol,
}: {
  id: number
  symbol: string
}): Promise<PostType> {
  if (!id || !symbol) throw new Error("Missing params")
  const method = "PUT"
  const url = `${apiPath}/social/posts/${id}/react/${symbol}`
  const request = {
    method: method,
    url: url,
    body: ""
  }

  const response = await superFetch(request)

  if (response.success) {
    return response.data
  }

  throw new Error(response.data.status)
}
