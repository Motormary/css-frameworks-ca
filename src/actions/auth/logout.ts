"use server"

import { redirect } from "next/navigation"
import { deleteCookies } from "./delete-cookies"

export async function logout() {
  const userCookies = ["token", "profile"]
  await deleteCookies(userCookies)
  redirect("/")
}
