import LoginCard from "@/components/login/login-card"
import checkUser from "@/src/actions/auth/check-cookie"
import { redirect } from "next/navigation"

export default async function AuthPage() {
  const auth = await checkUser()
  if (auth) redirect("/feed")

  return (
    <div>
      <LoginCard />
    </div>
  )
}
