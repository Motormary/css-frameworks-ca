import { apiPath } from "@/lib/consts"
import superFetch from "../fetch"
import { Profile } from "./types"

export async function getAllProfiles(): Promise<Profile[]> {
  const url = `${apiPath}/social/profiles`
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
