import { getPosts } from "@/src/actions/posts/get-all"
import filterPosts from "@/src/functions/posts/filter-by-value"
import sortPostByDate from "@/src/functions/posts/sort-by-date"
import { Separator } from "../ui/separator"
import Post from "./post"

export default async function PostList({
  searchValue,
  sortValue,
}: {
  searchValue: string
  sortValue: string
}) {
  const posts = await getPosts({
    query: searchValue,
    limit: searchValue ? 100 : 20,
  })

  const sortedPosts = sortPostByDate(posts, sortValue)
  return (
    <>
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
        <p className="m-auto">No results.</p>
      )}
    </>
  )
}
