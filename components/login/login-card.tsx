"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import Image from "next/image"
import logo from "../../assets/images/logo.png"
import Link from "next/link"
import { printErrors, translateErrors } from "@/lib/api-error"
import { ErrorMessage } from "@/src/actions/auth/types"
import { redirect, useRouter } from "next/navigation"
import { Login } from "@/src/actions/auth/auth"

const FormSchema = z.object({
  email: z.string().refine((val) => val.includes("@stud.noroff.no"), {
    message: "Email must be a valid Noroff email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export default function LoginCard() {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await Login(data)
    if (response.success) {
      router.push("/feed")
    } else {
      const errors = translateErrors(response.data as ErrorMessage[])
      errors.forEach((error) => {
        if (error.path && error.message) {
          form.setError(error.path as any, {
            message: error.message,
          })
        } else {
          printErrors(error as ErrorMessage)
        }
      })
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Log in <Image src={logo} alt="Logo" height="50" />
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input placeholder="Kari Traa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Link href="/register">Register</Link>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
