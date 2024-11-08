/* eslint-disable @next/next/no-img-element */
import checkUser from "@/src/actions/auth/check-cookie"
import { getProfile } from "@/src/actions/profile/get-profile"
import { redirect } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import ProfileCard from "@/components/profile/profile-card"
import { Suspense } from "react"
import Loading, { LoadingProfileCard, PostSkeleton, UserCardSkeleton } from "./loading"
import UserPosts from "@/components/profile/user-posts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCard } from "@/components/profile/following-list"
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
            <TabsList className="max-md:w-full">
              <TabsTrigger value="posts" asChild>
                <Link href={`?tab=posts`}>Posts</Link>
              </TabsTrigger>
              <TabsTrigger value="following" asChild>
                <Link href={`?tab=following`}>Following</Link>
              </TabsTrigger>
              <TabsTrigger value="followers" asChild>
                <Link href={`?tab=followers`}>Followers</Link>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
              <div className="mx-auto px-2 py-8">
                <h1 className="mb-6 text-2xl font-bold">Posts</h1>
                <div className="flex flex-wrap gap-4 max-lg:justify-center">
                  <Suspense fallback={<PostSkeleton />}>
                    <UserPosts params={name} />
                  </Suspense>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="following">
              <div className="mx-auto px-2 py-8">
                <h1 className="mb-6 text-2xl font-bold">Following</h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Suspense fallback={<UserCardSkeleton />}>
                    {profile.following.map((follower) => (
                      <UserCard key={follower.name} user={follower} />
                    ))}
                  </Suspense>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="followers">
              <div className="mx-auto px-2 py-8">
                <h1 className="mb-6 text-2xl font-bold">Followers</h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Suspense fallback={<UserCardSkeleton />}>
                    {profile.followers.map((follower) => (
                      <UserCard key={follower.name} user={follower} />
                    ))}
                  </Suspense>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
