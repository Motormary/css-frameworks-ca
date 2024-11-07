/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User } from "lucide-react"
import { cookies } from "next/headers"
import { getProfile } from "../../src/actions/profile/get-profile"
import Pill from "@/components/profile/pill"

export default async function ProfileCard({ params }: { params: string }) {
  const cookie = await cookies()
  const userCookie = JSON.parse(cookie.get("profile")?.value as string)
  const isUser = userCookie.name.toLowerCase() === params.toLowerCase()
  const profile = await getProfile(params)

  if (!profile) return null
  return (
    <Card className="flex h-fit flex-col items-center border-none max-sm:shadow-none lg:w-fit">
      <CardHeader>
        <CardTitle>{profile.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Avatar className="h-full w-full bg-background sm:h-52 sm:w-52">
              <AvatarImage
                className="object-cover"
                src={
                  profile?.avatar?.url !== "" ? profile?.avatar?.url : "null"
                }
                alt="Avatar"
              />
              <AvatarFallback className="w-[80vw]">
                <User className="h-full w-full" />
              </AvatarFallback>
            </Avatar>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="sr-only">{profile.name}</DialogTitle>
            </DialogHeader>
            <img
              className="h-full w-full object-fill"
              src={
                profile.avatar?.url && profile.avatar?.url !== ""
                  ? profile.avatar?.url
                  : undefined
              }
              alt="Profile Avatar"
            />
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="flex flex-col gap-6">
        <div className="flex justify-center gap-2 text-nowrap max-md:flex-wrap">
          <Pill>Followers: {profile.followers.length}</Pill>
          <Pill>Following: {profile.following.length}</Pill>
          <Pill>Posts: {profile.posts.length}</Pill>
        </div>
        {!isUser ? (
          <Button variant="outline" className="flex w-full rounded-full">
            Follow
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  )
}
