import { API_SOCIAL_PROFILES, apiPath } from "@/lib/consts"
import superFetch from "../fetch"
import { Profile } from "./types"

export async function getAllProfiles(): Promise<Profile[]> {
  const url = API_SOCIAL_PROFILES
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
