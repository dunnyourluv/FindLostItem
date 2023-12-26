import { PostTypes } from '@/types'
import { api } from '.'

class PostApi {
  static async getRecommended() {
    try {
      const { data } = await api.get<PostTypes.Payload>('/posts/recommend')
      return data.data || []
    } catch (error: any) {
      throw error.response.data
    }
  }

  static async get(uuid: string) {
    try {
      const { data } = await api.get<PostTypes.SinglePayload>(`/posts/${uuid}`)
      return data.data
    } catch (error: any) {
      throw error.response.data
    }
  }

  static async search(keyword: string, topic: string, location: string) {
    try {
      const { data } = await api.get<PostTypes.Payload>(
        `/posts/search?keyword=${keyword}&topic=${topic}&location=${location}`
      )
      return data.data || []
    } catch (error: any) {
      throw error.response.data
    }
  }

  static async upload(payload: PostTypes.Upload) {
    const formData = new FormData()
    formData.append('title', payload.title)
    formData.append('content', payload.content)
    formData.append('location', payload.location)
    formData.append('topic', payload.topic)
    payload.images.forEach((image) => {
      formData.append('images[]', image)
    })
    try {
      const { data } = await api.post<PostTypes.SinglePayload>(
        '/me/posts/add',
        formData
      )
      return data.data
    } catch (error: any) {
      throw error.response.data
    }
  }

  static async getMyPosts() {
    try {
      const { data } = await api.get<PostTypes.Payload>('/me/posts')
      return data.data || []
    } catch (error: any) {
      throw error.response.data
    }
  }

  static async delete(uuid: string) {
    try {
      const { data } = await api.delete<PostTypes.SinglePayload>(
        `/me/posts/${uuid}`
      )
      return data.data
    } catch (error: any) {
      throw error.response.data
    }
  }

  static async getsPending() {
    try {
      const { data } = await api.get<PostTypes.Payload>('/admin/posts/pending')
      return data.data || []
    } catch (error: any) {
      throw error.response.data
    }
  }

  static async accept(uuid: string) {
    try {
      const { data } = await api.put<PostTypes.SinglePayload>(
        `/admin/posts/${uuid}/accept`
      )
      return data.data
    } catch (error: any) {
      throw error.response.data
    }
  }

  static async reject(uuid: string) {
    try {
      const { data } = await api.put<PostTypes.SinglePayload>(
        `/admin/posts/${uuid}/reject`
      )
      return data.data
    } catch (error: any) {
      throw error.response.data
    }
  }
}

export default PostApi
