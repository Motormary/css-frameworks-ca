import { API_SOCIAL_PROFILES, apiPath } from "@/lib/consts"
import superFetch from "../fetch"
import { Profile } from "./types"
import { ErrorMessage } from "../auth/types"

export async function followProfile(
  name: string,
  follow: boolean,
): Promise<Profile & { errors: ErrorMessage[] }> {
  const url = `${API_SOCIAL_PROFILES}/${name}/${follow ? "follow" : "unfollow"}`
  const method = "PUT"
  const request = {
    url: url,
    method: method,
  }

  const response = await superFetch(request)
  return response?.data
}