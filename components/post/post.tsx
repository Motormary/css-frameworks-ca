/* eslint-disable @next/next/no-img-element */
import { PostType } from "@/src/actions/posts/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { AspectRatio } from "../ui/aspect-ratio"
import Link from "next/link"
import logo from "assets/images/logo.png"
import EmojiCount from "./emoji-count"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { MessageCircle, User } from "lucide-react"
import { Button } from "../ui/button"
import EmojiMenu from "./emoji-menu"

// People keep uploading non-direct links from google image search..........
export function isValidImageUrl(url: string): boolean {
  const forbiddenPattern = /^https:\/\/www\.google\.com\//

  return !forbiddenPattern.test(url)
}

export function checkImgSrc(url: string): boolean {
  if (url && url !== "" && isValidImageUrl(url)) return true
  return false
}

export default function Post({
  post,
  profile,
}: {
  post: PostType
  profile?: boolean
}) {
  const sortedReactions = post.reactions
    ? [...post.reactions].sort((a, b) => a.symbol.localeCompare(b.symbol))
    : []

  const imageSrc = checkImgSrc(post?.media) ? post.media : logo.src

  const name = post?.author?.name ?? post?.owner

  return (
    <Card className="relative h-fit w-full min-w-[270px] max-w-[800px] border-none shadow-none hover:bg-muted/80">
      <Link
        className="absolute inset-0 z-10 cursor-default"
        href={`/feed/${post.id}`}
      ></Link>
      <CardHeader>
        <CardTitle className="relative flex items-center justify-between">
          {post.title}
          {!post.owner ? (
            <Link
              className="relative inset-0 z-50 flex items-center gap-2 rounded-full border bg-background p-2 px-3 text-base font-normal hover:bg-primary-foreground hover:shadow-md"
              href={`/profile/${name}`}
            >
              <Avatar className="size-6">
                <AvatarImage
                  src={
                    post?.author?.avatar && post.author.avatar !== ""
                      ? post.author.avatar
                      : undefined
                  }
                  alt="Avatar"
                />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              {name}
            </Link>
          ) : null}
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={16 / 9}>
          <img
            className="h-full w-full rounded-md border border-muted object-cover"
            src={imageSrc}
            alt="Post Image"
          />
        </AspectRatio>
      </CardContent>
      {profile ? null : (
        <CardFooter className="flex items-start gap-2">
          <div className="flex flex-wrap gap-2 overflow-y-auto max-md:max-h-[200px]">
            <Button
              variant="outline"
              className="relative z-50 w-[69.2px] rounded-full hover:bg-primary-foreground hover:shadow-md"
            >
              <MessageCircle />
              {post._count?.comments ?? "0"}
            </Button>
            {sortedReactions.map((int, index) => (
              <EmojiCount key={int.symbol} reaction={int} />
            ))}
          </div>
          <EmojiMenu id={post.id} />
        </CardFooter>
      )}
    </Card>
  )
}
