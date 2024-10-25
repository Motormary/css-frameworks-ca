"use server"

import { apiPath } from "@/lib/consts"
import superFetch from "../fetch"
import { cookies } from "next/headers"
import { ErrorMessage, Fetch, UserData } from "./types"

export default async function Register(data: {
  name: string
  email: string
  password: string
}): Promise<Fetch<UserData>> {
  if (!data.email || !data.password || !data.name) {
    throw Error("One or more params missing.")
  }

  const url = `${apiPath}/social/auth/register`
  const method = "POST"
  const request = {
    url: url,
    method: method,
    body: data,
  }

  let responseData

  const response = await superFetch<UserData>(request)

  if (response.success) {
    responseData = {
      success: true,
      data: response.data,
    }
  } else {
    responseData = {
      success: false,
      data: response.errors,
    }
  }

  return responseData
}
