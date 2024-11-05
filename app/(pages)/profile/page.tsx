/* eslint-disable @next/next/no-img-element */
import checkUser from "@/src/actions/auth/check-cookie"
import { getAllProfiles } from "@/src/actions/profile/get-all-profiles"
import { redirect } from "next/navigation"
import UserCard from "@/components/profile/user-card"

export default async function ProfilesPage() {
  const auth = await checkUser()
  if (!auth) redirect("/")

  const profiles = await getAllProfiles()
  return (
    <ol className="container h-fit grid grid-cols-1 gap-4 p-4 md:grid-cols-[repeat(auto-fit,minmax(270px,1fr))] lg:grid-cols-2">
      {profiles.map((profile, index) => {
        return <UserCard key={profile.name} profile={profile} />
      })}
    </ol>
  )
}
