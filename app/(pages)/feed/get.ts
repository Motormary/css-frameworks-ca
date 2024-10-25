"use server"

import { apiPath } from "@/lib/consts"
import superFetch from "@/src/actions/fetch"
import { cookies } from "next/headers"

export async function getPosts(limit = 20, offset = 0) {
  const method = "GET"
  const url =  `${apiPath}/social/posts?limit=${limit}&offset=${offset}&_reactions=true&_author=true&_comments=true`
  const request = {
    method: method, 
    url: url
  }
  const response = await superFetch<any>(request
  )

  if (response.success) {
    return response
  }

  throw new Error(response.data.status)
}
