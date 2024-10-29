import { PostType } from "@/src/actions/posts/types"

type sortProps = {
  posts: PostType[]
  sortValue: string
}

export default function sortPostByDate(posts: PostType[], sortValue: string) {
  const sortedFilteredPosts = posts.sort((a, b) => {
    const dateA = new Date(a.created).getTime()
    const dateB = new Date(b.created).getTime()

    if (sortValue === "newest") {
      return dateB - dateA
    } else if (sortValue === "oldest") {
      return dateA - dateB
    } else {
      return 0
    }
  })

  return sortedFilteredPosts
}
