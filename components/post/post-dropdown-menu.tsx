import { PostType } from "@/src/actions/posts/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Ellipsis } from "lucide-react"
import { DeletePost } from "./delete-post-dialog"
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
import { redirect } from "next/navigation"
import { Button } from "../ui/button"
import Form from "next/form"
import { PostDialog } from "./create-post-dialog"
import { DialogTrigger } from "../ui/dialog"
import { cn } from "@/lib/utils"

type dropProps = {
  post: PostType
  children?: React.ReactNode
  className?: string
}
export default async function PostDropdown(props: dropProps) {
  return (
    <AlertDialog>
      <PostDialog post={props.post}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className={cn(props.className)}>
            <Ellipsis className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DialogTrigger asChild>
              <DropdownMenuItem>Edit post</DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>Delete post</DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
      </PostDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete post</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this post?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex max-sm:gap-4">
          <AlertDialogTrigger asChild>
            <Button>Cancel</Button>
          </AlertDialogTrigger>
          <Form
            action={async () => {
              "use server"
              await deletePost(props.post.id)
              redirect("/feed")
            }}
          >
            <Button className="w-full" variant="destructive">
              Delete
            </Button>
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
