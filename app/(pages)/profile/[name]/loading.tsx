import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { User } from "lucide-react"

export default function Loading() {
  return (
    <div className="container mx-4 flex w-full gap-4 max-lg:flex-col">
      <Card className="flex h-fit flex-col items-center max-xl:border-none max-sm:shadow-none lg:w-fit">
        <CardHeader>
          <CardTitle><Skeleton className="h-6 w-40" /></CardTitle>
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
            <Skeleton className="h-8 w-24 px-1 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
          <Skeleton className="h-10 w-full rounded-full" />
        </CardFooter>
      </Card>

      <div className="flex h-fit w-full flex-col gap-4">
        {[...Array(3)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

function PostSkeleton() {
  return (
    <Card className="relative hover:bg-muted/80">
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