import AuthForms from "@/components/auth/auth-forms"
import checkUser from "@/src/actions/auth/check-cookie"
import { redirect } from "next/navigation"

export default async function AuthPage() {
  const auth = await checkUser()
  if (auth) redirect("/feed")

  return (
    <div>
      <AuthForms />
    </div>
  )
}
