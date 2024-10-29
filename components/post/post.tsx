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

export default function Post({ post }: { post: PostType }) {
  const sortedReactions = post.reactions
    ? [...post.reactions].sort((a, b) => a.symbol.localeCompare(b.symbol))
    : []

  const name = post?.author?.name ?? post.owner
  return (
    <Card className="relative max-w-[800px] border-none hover:bg-muted/80">
      <Link className="absolute z-10 inset-0" href={`/feed/${post.id}`}></Link>
      <CardHeader>
        <CardTitle className="relative flex justify-between">
          {post.title}
          <Link className="relative z-50 inset-0 text-sm font-normal hover:text-muted-foreground" href={`/profile/${name}`}>{name}</Link>
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
      <CardFooter className="flex flex-wrap">
        {post._count?.comments ? (
          <span>Comments: {post._count.comments}</span>
        ) : null}
        {sortedReactions.map((int, index) => (
          <EmojiCount key={int.symbol} reaction={int} />
        ))}
      </CardFooter>
    </Card>
  )
}
