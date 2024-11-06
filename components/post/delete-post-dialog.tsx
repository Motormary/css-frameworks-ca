import { deletePost } from "@/src/actions/posts/delete"
import { Trash } from "lucide-react"
import { redirect } from "next/navigation"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { PostType } from "@/src/actions/posts/types"
import Form from "next/form"

export async function DeletePost({
  postId,
  children,
}: {
  postId: PostType["id"]
  children: React.ReactNode
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
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
            className="flex w-full border border-pink-300"
            action={async () => {
              "use server"
              deletePost(postId)
              redirect("/")
            }}
          >
            <Button className="flex w-full" variant="destructive">
              Delete
            </Button>
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
