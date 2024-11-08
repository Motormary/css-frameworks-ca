import { getPosts } from "@/src/actions/posts/get-all"
import sortPostByDate from "@/src/functions/posts/sort-by-date"
import { Separator } from "../ui/separator"
import Post from "./post"
import BottomDweller from "./bottom-dweller"
import { printErrors, translateErrors } from "@/lib/api-error"
import { redirect, RedirectType } from "next/navigation"

export default async function PostList({
  searchValue,
  sortValue,
  pageValue,
  limitValue,
}: {
  searchValue: string
  sortValue: string
  pageValue?: string
  limitValue: string
}) {
  const posts = await getPosts({
    query: searchValue,
    limit: Number(limitValue) ? Number(limitValue) : 10,
    page: pageValue ? Number(pageValue) : 1,
    sort: sortValue ? sortValue : "desc",
  })

  if (posts?.data?.errors) throw new Error(posts.data.errors[0].message)

  return (
    <>
      {posts.data?.length ? (
        posts.data.map((post: any) => {
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
      {posts.data.length >= 10 ? (
        <BottomDweller pagination={posts.meta} />
      ) : null}
    </>
  )
}
