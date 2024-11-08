"use client"

import { toast } from "sonner"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useRef, useState } from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import commentOnPost from "@/src/actions/posts/comment"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const commentSchema = z.object({
  body: z.string(),
  replyToId: z.number().optional(),
})

export default function CommentEditor({
  children,
  postId,
  replyToId,
}: {
  children: React.ReactNode
  postId: number
  replyToId?: number
}) {
  const params = useSearchParams()
  const path = usePathname()
  const commentRequested = params.get("comment") ?? false
  const router = useRouter()
  const [open, setOpen] = useState(
    commentRequested && !replyToId ? true : false,
  )
  const [openAlert, setOpenAlert] = useState(false)
  const editorRef = useRef<HTMLTextAreaElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
      replyToId: replyToId,
    },
  })

  function handleOpen(state: boolean) {
    setOpen(state)
  }

  function handleClose(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (editorRef.current?.value !== "") {
      setOpenAlert(true)
    } else setOpen(false)
  }

  function handleDiscard() {
    setOpenAlert(false)
    setOpen(false)
    form.resetField("body")
  }

  function setTextAreaError() {
    containerRef.current?.classList.replace(
      "focus-within:ring-ring",
      "focus-within:ring-destructive",
    )
  }

  async function onSubmit(data: z.infer<typeof commentSchema>) {
    if (!data.body.length) {
      setTextAreaError()
      form.setError("body", { message: "Comment cannot be empty" })
    } else if (data.body.length > 280) {
      setTextAreaError()
      form.setError("body", { message: "Maximum 280 characters" })
    } else {
      const request = {
        id: postId,
        body: data,
      }

      const response = await commentOnPost(request)
      form.resetField("body")
      router.prefetch(path)
      
      if (data.replyToId) {
        router.push(path, { scroll: false })
      } else {
        router.push(path + `#Comment-${response.id}`)
      }

      if (!response.id) {
        toast.error("Error", {
          description: "Something went wrong, contact support or try again.",
        })
      }
      setOpen(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative mt-4 w-full max-w-[760px] rounded-md ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
    >
      {!open ? <div onClick={() => handleOpen(true)}>{children}</div> : null}
      {open ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      autoFocus
                      onChangeCapture={() => {
                        containerRef.current?.classList.replace(
                          "focus-within:ring-destructive",
                          "focus-within:ring-ring",
                        )
                      }}
                      {...field}
                      ref={editorRef}
                      id="editor"
                      className="m-auto min-h-10 rounded-bl-none rounded-br-none border-b-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="absolute -top-[19px] left-4 bg-background px-1" />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 rounded-b-md border-b border-l border-r p-1">
              <Button
                onClick={handleClose}
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                Comment
              </Button>
            </div>
          </form>
        </Form>
      ) : null}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Are you sure you want to discard this comment?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogTrigger>
            <Button onClick={handleDiscard} variant="destructive">
              Discard
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
