"use server"

import { cookies } from "next/headers"

export default async function checkUser() {
  const cookie = await cookies()
  const hasToken = cookie.has("token")

  return hasToken
}
