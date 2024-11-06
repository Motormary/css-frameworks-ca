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
import { EditIcon, MessageCircle, Trash, User } from "lucide-react"
import { Button } from "../ui/button"
import EmojiMenu from "./emoji-menu"
import { cn } from "@/lib/utils"
import Img from "./image"
import Pill from "../profile/pill"
import { cookies } from "next/headers"
import { UserData } from "@/src/actions/auth/types"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"

import { deletePost } from "@/src/actions/posts/delete"
import Form from "next/form"
import { redirect } from "next/navigation"
import { PostDialog } from "./create-post-dialog"

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
          <span className="max-w-96 overflow-hidden truncate">
            {post.title}
          </span>
          {!post.owner ? (
            <Link
              className="relative inset-0 z-50 flex items-center gap-2 rounded-full border bg-background p-2 px-3 text-base hover:bg-primary-foreground hover:shadow-md"
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
        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags.map((tag, index) => (
            <Pill key={tag + index + post.id}>{tag}</Pill>
          ))}
        </div>
        {currentUser.name === name ? (
          <div className="relative z-20 flex items-center gap-2 w-fit">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button title="Delete post" variant="ghost" size="icon">
                  <Trash />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete post</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this post?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogTrigger asChild>
                    <Button>Cancel</Button>
                  </AlertDialogTrigger>
                  <Form
                    action={async () => {
                      "use server"
                      deletePost(post.id)
                      redirect("/")
                    }}
                  >
                    <Button variant="destructive">Delete</Button>
                  </Form>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <PostDialog post={post}>
              <Button title="Edit Post" variant="ghost" size="icon">
                <EditIcon />
              </Button>
            </PostDialog>
          </div>
        ) : null}
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
