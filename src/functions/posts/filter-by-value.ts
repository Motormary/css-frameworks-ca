import { PostType } from "@/src/actions/posts/types"

export default function filterPosts(posts: PostType[], filterValue: string) {
  const filteredPosts = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(filterValue) ||
      post.body.toLowerCase().includes(filterValue) ||
      post.author.name.toLowerCase().includes(filterValue)
    )
  })

  return filteredPosts
}
