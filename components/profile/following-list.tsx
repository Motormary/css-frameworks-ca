import { UserData } from "@/src/actions/auth/types"
import { Card, CardContent, CardHeader } from "../ui/card"
import Img from "../post/image"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"

export async function FollowingList({ follower }: { follower: UserData }) {

  // TODO: Add follow button
  return (
    <Card className="relative overflow-hidden hover:bg-muted/50">
      <Link
        className="absolute inset-0 z-10"
        href={`/profile/${follower.name}`}
      ></Link>
      <CardHeader className="p-0">
        <div className="relative h-32">
          <Img
            src={follower.banner.url}
            alt={`${follower.name}'s banner`}
            className="h-full max-h-32 w-full object-cover"
          />
          <Avatar className="absolute bottom-0 left-4 h-20 w-20 translate-y-1/2 transform border-4 border-background">
            <AvatarImage src={follower.avatar.url} alt={follower.name} />
            <AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="pb-4 pt-12">
        <div className="flex items-start justify-between">
          <div className="truncate">
            <h3 className="truncate text-lg font-semibold">{follower.name}</h3>
            <p className="truncate text-sm text-muted-foreground">{follower.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
