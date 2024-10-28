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

/* 
    <Card className="max-w-[800px] hover:bg-muted">
    img
              className="w-full h-full rounded-md object-cover"
            
 */
export default function Post({ post }: { post: PostType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {post.title}
          <Link href={`/profile/${post.author.name}`}>{post.author.name}</Link>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={`/feed/${post.id}`}>
          <AspectRatio ratio={16 / 9}>
            <img
              src={post?.media !== "" ? post.media : logo.src}
              alt="Post Image"
            />
          </AspectRatio>
        </Link>
      </CardContent>
      <CardFooter>
        <span>Comments: {post._count.comments}</span>
        {post.reactions.map((int, index) => <EmojiCount key={int.symbol} reaction={int} />)}
      </CardFooter>
    </Card>
  )
}
