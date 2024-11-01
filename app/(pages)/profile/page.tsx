/* eslint-disable @next/next/no-img-element */
import checkUser from "@/src/actions/auth/check-cookie"
import { getAllProfiles } from "@/src/actions/profile/get-all-profiles"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Newspaper, User, UserPlus } from "lucide-react"
import avatar from "assets/icons/user.svg"

export default async function ProfilesPage() {
  const auth = await checkUser()
  if (!auth) redirect("/")

  const profiles = await getAllProfiles()
  return (
    <ol className="flex flex-col gap-4 p-4">
      {profiles.map((profile, index) => {
        return (
          <li
            key={profile.name}
            // flex flex-col items-center justify-center
            className="relative grid grid-rows-3 grid-cols-3 items-center justify-center space-x-4 space-y-2 m-auto border p-4 rounded-md min-w-[10rem] hover:bg-muted">
            <Avatar className="row-span-3 col-span-1 size-24">
              <AvatarImage
                src={
                  profile?.avatar && profile?.avatar !== ""
                    ? profile.avatar
                    : undefined
                }
                alt="Avatar"
              />
              <AvatarFallback>
                <User className="size-20" />
              </AvatarFallback>
            </Avatar>
            <Link
              className="absolute inset-0"
              href={`/profile/${profile.name}`}></Link>
            <span className="col-span-2 text-lg">{profile.name}</span>
            <div className="flex gap-2 col-span-2">
              <span className="flex gap-2 border rounded-full py-1 px-2">
                <UserPlus /> {profile._count.followers}
              </span>
              <span className="flex items-center gap-2 col-span-2">
                <Newspaper />
                {profile._count.posts}
              </span>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
