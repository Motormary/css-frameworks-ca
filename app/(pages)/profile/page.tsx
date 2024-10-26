import checkUser from "@/src/actions/auth/check-cookie"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const auth = await checkUser()
  if (!auth) redirect("/")

  return (
    <div>
      <p>Profile</p>
    </div>
  )
}
