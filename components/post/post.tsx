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
    <Card className="max-w-[800px]">
      <CardHeader>
        <CardTitle>
          {post.title}
          <Link href={`/profile/${name}`}>{name}</Link>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={`/feed/${post.id}`}>
          <AspectRatio ratio={16 / 9}>
            <img
              className="w-full h-full rounded-md object-cover"
              src={post?.media !== "" ? post.media : logo.src}
              alt="Post Image"
            />
          </AspectRatio>
        </Link>
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
