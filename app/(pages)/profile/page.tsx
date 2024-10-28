import checkUser from "@/src/actions/auth/check-cookie"
import { getAllProfiles } from "@/src/actions/profile/get-all-profiles"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function ProfilesPage() {
  const auth = await checkUser()
  if (!auth) redirect("/")
    
  const profiles = await getAllProfiles()
  return (
    <ol className="space-y-1">
      {profiles.map((profile, index) => {
        return (
          <li key={profile.name}>
            <Link href={`/profile/${profile.name}`}>{profile.name}</Link>
          </li>
        )
      })}
    </ol>
  )
}
