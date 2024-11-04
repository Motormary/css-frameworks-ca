"use client"

import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

// TODO: Create function, get id, update profile post list responsiveness.

export default function EmojiMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="relative z-50 rounded-full text-lg"
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
          <Button key={emoji} variant="ghost" size="icon" className="text-lg">
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
