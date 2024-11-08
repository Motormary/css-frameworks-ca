"use server"

import { cookies } from "next/headers"

export default async function getCurrentUser() {
  const cookie = await cookies()
  const currentUserProfile = JSON.parse(cookie.get("profile")?.value as string)
  if (!currentUserProfile) throw new Error("No current user saved")
  return currentUserProfile
}
