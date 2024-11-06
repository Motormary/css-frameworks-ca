"use client"
import { CommentType } from "@/src/actions/types"
import CommentEditor from "./comment"
import { MessageCircleIcon, Minus, Plus, User } from "lucide-react"
import { Button } from "../ui/button"
import { format } from "date-fns"
import {
  Card,
  CardContent, CardHeader,
  CardTitle
} from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"
import { useState } from "react"
import React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

export default function Comment({
  comment,
  children,
  className,
}: {
  comment: CommentType
  children?: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = useState(true)
  const childrenLength = React.Children.count(children)
  const haveChildren = childrenLength > 0
  return (
    <Card id={`Comment-${comment.id.toString()}`} className={className}>
      {haveChildren ? (
        <Button
          onClick={() => setOpen(!open)}
          className="absolute left-0 z-20 h-full w-2 rounded-l-md bg-border/20 p-0 hover:cursor-pointer hover:bg-border/50"
        ></Button>
      ) : null}
      <CardHeader className="relative">
        <CardTitle className="flex justify-between text-base">
          <Link className="flex gap-2" href={`/profile/${comment.author.name}`}>
            <Avatar className="z-30 flex size-6">
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
      <CardContent className="relative pr-0">
        {comment.body}
        {haveChildren ? (
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setOpen(!open)}
                  variant="outline"
                  className="absolute -left-[7px] bottom-0 z-30 size-4 rounded-full border-muted-foreground p-1"
                >
                  {open ? <Minus /> : <Plus />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {open ? "Hide replies" : "Show replies"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
        <CommentEditor postId={comment.postId} replyToId={comment.id}>
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="size-8 rounded-full p-1">
                  <MessageCircleIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Reply
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CommentEditor>
      </CardContent>
      {open && haveChildren ? (
        <div className="space-y-1 p-4 pr-0">{children}</div>
      ) : null}
    </Card>
  )
}
