import checkUser from "@/src/actions/auth/check-cookie"
import { getPosts } from "@/src/actions/posts/get-all"
import { redirect } from "next/navigation"

export default async function FeedPage() {
  const auth = await checkUser()
  if (!auth) redirect("/")
  const posts = await getPosts()
  return (
    <div>
      {posts?.length ? (
        posts.map((post: any) => {
          return <p key={post.id}>{post.title}</p>
        })
      ) : (
        <p>No posts</p>
      )}
    </div>
  )
}
