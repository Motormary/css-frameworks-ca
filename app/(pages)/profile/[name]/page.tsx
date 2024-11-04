/* eslint-disable @next/next/no-img-element */
import checkUser from "@/src/actions/auth/check-cookie"
import { getProfile } from "@/src/actions/profile/get-profile"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Post from "@/components/post/post"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"

type Params = Promise<{ name: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function ProfilePage(props: {
  params: Params
  searchParams: SearchParams
}) {
  const auth = await checkUser()
  if (!auth) redirect("/")

  const params = await props.params

  const profile = await getProfile(params.name)

  if (!profile) return null

  return (
    <div className="container mx-4 flex w-full gap-4 max-md:flex-col">
      <Card className="flex h-fit flex-col items-center max-md:border-none max-md:shadow-none md:w-fit">
        <CardHeader>
          <CardTitle>{profile.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Avatar className="h-full w-full sm:h-52 sm:w-52">
                <AvatarImage
                  src={profile?.avatar !== "" ? profile?.avatar : "null"}
                  alt="Avatar"
                />
                <AvatarFallback>
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
                  profile.avatar && profile.avatar !== ""
                    ? profile.avatar
                    : undefined
                }
                alt="Profile Avatar"
              />
            </DialogContent>
          </Dialog>
        </CardContent>
        <CardFooter className="flex flex-col gap-6">
          <div className="flex justify-center gap-2 max-md:flex-wrap">
            <Pill>
              <span>Followers:</span> {profile.followers.length}
            </Pill>
            <Pill>
              <span>Following:</span> {profile.following.length}
            </Pill>
            <Pill>
              <span>Posts:</span> {profile.posts.length}
            </Pill>
          </div>
          <Button variant="outline" className="flex w-full rounded-full">
            Follow
          </Button>
        </CardFooter>
      </Card>

      <div className="grid h-fit w-full md:grid-cols-2 md:justify-center">
        {profile.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        {profile.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        {profile.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex select-none items-center rounded-full border border-transparent bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
      {children}
    </div>
  )
}
