import checkUser from "@/src/actions/auth/check-cookie"
import { getAllProfiles } from "@/src/actions/profile/get-all-profiles"
import { redirect } from "next/navigation"
import UserCard from "@/components/profile/user-card"
import { cookies } from "next/headers"
import { Profile } from "@/src/actions/profile/types"

export default async function ProfilesPage() {
  const auth = await checkUser()
  if (!auth) redirect("/")

  const cookie = await cookies()
  const currentUserProfile = JSON.parse(cookie.get("profile")?.value as string)
  const profiles = await getAllProfiles({ followers: true })

  return (
    <ol className="container grid h-fit grid-cols-1 gap-4 p-4 md:grid-cols-[repeat(auto-fit,minmax(270px,1fr))] lg:grid-cols-2">
      {profiles.map((profile, index) => {
        return (
          <UserCard
            following={profile.followers.some(
              (follower) => follower.name === currentUserProfile.name,
            )}
            key={profile.name}
            profile={profile}
          />
        )
      })}
    </ol>
  )
}
