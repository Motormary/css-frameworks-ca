import Post from "@/components/post/post"
import SearchPosts from "@/components/post/search"
import { Skeleton } from "@/components/ui/skeleton"
import checkUser from "@/src/actions/auth/check-cookie"
import { getPosts } from "@/src/actions/posts/get-all"
import Link from "next/link"
import { redirect } from "next/navigation"

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function FeedPage(props: {
  params: Params
  searchParams: SearchParams
}) {
  const auth = await checkUser()
  if (!auth) redirect("/")

  const { query = "" } = await props.searchParams
  const searchValue = query.toString().toLowerCase() as string
  const posts = await getPosts({
    query: searchValue,
    limit: searchValue ? 100 : 20,
  })
  
  const filteredPosts = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchValue) ||
      post.body.toLowerCase().includes(searchValue) ||
      post.author.name.toLowerCase().includes(searchValue)
    )
  })

  return (
    <div className="flex flex-col">
      <SearchPosts />
      {filteredPosts?.length ? (
        filteredPosts.map((post: any) => {
          return <Post post={post} key={post.id} />
        })
      ) : (
        <p>No posts</p>
      )}
    </div>
  )
}
