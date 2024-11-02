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
      className="relative w-full  flex max-xs:flex-col max-xs:items-center gap-4 m-auto border p-4 rounded-md min-w-[12rem] hover:bg-muted/60">
      <Link
        className="absolute inset-0 z-20"
        href={`/profile/${profile.name}`}></Link>

      <span
        title={profile.name}
        className="relative text-lg overflow-hidden max-sm:text-center w-full truncate xs:hidden z-50">
        {profile.name}
      </span>
      {/* Avatar box */}
      <div className="flex flex-col gap-2 items-center">
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
        <div className="flex gap-2 col-span-full">
          {/* Followers */}
          <span className="border rounded-full py-1 px-2 text-sm text-nowrap">
            {profile._count.followers} Followers
          </span>
          {/* Posts */}
          <span className="border rounded-full py-1 px-2 text-sm text-nowrap">
            {profile._count.posts} Posts
          </span>
        </div>
      </div>

      {/* Name */}
      <div className="w-full flex flex-col justify-between gap-4 max-xs:text-center overflow-hidden cursor-default">
        <span
          title={profile.name}
          className="relative text-lg overflow-hidden max-xs:text-center w-full truncate max-xs:hidden z-50">
          {profile.name}
        </span>
        <div className="relative flex z-50">
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
