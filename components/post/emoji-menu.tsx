"use client"

import reactToPost from "@/src/actions/posts/react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function EmojiMenu({ id }: { id: number }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  async function handleReact(emoji: string) {
    setOpen(false)
    const data = {
      id: id,
      symbol: emoji,
    }
    await reactToPost(data)
    router.refresh()
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="relative z-50 shrink-0 rounded-full text-lg"
        >
          <span className="absolute right-1 top-2 -translate-y-1/2 translate-x-1/2">
            +
          </span>
          🙂
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{ scrollbarWidth: "thin" }}
        className="flex max-h-52 w-72 flex-wrap overflow-y-auto py-2"
      >
        {emojis.map((emoji) => (
          <Button
            onClick={() => handleReact(emoji)}
            key={emoji}
            variant="ghost"
            size="icon"
            className="text-lg"
          >
            {emoji}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export const emojis = [
  "😀",
  "😁",
  "😂",
  "🤣",
  "😃",
  "😄",
  "😅",
  "😆",
  "😉",
  "😊",
  "😋",
  "😎",
  "😍",
  "😘",
  "🥰",
  "😗",
  "🙂",
  "🤗",
  "🤩",
  "🤔",
  "😐",
  "😑",
  "🙄",
  "😶",
  "😣",
  "😥",
  "😮",
  "🤐",
  "😯",
  "😪",
  "😫",
  "🥱",
  "😴",
  "😌",
  "😛",
  "😜",
  "😝",
  "🤤",
  "😒",
  "😓",
  "😕",
  "🙃",
  "🤑",
  "😲",
  "😭",
  "😬",
  "🤬",
  "🤢",
  "😇",
  "🧐",
  "😈",
  "☠",
  "💩",
  "🤖",
  "👍",
  "👎",
]
