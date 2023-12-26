import { HttpTypes, UserTypes } from '.'

export enum PostStatus {
  PUBLISHED = 'published',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

export type Image = {
  uuid: string
  url: string
  createdAt: string
  updatedAt: string
}

export type Topic = {
  uuid: string
  name: string
  createdAt: string
  updatedAt: string
}

export type Instance = {
  uuid: string
  content: string
  title: string
  location: string
  status: PostStatus
  user: UserTypes.Instance
  topic: Topic
  images: Image[]
}

export type Card = {
  uuid: string
  title: string
  content: string
  location: string
  user: {
    username: string
  }
  images: Image[]
}

export type Upload = {
  topic: string
  title: string
  content: string
  location: string
  images: File[]
}

export type Payload = HttpTypes.Payload<Instance[]>

export type SinglePayload = HttpTypes.Payload<Instance>

export type TopicsPayload = HttpTypes.Payload<Topic[]>

export type TopicPayload = HttpTypes.Payload<Topic>
