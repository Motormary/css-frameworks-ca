"use client"

import { UserData } from "@/src/actions/auth/types"
import { Profile } from "@/src/actions/profile/types"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { LoaderIcon, User } from "lucide-react"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useState } from "react"

export default function UserCard({ profile }: { profile: Profile }) {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <li
      key={profile.name}
      className="relative m-auto  flex w-full min-w-[12rem] gap-4 rounded-md border p-4 hover:bg-muted/60 max-xs:flex-col max-xs:items-center">
      <Link
        className="absolute inset-0 z-20"
        href={`/profile/${profile.name}`}></Link>

      <span
        title={profile.name}
        className="relative z-50 w-full overflow-hidden truncate text-lg max-sm:text-center xs:hidden">
        {profile.name}
      </span>
      {/* Avatar box */}
      <div className="flex flex-col items-center gap-2">
        <Avatar className="size-24 min-w-fit border border-border">
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
        {/* Info Box */}
        <div className="col-span-full flex gap-2">
          {/* Followers */}
          <span className="text-nowrap rounded-full border px-2 py-1 text-sm">
            {profile._count.followers} Followers
          </span>
          {/* Posts */}
          <span className="text-nowrap rounded-full border px-2 py-1 text-sm">
            {profile._count.posts} Posts
          </span>
        </div>
      </div>

      {/* Name */}
      <div className="flex w-full cursor-default flex-col justify-between gap-4 overflow-hidden max-xs:text-center">
        <span
          title={profile.name}
          className="relative z-50 w-full overflow-hidden truncate text-lg max-xs:hidden max-xs:text-center">
          {profile.name}
        </span>
        <div className="relative z-50 flex">
          <Button
            disabled={isLoading}
            onClick={(e) => {
              setIsLoading(true)
              toast.success(`You're now following ${profile.name}`)
              setTimeout(() => setIsLoading(false), 500)
            }}
            variant="outline"
            className="h-8 w-full rounded-full">
            {isLoading ? (
              <LoaderIcon className="animate-spin duration-2000" />
            ) : (
              "Follow"
            )}
          </Button>
        </div>
      </div>
    </li>
  )
}
