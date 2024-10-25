"use server"

import { cookies } from "next/headers"
import { ErrorMessage } from "./auth/types"

type SuperFetch<T> = {
  accessToken: string
  success: boolean
  data: T
  meta: any
  errors: ErrorMessage[]
  status: string
  statusCode: number
}

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
 * @returns A promise of type `SuperFetch<T>` containing the response data
 *
 */
export default async function superFetch<T>({
  method,
  path,
  body,
  disableCache = true,
  revalidate,
  tags,
}: {
  method: string
  path: string
  body?: any
  disableCache?: boolean
  revalidate?: number
  tags?: string[]
}): Promise<SuperFetch<T>> {
  if (!method || !path) throw new Error("Missing params")
  const cookie = await cookies()
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  // Check for token cookie
  const hasToken = cookie.has("token")
  if (hasToken) {
    // Add accessToken to headers from cookies
    const token = cookie.get("token")
    headers.append("Authorization", `Bearer ${token?.value as string}`)
  }

  /* Initial a next request */
  const cacheOption = disableCache ? "no-store" : "force-cache"
  const requestOptions: RequestInit = {
    method: method,
    headers,
    cache: cacheOption,
    next: {
      revalidate: revalidate, // Time to revalidate fetch request - SECONDS (3600 = 1 hour)
      tags: tags, // Add tags to the fetch request for targeted invalidation
    },
  }

  /* If there is a body, add it to the request */
  if (body) {
    requestOptions.body = JSON.stringify(body)
  }

  let responseData

  try {
    const response = await fetch(path, requestOptions)
    if (response.ok) {
      const data = await response.json()
      responseData = {
        success: true,
        ...data,
      }
    } else {
      const data = await response.json()
      console.error("Something went wrong:", {
        error: data.errors.map(
          (error: ErrorMessage & { code?: string; path?: string[] }) => {
            return {
              code: error?.code ?? undefined, // e.g "invalid type"
              message: error.message, // e.g "required"
              path: error?.path
                ? error?.path.map((path) => path).join(", ")
                : undefined, // Property
            }
          }
        ),
        status: data.status,
        statusCode: data.statusCode,
      })
      responseData = {
        success: false,
        ...data,
      }
    }
  } catch (e) {
    console.error("SuperFetch >> Error:", e)
    throw new Error("SuperFetch >> Error. Check params")
  }

  return responseData
}
