"use server"
import { API_SOCIAL_POSTS, apiPath } from "@/lib/consts"
import { PostType } from "./types"
import superFetch from "../fetch"
import { z } from "zod"
import { commentSchema } from "@/components/post/comment"
import { CommentType } from "../types"
import { ErrorMessage } from "../auth/types"
import { translateErrors } from "@/lib/api-error"
import { revalidateTag } from "next/cache"

export default async function commentOnPost({
  id,
  body,
}: {
  id: number
  body: z.infer<typeof commentSchema>
}): Promise<CommentType & { errors: ErrorMessage[] }> {
  if (!id || !body) throw new Error("Missing params")
  const method = "POST"
  const url = `${API_SOCIAL_POSTS}/${id}/comment`
  const request = {
    method: method,
    url: url,
    body: body,
  }

  const response = await superFetch(request)


  if (response?.data.errors) {
    throw new Error(
      `Error creating comment: ${JSON.stringify(translateErrors(response?.data.errors))} `,
    )
  }

  return response?.data
}
