import { CommentType } from "@/src/actions/types"
import Comment from "./view-comment"
import { cn } from "@/lib/utils"

export default async function CommentList({
  comments,
}: {
  comments: CommentType[]
}) {
  function renderComments(parentComment: CommentType) {
    return (
      <Comment className={cn(parentComment.replyToId && "border-b-0 border-r-0 rounded-none")} key={parentComment.id} comment={parentComment}>
        {comments
          .filter((comment) => comment.replyToId === parentComment.id)
          .map((reply) => renderComments(reply))}
      </Comment>
    )
  }

  return (
    <div className="mt-2 flex w-full max-w-[760px] flex-col gap-2">
      {comments
        .filter((comment) => !comment.replyToId)
        .map((mainComment) => renderComments(mainComment))}
    </div>
  )
}
