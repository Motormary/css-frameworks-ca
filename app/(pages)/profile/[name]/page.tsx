/* eslint-disable @next/next/no-img-element */
import checkUser from "@/src/actions/auth/check-cookie"
import { getProfile } from "@/src/actions/profile/get-profile"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EditIcon, User } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import Pill from "@/components/profile/pill"
import Img from "@/components/post/image"
import Link from "next/link"
import { cookies } from "next/headers"
import { PostDialog } from "@/components/post/create-post-dialog"
import { DeletePost } from "@/components/post/delete-post-dialog"
import PostDropdown from "@/components/post/post-dropdown-menu"
import { Separator } from "@/components/ui/separator"

type Params = Promise<{ name: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function ProfilePage(props: {
  params: Params
  searchParams: SearchParams
}) {
  const auth = await checkUser()
  if (!auth) redirect("/")
  const cookie = await cookies()
  const userCookie = JSON.parse(cookie.get("profile")?.value as string)
  const params = await props.params
  const isUser = userCookie.name.toLowerCase() === params.name.toLowerCase()
  const profile = await getProfile(params.name)

  if (!profile) return null

  return (
    <div className="container mx-4 flex w-full gap-4 max-lg:flex-col">
      <Card className="flex h-fit flex-col items-center border-none max-sm:shadow-none lg:w-fit">
        <CardHeader>
          <CardTitle>{profile.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Avatar className="h-full w-full sm:h-52 sm:w-52">
                <AvatarImage
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
      <Separator orientation="vertical" className="max-lg:hidden" />
      <div className="flex h-fit w-full flex-col gap-4">
        {profile.posts.length ? (
          profile.posts.map((post) => (
            <Card
              key={post.id}
              className="group relative border-none pt-5 hover:bg-muted/80"
            >
              <Link
                href={`/feed/${post.id}`}
                className="absolute inset-0 z-10 cursor-default"
              ></Link>
              <CardContent className="flex gap-4 p-4 max-lg:flex-col">
                {post.media?.url ? (
                  <div className="h-full min-w-48 lg:max-w-48">
                    <Img
                      className="h-full w-full rounded-md border border-muted object-cover"
                      src={post.media?.url}
                      alt="Post Image"
                    />
                  </div>
                ) : null}
                <div>
                  <CardTitle>{post.title}</CardTitle>
                  <div className="my-2 flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Pill key={tag + index + post.id}>{tag}</Pill>
                    ))}
                  </div>
                  <CardDescription>{post.body}</CardDescription>
                </div>
                <div className="absolute right-[10px] top-[10px] z-20">
                  <PostDropdown
                    className="opacity-0 group-hover:visible group-hover:opacity-100"
                    post={post}
                  />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="max-md:w-full max-md:text-center">
            No posts to display.
          </div>
        )}
      </div>
    </div>
  )
}
