import PostList from "@/components/post/post-list"
import PostToolbar from "@/components/post/toolbar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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

  const { query = "", sort = "" } = await props.searchParams
  const sortValue = sort.toString().toLowerCase() as string
  const searchValue = query.toString().toLowerCase() as string

  return (
    <div className="flex flex-col max-xl:w-full xl:w-2/4 max-w-[800px] gap-2 px-4">
      <PostToolbar />
      <Suspense fallback={<LoadingPosts />}>
        <PostList sortValue={sortValue} searchValue={searchValue} />
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
              <CardHeader>
                <CardTitle className="relative flex justify-between items-center">
                  <Skeleton className="h-6 w-32" />
                  <div className="relative flex items-center gap-2 z-50 inset-0 text-base font-normal border rounded-full p-2 px-3 bg-background">
                    <Skeleton className="size-6 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AspectRatio ratio={16 / 9}>
                  <Skeleton className="w-full h-full rounded-md object-cover border border-muted mt-1.5" />
                </AspectRatio>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="relative rounded-full mt-1.5">
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
