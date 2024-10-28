export type ResponseType = {
  accessToken: string
  meta: any
  status: string
  statusCode: number
}

export type ErrorMessage = {
  code?: string
  message: string
  path?: string[]
}

export type Fetch<T> = {
  success: boolean
  data: T & ResponseType & ErrorMessage[]
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
