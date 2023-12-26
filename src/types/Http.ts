export type Payload<T = any> = {
  code: number
  message: string | null
  data: T | null
  error: null
}

export type Error<T = string> = {
  code: number
  message: string | null
  data: null
  error: T | null
}
