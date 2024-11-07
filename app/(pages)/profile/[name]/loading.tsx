import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { User } from "lucide-react"

export function LoadingProfileCard() {
  return (
    <Card className="flex h-fit flex-col items-center border-none max-sm:shadow-none lg:w-fit">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-40" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[80vw] w-[80vw] overflow-hidden rounded-full sm:h-52 sm:w-52">
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <User className="h-full w-full text-muted-foreground/30" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-6">
        <div className="flex justify-center gap-2 text-nowrap max-md:flex-wrap">
          <Skeleton className="h-6 w-[90px] rounded-full" />
          <Skeleton className="h-6 w-[76px] rounded-full" />
          <Skeleton className="h-6 w-[80px] rounded-full" />
        </div>
        <Skeleton className="h-10 w-full rounded-full" />
      </CardFooter>
    </Card>
  )
}

export default function Loading() {
  return (
    <div className="container mx-auto mt-[7rem] flex w-full gap-4 px-4 max-lg:flex-col">
      <Card className="flex h-fit flex-col items-center border-none max-sm:shadow-none lg:w-fit">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-[80vw] w-[80vw] overflow-hidden rounded-full sm:h-52 sm:w-52">
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <User className="h-full w-full text-muted-foreground/30" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-6">
          <div className="flex justify-center gap-2 text-nowrap max-md:flex-wrap">
            <Skeleton className="h-6 w-[90px] rounded-full" />
            <Skeleton className="h-6 w-[76px] rounded-full" />
            <Skeleton className="h-6 w-[80px] rounded-full" />
          </div>
          <Skeleton className="h-10 w-full rounded-full" />
        </CardFooter>
      </Card>

      <Separator orientation="vertical" className="max-lg:hidden" />

      <div className="flex h-fit w-full flex-col gap-4">
        <div className="flex w-fit gap-2 rounded-md border p-1.5">
          <Skeleton className="h-7 w-14" />
          <Skeleton className="h-7 w-14" />
          <Skeleton className="h-7 w-14" />
        </div>
        {[...Array(3)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

export function PostSkeleton() {
  return (
    <Card className="relative border-none pt-5">
      <CardContent className="flex gap-4 p-4 max-lg:flex-col">
        <div className="h-24 min-w-48 lg:max-w-48">
          <Skeleton className="h-full w-full rounded-md" />
        </div>
        <div className="w-full">
          <Skeleton className="mb-2 h-6 w-3/4" />
          <div className="my-2 flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-5/6" />
        </div>
      </CardContent>
    </Card>
  )
}
