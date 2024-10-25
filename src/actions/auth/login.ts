"use server"

import { apiPath } from "@/lib/consts"
import superFetch from "../fetch"
import { cookies } from "next/headers"
import { ErrorMessage, Fetch, UserData } from "./types"

export default async function Login(data: {
  email: string
  password: string
}): Promise<Fetch<UserData>> {
  if (!data.email || !data.password) {
    throw Error("email or password missing.")
  }

  const url = `${apiPath}/social/auth/login`
  const method = "POST"
  const request = {
    path: url,
    method: method,
    body: data,
  }

  let responseData

  const response = await superFetch<UserData>(request)
  if (response.success) {
    const cookie = await cookies()
    cookie.set("token", response.accessToken)
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
