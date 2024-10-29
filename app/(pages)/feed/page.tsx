import Post from "@/components/post/post"
import PostToolbar from "@/components/post/toolbar"
import { Separator } from "@/components/ui/separator"
import checkUser from "@/src/actions/auth/check-cookie"
import { getPosts } from "@/src/actions/posts/get-all"
import filterPosts from "@/src/functions/posts/filter-by-value"
import sortPostByDate from "@/src/functions/posts/sort-by-date"
import { redirect } from "next/navigation"

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function FeedPage(props: {
  params: Params
  searchParams: SearchParams
}) {
  const auth = await checkUser()
  if (!auth) redirect("/")

  const { query = "", sort = "" } = await props.searchParams
  const sortValue = sort.toString().toLowerCase() as string
  const searchValue = query.toString().toLowerCase() as string
  const posts = await getPosts({
    query: searchValue,
    limit: searchValue ? 100 : 20,
  })

  const filteredPosts = filterPosts(posts, searchValue)
  const sortedPosts = sortPostByDate(filteredPosts, sortValue)

  return (
    <div className="flex flex-col w-fit gap-2">
      <PostToolbar defaultSort={sortValue} defaultSearch={searchValue} />
      {sortedPosts?.length ? (
        sortedPosts.map((post: any) => {
          return (
            <div className="space-y-2" key={post.id}>
              <Separator />
              <Post post={post} />
            </div>
          )
        })
      ) : (
        <p>No posts</p>
      )}
    </div>
  )
}
