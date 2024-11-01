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
import { Register } from "@/src/actions/auth/auth"
import { handleApiErrors } from "@/lib/api-error"
import { authCardStyle } from "./styles"
import { cn } from "@/lib/utils"

const FormSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }).max(20, {
      message: "Name cannot contain more than 20 characters."
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
  state,
}: {
  setState: (state: boolean) => void
  state: string | undefined
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
      form.reset()
      toast.success("Welcome! 🎉", {
        description: (
          <span>
            You've been successfully registered as <strong>{data.name}</strong>!
          </span>
        ),
      })
      setState(true)
    } else {
      handleApiErrors(response.data, form)
    }
  }

  return (
    <Card className={cn(authCardStyle.card, state, "opacity-0")}>
      <CardHeader>
        <CardTitle className={authCardStyle.title}>
          Register <Image src={logo} alt="Logo" height="50" />
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={authCardStyle.form}>
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
          <CardFooter className="flex flex-col gap-4">
            <Button className="flex w-full" type="submit">
              Submit
            </Button>
            <CardDescription>
              Already registered?{" "}
              <span
                className="underline underline-offset-4 hover:text-primary cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  setState(true)
                }}>
                Sign in!
              </span>
            </CardDescription>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
