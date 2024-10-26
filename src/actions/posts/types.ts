export type Post = {
  id: number
  title: string
  body: string
  tags: string[]
  media: {
    url: string
    alt: string
  }
  created: string // ISO date string
  updated: string // ISO date string
  author: {
    name: string
    email: string
    bio: string
    avatar: {
      url: string
      alt: string
    }
    banner: {
      url: string
      alt: string
    }
  }
  reactions: {
    symbol: string
    count: number
    reactors: string[]
  }[]
  comments: {
    body: string
    replyToId: number | null
    id: number
    postId: number
    owner: string
    created: string // ISO date string
    author: {
      name: string
      email: string
      bio: string
      avatar: {
        url: string
        alt: string
      }
      banner: {
        url: string
        alt: string
      }
    }
  }[]
  _count: {
    comments: number
    reactions: number
  }
}
