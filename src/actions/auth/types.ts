export type ErrorMessage = {
    message: string
}

export type Fetch<T> = {
  success: boolean
  data: T | ErrorMessage[]
}

export type Media = {
  url: string
  alt: string
}

export type UserData = {
  name: string
  email: string
  avatar: Media
  banner: Media
  accessToken: string
  venueManager: boolean
}
