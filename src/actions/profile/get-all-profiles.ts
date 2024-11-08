import { API_SOCIAL_PROFILES } from "@/lib/consts"
import superFetch from "../fetch"
import { Profile } from "./types"

export async function getAllProfiles({
  following,
  followers,
}: {
  following?: boolean
  followers?: boolean
}): Promise<Profile[]> {
  const url =
    API_SOCIAL_PROFILES + `?_following=${following}&_followers=${followers}`
  const method = "GET"
  const request = {
    url: url,
    method: method,
  }

  const response = await superFetch(request)

  if (response?.success) {
    return response?.data
  }

  throw new Error(response?.data.statusText)
}
