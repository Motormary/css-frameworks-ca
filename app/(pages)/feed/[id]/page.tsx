import Post from "@/components/post/post"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import checkUser from "@/src/actions/auth/check-cookie"
import { getPost } from "@/src/actions/posts/get"
import { redirect } from "next/navigation"

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const auth = await checkUser()
  if (!auth) redirect("/")

  const post = await getPost(id)

  return (
    <div className="container flex h-fit w-full flex-col items-center">
      <Post viewing post={post} />
      <div className="group w-full max-w-[770px]">
        <Textarea
          placeholder="Leave a comment"
          className="m-auto mt-4 min-h-10 rounded-bl-none rounded-br-none border-b-0"
        />
        <div className="hidden justify-end rounded-bl rounded-br border-b border-l border-r p-1 group-focus-within:flex">
          <Button variant="outline" size="sm" className="rounded-full">
            Comment
          </Button>
        </div>
      </div>

      <div>{post.comments.map((comment) => comment.body)}</div>
    </div>
  )
}
