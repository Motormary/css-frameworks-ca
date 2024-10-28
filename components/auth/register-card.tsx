"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import Image from "next/image"
import logo from "../../assets/images/bio.png"
import Link from "next/link"
import { Register } from "@/src/actions/auth/auth"
import { printErrors, translateErrors } from "@/lib/api-error"
import { ErrorMessage } from "@/src/actions/auth/types"

const FormSchema = z
  .object({
    name: z.string().min(2, {
      message: "name must be at least 2 characters.",
    }),
    email: z.string().refine((val) => val.includes("@stud.noroff.no"), {
      message: "Email must be a valid Noroff email.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirm: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords must match.",
    path: ["confirm"],
  })

export default function RegisterCard({
  setState,
}: {
  setState: (state: boolean) => void
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await Register(data)
    if (response.success) {
      toast.success("Success!", {
        description: "You have been registered.",
      })
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
          Register <Image src={logo} alt="Logo" height="50" />
        </CardTitle>
        <CardDescription>
          <Button
            variant="link"
            onClick={(e) => {
              e.preventDefault()
              setState(true)
            }}>
            Login
          </Button>
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Kari Traa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
