import { PostType } from "@/src/actions/posts/types"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import createPost from "@/src/actions/posts/create"
import { useState } from "react"
import { handleApiErrors, printErrors, translateErrors } from "@/lib/api-error"
import { redirect } from "next/navigation"
import { Textarea } from "../ui/textarea"
import patchPost from "@/src/actions/posts/patch"

type postFormProps = {
  post?: PostType
  className?: string
  footer: React.ReactNode
  setOpen: (state: boolean) => void
  setIsLoading: (state: boolean) => void
}

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  body: z.string().optional(),
  tags: z.array(z.string()).optional(),
  media: z.object({
    url: z
      .string()
      .refine((value) => !value || z.string().url().safeParse(value).success, {
        message: "Invalid URL format",
      }),
      alt: z.string().optional()
  }),
})

export function PostForm(props: postFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...props?.post,
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    props.setIsLoading(true)
    let response
    if (props.post) {
      const request = {
        id: props.post.id,
        data: data
      }
      response = await patchPost(request)
    } else {
      response = await createPost(data)
    }
    if (response.success) {
      props.setOpen(false)
      redirect(`/feed/${response.data.id}`)
    } else {
      handleApiErrors(response.data, form)
    }
    props.setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", props.className)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Hello there" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="media.url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Media URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {props.footer}
      </form>
    </Form>
  )
}
