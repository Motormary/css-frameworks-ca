import { cookies } from "next/headers"
import Form from 'next/form'
import { logout } from "@/src/actions/auth/logout"
import { Button } from "../ui/button"

export default async function Logout() {
  const cookie = await cookies()
  const hasToken = cookie.has("token")

  if (!hasToken) return null

  return <Form action={logout}><Button>Logout</Button></Form>
}
