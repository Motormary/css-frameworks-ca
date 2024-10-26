import checkUser from "@/src/actions/auth/check-cookie"
import { getPosts } from "@/src/actions/posts/get-all"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function FeedPage() {
  const auth = await checkUser()
  if (!auth) redirect("/")
  const posts = await getPosts()

  return (
    <div className="flex flex-col">
      {posts?.length ? (
        posts.map((post: any) => {
          return (
            <a href={`/profile/${post.author.name}`} key={post.id}>
              {post.title}
            </a>
          )
        })
      ) : (
        <p>No posts</p>
      )}
    </div>
  )
}
