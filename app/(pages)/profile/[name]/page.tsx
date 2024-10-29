/* eslint-disable @next/next/no-img-element */
import checkUser from "@/src/actions/auth/check-cookie"
import { getProfile } from "@/src/actions/profile/get-profile"
import { redirect } from "next/navigation"
import avatar from "assets/images/avatar.jpg"
import { Button } from "@/components/ui/button"
import Post from "@/components/post/post"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"

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

  return (
    <div>
      <Avatar>
        <AvatarImage
          src={profile.avatar !== "" ? profile.avatar : "null"}
          alt="Avatar"
        />
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
      <div>
        <p>{profile.name}</p>
        <p>Followers: {profile.followers.length}</p>
        <p>Following: {profile.following.length}</p>
        <p>Posts: {profile.posts.length}</p>
      </div>
      <Button>Follow</Button>
      {profile.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
