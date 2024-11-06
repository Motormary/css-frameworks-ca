import { API_SOCIAL_PROFILES, apiPath } from "@/lib/consts"
import superFetch from "../fetch"
import { Profile } from "./types"
import { CacheOptions } from "../types"

export async function getProfile(name: string): Promise<Profile> {
  const url = `${API_SOCIAL_PROFILES}/${name}?_followers=true&_posts=true&_following=true`
  const method = "GET"
  const request = {
    url: url,
    method: method,
    cache: CacheOptions.ForceCache,
    tags: ["profile"],
    revalidate: 30,
  }

  const response = await superFetch(request)
  if (response?.success) {
    return response?.data
  }
  if (response?.data.errors[0].message) {
    throw new Error(response?.data.errors[0].message)
  }

  throw new Error(response?.data.statusText)
}
