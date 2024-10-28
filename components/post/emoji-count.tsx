"use client"
import { useState } from "react"
import { Button } from "../ui/button"

export default function EmojiCount({
  reaction,
}: {
  reaction: {
    count: number
    symbol: string
    reactors: string[]
  }
}) {
  const [count, setCount] = useState(reaction.count)
  return (
    <Button onClick={() => setCount((c) => c + 1)} type="submit" variant="ghost">
      <span>{count}</span>
      {reaction.symbol}
    </Button>
  )
}
