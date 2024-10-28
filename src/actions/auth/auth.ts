"use server"

import { cookies } from "next/headers"
import superFetch from "../fetch"
import { Fetch, UserData } from "./types"
import { apiPath } from "@/lib/consts"

async function authRequest<T>(login: boolean, data: object): Promise<Fetch<T>> {
  if (Object.values(data).some((val) => !val)) {
    throw Error("One or more required parameters are missing.")
  }
  const url = login
    ? `${apiPath}/social/auth/login`
    : `${apiPath}/social/auth/register`

  const request = {
    url: url,
    method: "POST",
    body: data,
  }

  const response = await superFetch(request)
  if (response.success && login) {
    const cookie = await cookies()
    cookie.set("token", response.data.accessToken)
    delete response.data.accessToken
    cookie.set("profile", JSON.stringify(response.data))
  }

  return {
    success: response.success,
    data: response.success ? response.data : response.data.errors,
  }
}

export async function Login(data: {
  email: string
  password: string
}): Promise<Fetch<UserData>> {
  return authRequest<UserData>(true, data)
}

export async function Register(data: {
  name: string
  email: string
  password: string
}): Promise<Fetch<UserData>> {
  return authRequest<UserData>(false, data)
}
