import { PostType } from "@/src/actions/posts/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import Link from "next/link"
import EmojiCount from "./emoji-count"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { MessageCircle, User } from "lucide-react"
import { Button } from "../ui/button"
import EmojiMenu from "./emoji-menu"
import { cn } from "@/lib/utils"
import Img from "./image"
import Pill from "../profile/pill"
import { cookies } from "next/headers"
import { UserData } from "@/src/actions/auth/types"

import PostDropdown from "./post-dropdown-menu"
import { format } from "date-fns"

export default async function Post({
  post,
  profile,
  viewing,
  owner,
}: {
  post: PostType
  profile?: boolean
  viewing?: boolean
  owner?: boolean
}) {
  const cookieStore = await cookies()
  const currentUser: UserData = JSON.parse(
    cookieStore.get("profile")?.value as string,
  )
  const sortedReactions = post.reactions
    ? [...post.reactions].sort((a, b) => a.symbol.localeCompare(b.symbol))
    : []

  const name = post?.author?.name ?? "Anon"

  return (
    <Card
      className={cn(
        !viewing && "hover:bg-muted/80",
        "relative h-fit w-full min-w-[270px] max-w-[800px] border-none shadow-none",
      )}
    >
      {currentUser.name === name ? (
        <div className="relative z-20 flex w-full justify-end p-2 px-5">
          <PostDropdown post={post} />
        </div>
      ) : null}
      {viewing ? null : (
        <Link
          className="absolute inset-0 z-10 cursor-default"
          href={`/feed/${post.id}`}
        ></Link>
      )}
      <CardHeader className="pb-1">
        <CardTitle className="relative flex items-start justify-between gap-4 max-md:flex-wrap-reverse">
          <span className="text-pretty">{post.title}</span>
          <Link
            className="group relative inset-0 z-50 flex items-center gap-2 rounded-full text-base"
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
            <span>{name}</span>
          </Link>
        </CardTitle>
        <CardDescription
          className={cn(
            !viewing && "overflow-hidden truncate text-nowrap",
            "text-muted-foreground",
          )}
        >
          {post.body ? post.body : null}
        </CardDescription>
        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags.map((tag, index) => {
            if (!tag) return null
            return (
            <Pill key={tag + index + post.id}>{tag}</Pill>
            )
          })}
        </div>
        <span className="text-right text-xs text-muted-foreground">
          {post.updated !== post.created ? "Updated: " : ""}
          {format(post?.updated, "PP - p")}
        </span>
      </CardHeader>
      <CardContent className="relative pb-2">
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
          <div className="flex h-max w-full flex-wrap gap-2 overflow-y-auto py-2 max-md:max-h-[200px]">
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
              <EmojiCount
                key={int.symbol}
                postId={post.id}
                currentUser={currentUser.name}
                reaction={int}
              />
            ))}
          </div>
          <EmojiMenu id={post.id} />
        </CardFooter>
      )}
    </Card>
  )
}
