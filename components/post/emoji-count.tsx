"use client"
import { useOptimistic, useTransition } from "react"
import { Button } from "../ui/button"
import reactToPost from "@/src/actions/posts/react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

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
    } if (reaction.reactors.some((reactor) => reactor === currentUser)) {
      addOptimisticCount(-1)
    }
    await reactToPost(data)
    router.refresh()
  }

  return (
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
        "relative z-50 rounded-full hover:bg-primary-foreground hover:shadow-md",
      )}
      variant="outline"
    >
      {reaction.symbol}
      <span>{optimisticCount}</span>
    </Button>
  )
}
