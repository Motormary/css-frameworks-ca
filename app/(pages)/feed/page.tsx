import { getPosts } from "./get"

export default async function FeedPage() {
  const posts = await getPosts()
  console.log("🚀 ~ FeedPage ~ posts:", posts)
  return (
    <div>
        hello
 {/*      {posts.map((post: any) => {
        return <p>{post.title}</p>
      })} */}
    </div>
  )
}
