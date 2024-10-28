import Link from "next/link"
import { Avatar, AvatarImage } from "../ui/avatar"
import { SidebarMenuButton } from "../ui/sidebar"
import { KeyRound } from "lucide-react"
import { cookies } from "next/headers"

export default async function SidebarProfile() {
  const cookie = await cookies()
  const hasProfile = cookie.has("profile")
  let profile

  if (!hasProfile) {
    profile = null
  } else if (hasProfile) {
    profile = JSON.parse(cookie.get("profile")?.value as string)
  }

  if (!profile)
    return (
      <SidebarMenuButton asChild>
        <Link href="/">
          <KeyRound className="size-4" />
          Login
        </Link>
      </SidebarMenuButton>
    )

  return (
    <Link
      href={profile ? `/profile/${profile?.name}` : "/"}
      className="flex items-center gap-2 py-1.5 text-left text-sm">
      <Avatar className="size-8">
        <AvatarImage
          src={profile ? profile?.avatar : "https://github.com/shadcn.png"}
          alt="Avatar"
        />
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">
          {profile ? profile?.name : "Username"}
        </span>
        <span className="truncate text-xs">
          {profile ? profile?.email : "Email"}
        </span>
      </div>
    </Link>
  )
}
