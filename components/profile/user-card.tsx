"use client"

import { Profile } from "@/src/actions/profile/types"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { LoaderIcon, User } from "lucide-react"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useState } from "react"
import { followProfile } from "@/src/actions/profile/follow"
import { handleApiErrors, printErrors, translateErrors } from "@/lib/api-error"
import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"
import { FollowButton } from "./follow-button"

export default function UserCard({
  profile,
  following,
}: {
  profile: Profile
  following: boolean
}) {

  return (
    <li
      key={profile.name}
      className="relative m-auto flex w-full min-w-[12rem] gap-4 rounded-md border p-4 hover:bg-muted/60 max-xs:flex-col max-xs:items-center"
    >
      <Link
        className="absolute inset-0 z-20"
        href={`/profile/${profile.name}`}
      ></Link>

      <span
        title={profile.name}
        className="relative z-50 w-full overflow-hidden truncate text-lg max-sm:text-center xs:hidden"
      >
        {profile.name}
      </span>
      {/* Avatar box */}
      <div className="flex flex-col items-center gap-2">
        <Avatar className="size-24 min-w-fit border border-border">
          <AvatarImage
            src={
              profile?.avatar?.url && profile?.avatar?.url !== ""
                ? profile.avatar?.url
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
          className="relative z-50 w-full overflow-hidden truncate text-lg max-xs:hidden max-xs:text-center"
        >
          {profile.name}
        </span>
        <div className="relative z-50 flex">
         <FollowButton profile={profile} following={following} />
        </div>
      </div>
    </li>
  )
}
