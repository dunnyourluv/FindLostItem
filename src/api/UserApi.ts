import { UserTypes } from '@/types'
import { api } from '.'

class UserApi {
  static async gets() {
    try {
      const { data } = await api.get<UserTypes.Payloads>('/users')
      return data.data || []
    } catch (error: any) {
      throw error.response.data
    }
  }

  static async add(info: UserTypes.Create) {
    try {
      const formData = new FormData()
      formData.append('email', info.email)
      formData.append('username', info.username)
      formData.append('password', info.password)
      formData.append('avatar', info.avatar)
      formData.append('isAdmin', info.isAdmin ? '1' : '0')

      const { data } = await api.post<UserTypes.Payload>('/users', formData)
      return data.data
    } catch (error: any) {
      throw error.response.data
    }
  }

  static async remove(uuid: string) {
    try {
      const { data } = await api.delete<UserTypes.Payload>(`/users/${uuid}`)
      return data.data
    } catch (error: any) {
      throw error.response.data
    }
  }
}

export default UserApi
