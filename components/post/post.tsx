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
import EmojiCount from "./emoji-count"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { MessageCircle, User } from "lucide-react"
import { Button } from "../ui/button"
import EmojiMenu from "./emoji-menu"
import { cn } from "@/lib/utils"
import Img from "./image"

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
  viewing,
}: {
  post: PostType
  profile?: boolean
  viewing?: boolean
}) {
  const sortedReactions = post.reactions
    ? [...post.reactions].sort((a, b) => a.symbol.localeCompare(b.symbol))
    : []

  const name = post?.author?.name ?? post?.owner

  return (
    <Card
      className={cn(
        !viewing && "hover:bg-muted/80",
        "relative h-fit w-full min-w-[270px] max-w-[800px] border-none shadow-none",
      )}
    >
      {viewing ? null : (
        <Link
          className="absolute inset-0 z-10 cursor-default"
          href={`/feed/${post.id}`}
        ></Link>
      )}
      <CardHeader>
        <CardTitle className="relative flex items-center justify-between">
          <span className="overflow-hidden truncate">
          {post.title}
          </span>
          {!post.owner ? (
            <Link
              className="relative inset-0 z-50 flex items-center gap-2 rounded-full border bg-background p-2 px-3 text-base font-normal hover:bg-primary-foreground hover:shadow-md"
              href={`/profile/${name}`}
            >
              <Avatar className="size-6">
                <AvatarImage
                  src={
                    post?.author?.avatar.url && post.author.avatar.url !== ""
                      ? post.author.avatar.url
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
        <CardDescription className="overflow-hidden truncate text-nowrap text-muted-foreground">
        {post.body ? post.body : null}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        {viewing && post.media?.url ? (
          <Link
            className="absolute inset-0 z-10"
            target="_blank"
            href={post.media?.url}
          ></Link>
        ) : null}
        {post.media?.url ? (
          <Img
            className="h-full w-full rounded-md border border-muted object-cover"
            src={post.media?.url}
            alt="Post Image"
          />
        ) : null}
      </CardContent>
      {profile ? null : (
        <CardFooter className="flex items-start gap-2">
          <div className="flex flex-wrap gap-2 overflow-y-auto max-md:max-h-[200px]">
            <Button
              variant="outline"
              className="relative z-50 w-[69.2px] rounded-full hover:bg-primary-foreground hover:shadow-md"
              asChild
            >
              <Link href={`/feed/${post.id}?comment=true`}>
              <MessageCircle />
              {post._count?.comments ?? "0"}
              </Link>
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
