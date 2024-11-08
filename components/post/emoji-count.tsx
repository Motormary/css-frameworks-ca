"use client"
import { useOptimistic, useTransition } from "react"
import { Button } from "../ui/button"
import reactToPost from "@/src/actions/posts/react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import Link from "next/link"

export default function EmojiCount({
  reaction,
  postId,
  currentUser,
}: {
  postId: number
  currentUser: string
  reaction: {
    count: number
    symbol: string
    reactors: string[]
  }
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    reaction.count,
    (count: number, newCount: number) => count + newCount,
  )

  async function handleCount() {
    const data = {
      id: postId,
      symbol: reaction.symbol,
    }
    if (
      reaction.count > 0 &&
      reaction.reactors.some((reactor) => reactor !== currentUser)
    ) {
      addOptimisticCount(1)
    }
    if (reaction.reactors.some((reactor) => reactor === currentUser)) {
      addOptimisticCount(-1)
    }
    await reactToPost(data)
    router.refresh()
  }

  const getInteractionList = () => {
    return [
      ...reaction.reactors.filter((user, index) => index <= 5),
      "...",
      `And ${reaction.reactors.length - 5} more`,
    ]
  }

  const reactors =
    reaction.reactors.length > 5 ? getInteractionList() : reaction.reactors

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              startTransition(() => {
                handleCount()
              })
            }}
            className={cn(
              reaction.reactors.some((reactor) => reactor == currentUser) &&
                "bg-muted",
              "relative z-50 hover:bg-primary-foreground hover:shadow-md h-fit p-2 leading-none border-none",
            )}
            variant="outline"
          >
            {reaction.symbol}
            <span className="text-xs text-muted-foreground">
              {optimisticCount}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="flex flex-col p-1">
          {reactors.map((user, index) => {
            if (index > 5)
              return (
                <p className="cursor-default p-1" key={`${user}-${index}`}>
                  {user}
                </p>
              )
            return (
              <Link
                className="rounded-sm p-1 hover:bg-muted"
                href={`/profile/${user}`}
                key={`${user}-${index}`}
              >
                {user}
              </Link>
            )
          })}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
