import CommentEditor from "@/components/post/comment"
import CommentList from "@/components/post/comment-list"
import Post from "@/components/post/post"
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
    <div className="container flex h-fit flex-col items-center px-4">
      <Post viewing post={post} />
        <CommentEditor postId={post.id}>
          <button className="h-10 w-full cursor-text rounded-md border px-3 text-left text-sm text-muted-foreground">
            Leave a comment
          </button>
        </CommentEditor>
        <CommentList comments={post.comments} />
    </div>
  )
}
