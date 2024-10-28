"use server"

import { cookies } from "next/headers"

export async function deleteCookies(keys: string[]) {
  const cookie = await cookies()

  try {
    keys.forEach((key) => {
      const hasKey = cookie.has(key)
      if (hasKey) {
        cookie.delete(key)
      }
    })
  } catch (e) {
    console.error(e)
    throw Error("Something went wrong.")
  }
}
