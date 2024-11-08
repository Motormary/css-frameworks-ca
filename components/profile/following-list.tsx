import { UserData } from "@/src/actions/auth/types"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import Img from "../post/image"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"
import { FollowButton } from "./follow-button"
import getCurrentUser from "../auth/get-current-user"
import { getProfile } from "@/src/actions/profile/get-profile"

export async function UserCard({ user }: { user: UserData }) {
  const localUser = await getCurrentUser()
  const serverUser = await getProfile(localUser.name)
  const isFollowing = serverUser.following.some(
    (followee) => followee.name === user.name,
  )

  return (
    <Card className="relative overflow-hidden hover:bg-muted/50">
      <Link
        className="absolute inset-0 z-10"
        href={`/profile/${user.name}`}
      ></Link>
      <CardHeader className="p-0">
        <div className="relative h-32">
          <Img
            src={user.banner.url}
            alt={`${user.name}'s banner`}
            className="h-full max-h-32 w-full object-cover"
          />
          <Avatar className="absolute bottom-0 left-4 h-20 w-20 translate-y-1/2 transform border-4 border-background">
            <AvatarImage src={user.avatar.url} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="pb-4 pt-12">
        <div className="flex items-start justify-between">
          <div className="truncate">
            <h3 className="truncate text-lg font-semibold">{user.name}</h3>
            <p className="truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="relative z-20">
        <FollowButton profile={user as any} following={isFollowing} />
      </CardFooter>
    </Card>
  )
}
