/* eslint-disable @next/next/no-img-element */
import checkUser from "@/src/actions/auth/check-cookie"
import { getProfile } from "@/src/actions/profile/get-profile"
import { redirect } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import ProfileCard from "@/components/profile/profile-card"
import { Suspense } from "react"
import { LoadingProfileCard, PostSkeleton } from "./loading"
import UserPosts from "@/components/profile/user-posts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCard } from "@/components/profile/following-list"
import Img from "@/components/post/image"
import Link from "next/link"

type Params = Promise<{ name: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function ProfilePage(props: {
  params: Params
  searchParams: SearchParams
}) {
  const auth = await checkUser()
  if (!auth) redirect("/")

  const params = await props.params
  const { tab = "posts" } = await props.searchParams
  const name = params.name
  const profile = await getProfile(params.name)

  if (!profile) return null

  return (
    <div className="flex w-full flex-col">
      <img
        src={profile.banner.url}
        alt={profile.banner.alt}
        className="max-h-32 w-full -translate-y-4 object-cover"
      />
      <div className="container mx-auto flex w-full gap-4 px-4 max-lg:flex-col">
        <Suspense fallback={<LoadingProfileCard />}>
          <ProfileCard params={name} />
        </Suspense>
        <Separator
          decorative
          orientation="vertical"
          className="max-lg:hidden"
        />
        <div className="flex h-fit w-full flex-col gap-4">
          <Tabs value={tab.toString()}>
            <TabsList>
              <TabsTrigger value="posts">
              <Link href={`?tab=posts`}>Posts</Link>
              </TabsTrigger>
              <TabsTrigger value="following" asChild>
                <Link href={`?tab=following`}>Following</Link>
              </TabsTrigger>
              <TabsTrigger value="followers">
              <Link href={`?tab=followers`}>Followers</Link>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
              <Suspense fallback={<PostSkeleton />}>
                <UserPosts params={name} />
              </Suspense>
            </TabsContent>
            <TabsContent value="following">
              <div className="mx-auto px-2 py-8">
                <h1 className="mb-6 text-2xl font-bold">Following</h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {profile.following.map((follower) => (
                    <Suspense key={follower.name}>
                      <UserCard user={follower} />
                    </Suspense>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="followers">
              <div className="mx-auto px-2 py-8">
                <h1 className="mb-6 text-2xl font-bold">Followers</h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {profile.followers.map((follower) => (
                    <Suspense key={follower.name}>
                      <UserCard user={follower} />
                    </Suspense>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
