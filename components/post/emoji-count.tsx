"use client"
import { useOptimistic, useTransition } from "react"
import { Button } from "../ui/button"
import reactToPost from "@/src/actions/posts/react"
import { useRouter } from "next/navigation"

export default function EmojiCount({
  reaction,
}: {
  reaction: {
    count: number
    symbol: string
    postId: number
    reactors: string[]
  }
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    reaction.count,
    (count: number, newCount: number) => count + newCount
  )

  async function handleCount() {
    const data = {
      id: reaction.postId,
      symbol: reaction.symbol,
    }
    addOptimisticCount(1)
    await reactToPost(data)
    router.refresh()
  }

  return (
    <Button
      onClick={() => {
        startTransition(() => {
          handleCount()
        })
      }}
      variant="ghost">
      <span>{optimisticCount}</span>
      {reaction.symbol}
    </Button>
  )
}
