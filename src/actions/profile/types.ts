import { UserData } from "../auth/types"
import { PostType } from "../posts/types"

export type Profile = {
  name: string
  email: string
  bio: string
  followers: UserData[]
  following: UserData[]
  posts: PostType[]
  banner: {
    url: string
    alt: string
  }
  avatar: {
    url: string
    alt: string
  }
  _count: {
    posts: number
    followers: number
    following: number
  }
}
