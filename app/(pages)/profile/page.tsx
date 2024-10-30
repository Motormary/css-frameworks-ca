/* eslint-disable @next/next/no-img-element */
import checkUser from "@/src/actions/auth/check-cookie"
import { getAllProfiles } from "@/src/actions/profile/get-all-profiles"
import Link from "next/link"
import { redirect } from "next/navigation"
import avatar from "assets/images/avatar.jpg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"

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
            <Avatar>
              <AvatarImage
                src={profile.avatar !== "" ? profile.avatar : "null"}
                alt="Avatar"
              />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <span>{profile._count.followers}</span>
            <span>{profile._count.posts}</span>
          </li>
        )
      })}
    </ol>
  )
}
