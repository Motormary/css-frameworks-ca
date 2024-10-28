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

/* 
    <Card className="max-w-[800px] hover:bg-muted">
    img
              className="w-full h-full rounded-md object-cover"
            
 */
export default function Post({ post }: { post: PostType }) {
  return (
    <Card>
      <Link href={`/feed/${post.id}`}>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.author.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <AspectRatio ratio={16 / 9}>
            <img
              src={post?.media !== "" ? post.media : logo.src}
              alt="Post Image"
            />
          </AspectRatio>
        </CardContent>
        <CardFooter>Footer</CardFooter>
      </Link>
    </Card>
  )
}
