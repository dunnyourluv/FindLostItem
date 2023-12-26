import { PostTypes } from '@/types'
import { api } from '.'

class TopicApi {
  static async gets() {
    try {
      const { data } = await api.get<PostTypes.TopicsPayload>('/topic')
      return data.data || []
    } catch (error: any) {
      throw error.response.data
    }
  }

  static async add(name: string) {
    try {
      const { data } = await api.post<PostTypes.TopicPayload>('/topic/add', {
        name,
      })
      return data.data
    } catch (error: any) {
      throw error.response.data
    }
  }

  static async remove(id: string) {
    try {
      const { data } = await api.delete<PostTypes.TopicPayload>(`/topic/${id}`)
      return data.data
    } catch (error: any) {
      throw error.response.data
    }
  }
}

export default TopicApi
