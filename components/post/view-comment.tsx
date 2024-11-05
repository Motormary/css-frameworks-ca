import { CommentType } from "@/src/actions/types"
import CommentEditor from "./comment"
import { MessageCircleIcon, User } from "lucide-react"
import { Button } from "../ui/button"
import { format } from "date-fns"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"

export default function Comment({
  comment,
  children,
  className,
}: {
  comment: CommentType
  children?: React.ReactNode
  className?: string
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex justify-between text-base">
          <Link className="flex gap-2" href={`/profile/${comment.author.name}`}>
            <Avatar className="flex size-6">
              <AvatarImage
                className="rounded-full"
                src={
                  comment?.author?.avatar?.url &&
                  comment.author.avatar.url !== ""
                    ? comment.author.avatar.url
                    : undefined
                }
                alt="Avatar"
              />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            {comment.author.name}
          </Link>
          <span className="text-xs font-normal">
            {format(comment.created, "PPP")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pr-0">
        {comment.body}
        <CommentEditor postId={comment.postId} replyToId={comment.id}>
          <Button variant="outline" className="size-8 rounded-full p-1">
            <MessageCircleIcon />
          </Button>
        </CommentEditor>
        <div className="pl-2 pt-4">
        {children}
        </div>
      </CardContent>
    </Card>
  )
}
