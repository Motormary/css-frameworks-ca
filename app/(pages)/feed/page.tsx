import PostList from "@/components/post/post-list"
import PostToolbar from "@/components/post/toolbar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import checkUser from "@/src/actions/auth/check-cookie"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { MessageCircle } from "lucide-react"
import { redirect } from "next/navigation"
import { Fragment, Suspense } from "react"

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function FeedPage(props: {
  params: Params
  searchParams: SearchParams
}) {
  const auth = await checkUser()
  if (!auth) redirect("/")

  const { query = "", sortOrder = "", limit = "" } = await props.searchParams
  const sortValue = sortOrder.toString().toLowerCase() as string
  const searchValue = query.toString().toLowerCase() as string
  const limitValue = limit.toString()

  return (
    <div className="flex max-w-[800px] flex-col gap-2 px-4 max-xl:w-full xl:w-2/4">
      <PostToolbar />
      <Suspense fallback={<LoadingPosts />}>
        <PostList
          sortValue={sortValue}
          searchValue={searchValue}
          limitValue={limitValue}
        />
      </Suspense>
    </div>
  )
}

function LoadingPosts() {
  return (
    <>
      {[1, 2].map((skelly) => {
        return (
          <Fragment key={skelly}>
            <Separator />
            <Card className="relative max-w-[800px] border-none">
              <CardHeader className="pb-1">
                <CardTitle className="relative flex items-center justify-between">
                  <Skeleton className="h-6 w-32" />
                  <div className="relative flex items-center gap-2 rounded-full bg-background p-2 px-3 pb-0">
                    <Skeleton className="size-6 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </CardTitle>
                <div>
                  <Skeleton className="h-4 w-52" />
                </div>
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-5 w-12 rounded-full" />
                  <Skeleton className="h-5 w-12 rounded-full" />
                  <Skeleton className="h-5 w-12 rounded-full" />
                </div>
                <div className="flex justify-end">
                  <Skeleton className="h-3 w-28" />
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <AspectRatio ratio={16 / 9}>
                  <Skeleton className=" h-full w-full rounded-md border border-muted object-cover" />
                </AspectRatio>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="relative rounded-full"
                >
                  <MessageCircle />0
                </Button>
              </CardFooter>
            </Card>
          </Fragment>
        )
      })}
    </>
  )
}
