import { apiPath } from "@/lib/consts"
import superFetch from "../fetch"

export async function getProfile(name: string): Promise<Profile> {
  const url = `${apiPath}/social/profiles/${name}?&_followers=true&_posts=true&_following=true`
  const method = "GET"
  const request = {
    url: url,
    method: method,
  }

  const response = await superFetch(request)

  if (response.success) {
    return response.data
  }

  throw new Error(response.data.statusText)
}
