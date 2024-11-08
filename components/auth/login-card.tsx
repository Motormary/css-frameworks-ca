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
import { useForm } from "react-hook-form"
import Image from "next/image"
import logo from "../../assets/images/logo.png"
import { printErrors, translateErrors } from "@/lib/api-error"
import { ErrorMessage } from "@/src/actions/auth/types"
import { useRouter } from "next/navigation"
import { Login } from "@/src/actions/auth/auth"
import { authCardStyle } from "./styles"
import { cn } from "@/lib/utils"

const FormSchema = z.object({
  email: z.string().refine((val) => val.includes("@stud.noroff.no") || val.includes("@noroff.no"), {
    message: "Email must be a valid Noroff email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export default function LoginCard({
  setState,
  state,
}: {
  setState: (state: boolean) => void
  state: string | undefined
  className?: string | undefined
}) {
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
      router.push(`/profile/${response.data.name}`)
    } else {
      const errors = translateErrors(response.data)
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
    <Card className={cn(authCardStyle.card, state)}>
      <CardHeader>
        <CardTitle className={authCardStyle.title}>
          Log in <Image src={logo} alt="Logo" height="50" />
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={authCardStyle.form}
        >
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="karitraa@stud.noroff.no" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Email is case sensitive
                  </FormDescription>
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
          <CardFooter className="flex flex-col gap-4">
            <Button className="flex w-full" type="submit">
              Submit
            </Button>
            <CardDescription>
              Not registered yet?{" "}
              <span
                className="cursor-pointer underline underline-offset-4 hover:text-primary"
                onClick={(e) => {
                  e.preventDefault()
                  setState(false)
                }}
              >
                Sign up!
              </span>
            </CardDescription>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
