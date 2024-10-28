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
import Image from "next/image"
import Link from "next/link"

export default function Post({ post }: { post: PostType }) {

  // TODO: Fix the image component
  
  return (
    <Card className="hover:bg-muted">
      <Link href={`/feed/${post.id}`}>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.author.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={post.media}
              alt="Post Image"
              fill
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>
        </CardContent>
        <CardFooter>Footer</CardFooter>
      </Link>
    </Card>
  )
}
