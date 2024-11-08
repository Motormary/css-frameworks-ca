"use client"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useIsMobile } from "@/hooks/use-mobile"
import { PostType } from "@/src/actions/posts/types"
import { useMediaQuery } from "@/hooks/use-media-query"
import { PostForm } from "./post-form"

type postDialogProps = {
  post?: PostType
  children?: React.ReactNode
}

export function PostDialog(props: postDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const title = props.post ? "Edit Post" : "Create Post"
  const description =
    (props.post ?? undefined)
      ? "Make changes to your post here. Click submit when you're done"
      : ""

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {props.children}
        <DialogContent className="sm:max-w-[425px] lg:max-w-[700]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <PostForm
            setIsLoading={setIsLoading}
            setOpen={setOpen}
            post={props.post}
            footer={
              <DialogFooter className="pt-2">
                <DialogTrigger asChild>
                  <Button variant="outline" disabled={isLoading}>Cancel</Button>
                </DialogTrigger>
                <Button disabled={isLoading} type="submit">
                  Submit
                </Button>
              </DialogFooter>
            }
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {props.children}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <PostForm
          setIsLoading={setIsLoading}
          setOpen={setOpen}
          post={props.post}
          className="px-4"
          footer={
            <DrawerFooter className="px-0 pt-2">
              <Button disabled={isLoading} type="submit">
                Submit
              </Button>
              <DrawerClose asChild>
                <Button disabled={isLoading} variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          }
        />
      </DrawerContent>
    </Drawer>
  )
}
