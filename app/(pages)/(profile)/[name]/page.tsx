import checkUser from "@/src/actions/auth/check-cookie"
import { getProfile } from "@/src/actions/profile/get-profile"
import { redirect } from "next/navigation"

type Params = Promise<{ name: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function ProfilePage(props: {
  params: Params
  searchParams: SearchParams
}) {
  const auth = await checkUser()
  if (!auth) redirect("/")

  const params = await props.params
  const searchParams = await props.searchParams

  const profile = await getProfile(params.name)

  return (
    <div>
      <p>Profile</p>
    </div>
  )
}
