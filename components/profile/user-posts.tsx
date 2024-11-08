import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { getProfile } from "../../src/actions/profile/get-profile"
import Link from "next/link"
import Img from "@/components/post/image"
import PostDropdown from "@/components/post/post-dropdown-menu"
import Pill from "@/components/profile/pill"
import { format } from "date-fns"

export default async function UserPosts({ params }: { params: string }) {
  const profile = await getProfile(params)

  return (
    <>
      {profile.posts.length ? (
        profile.posts.map((post) => (
          <Card
            key={post.id}
            className="group relative border-none pt-5 hover:bg-muted/80 max-md:w-full"
          >
            <Link
              href={`/feed/${post.id}`}
              className="absolute inset-0 z-10 cursor-default"
            ></Link>
            <CardContent className="p-4">
              {post.media?.url ? (
                <div className="h-full min-w-48 lg:max-w-48">
                  <Img
                    className="h-full w-full rounded-md border border-muted object-cover"
                    src={post.media?.url}
                    alt="Post Image"
                  />
                  <span className="text-xs text-muted-foreground group-hover:visible group-hover:opacity-100 lg:opacity-0">
                    {format(post.created, "P - p")}
                  </span>
                </div>
              ) : null}

              <div className="absolute right-[10px] top-[10px] z-20">
                <PostDropdown
                  className="group-hover:visible group-hover:opacity-100 lg:opacity-0"
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
    </>
  )
}
