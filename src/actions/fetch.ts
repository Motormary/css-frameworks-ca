"use server"

import { cookies } from "next/headers"
import { translateErrors } from "@/lib/api-error"
import { CacheOptions } from "./types"

/**
 * A helper function for making server-side API calls with headers, token handling,
 * and cache configuration options. Throws an error for missing parameters or failed requests.
 *
 * @param method - HTTP method to use for the request (GET, POST, etc.)
 * @param path - API endpoint path to request
 * @param body - Optional request body to send with POST/PUT requests
 * @param disableCache - Flag to disable caching (default: true)
 * @param revalidate - Optional number of seconds to revalidate the cache
 * @param tags - Optional array of cache tags for targeted invalidation
 *
 */
export default async function superFetch({
  method,
  url,
  body,
  cache,
  revalidate,
  tags,
}: {
  method: string
  url: string
  body?: any
  cache?: CacheOptions
  revalidate?: number
  tags?: string[]
}) {
  if (!method || !url) throw new Error("Missing params")
  const cookie = await cookies()
  const headers = new Headers()
  
  // Check for token cookie
  const hasToken = cookie.has("token")
  if (hasToken) {
    // Add accessToken to headers from cookies
    const token = cookie.get("token")
    headers.append("Authorization", `Bearer ${token?.value as string}`)
  }

  /* Initial a next request */
  const cacheOption = cache ?? "no-store"
  const requestOptions: RequestInit = {
    method: method,
    headers,
    cache: !revalidate ? cacheOption : undefined,
    next: {
      revalidate: revalidate, // Time to revalidate fetch request - SECONDS (3600 = 1 hour)
      tags: tags, // Add tags to the fetch request for targeted invalidation
    },
  }

  /* If there is a body, add it to the request */
  if (body) {
    headers.append("Content-Type", "application/json")
    requestOptions.body = JSON.stringify(body)
  }

  let responseData

  try {
    const response = await fetch(url, requestOptions)
    if (response.ok) {
      const data = await response.json()
      responseData = {
        success: true,
        data: data,
      }
    } else {
      const data = await response.json()
      console.error("Something went wrong:", {
        error: translateErrors(data.errors),
        status: data.status,
        statusCode: data.statusCode,
      })
      responseData = {
        success: false,
        data: data,
      }
    }
  } catch (e) {
    console.error("SuperFetch >> Error:", e)
    throw new Error("SuperFetch >> Error. Check params")
  }

  return responseData
}
