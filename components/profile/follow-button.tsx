"use client"

import { Profile } from "@/src/actions/profile/types"
import { Button } from "../ui/button"
import { useState } from "react"
import { followProfile } from "@/src/actions/profile/follow"
import { handleApiErrors } from "@/lib/api-error"
import { toast } from "sonner"
import { LoaderIcon } from "lucide-react"

export function FollowButton({
  profile,
  following,
}: {
  profile: Profile
  following: boolean
}) {
  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <Button
      disabled={isLoading}
      onClick={async (e) => {
        setIsLoading(true)
        const response = await followProfile(
          profile.name,
          following ? false : true,
        )
        if (response.errors) {
          handleApiErrors(response.errors)
        } else {
          const message = !following
            ? `You're now following ${profile.name}`
            : `You've unfollowed ${profile.name}`
          toast.success(message)
        }
        setIsLoading(false)
      }}
      variant={!following ? "secondary" : "outline"}
      className="h-8 w-full rounded-full"
    >
      {isLoading ? (
        <LoaderIcon className="animate-spin duration-2000" />
      ) : following ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </Button>
  )
}
