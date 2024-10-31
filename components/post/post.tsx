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

export default function Post({ post }: { post: PostType }) {
  const sortedReactions = post.reactions
    ? [...post.reactions].sort((a, b) => a.symbol.localeCompare(b.symbol))
    : []

  const name = post?.author?.name ?? post?.owner
  return (
    <Card className="relative max-w-[800px] border-none hover:bg-muted/80 shadow-none">
      <Link
        className="absolute z-10 inset-0 cursor-default"
        href={`/feed/${post.id}`}></Link>
      <CardHeader>
        <CardTitle className="relative flex justify-between items-center">
          {post.title}
          {!post.owner ? (
            <Link
              className="relative flex items-center gap-2 z-50 inset-0 text-base font-normal border rounded-full p-2 px-3 bg-background hover:shadow-md hover:bg-primary-foreground"
              href={`/profile/${name}`}>
              <Avatar className="size-6">
                <AvatarImage
                  src={post.author.avatar !== "" ? post.author.avatar : "null"}
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
            className="w-full h-full rounded-md object-cover border border-muted"
            src={post?.media !== "" ? post.media : logo.src}
            alt="Post Image"
          />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button variant="outline" className="relative rounded-full hover:bg-primary-foreground hover:shadow-md z-50">
          <MessageCircle />
          {post._count?.comments ?? "0"}
        </Button>
        {sortedReactions.map((int, index) => (
          <EmojiCount key={int.symbol} reaction={int} />
        ))}
      </CardFooter>
    </Card>
  )
}
