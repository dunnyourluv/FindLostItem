import { UserTypes } from '@/types'
import { api } from '.'

class AuthApi {
  static async login(info: UserTypes.Login) {
    try {
      const { data } = await api.post<UserTypes.Payload>('/auth/login', info)
      return data.data
    } catch (error: any) {
      throw error.response.data
    }
  }

  static async register(info: UserTypes.Register) {
    const formData = new FormData()

    formData.append('email', info.email)
    formData.append('username', info.username)
    formData.append('password', info.password)
    formData.append('avatar', info.avatar)

    try {
      const { data } = await api.post<UserTypes.Payload>(
        '/auth/register',
        formData
      )
      return data.data
    } catch (e: any) {
      throw e.response.data
    }
  }

  static writeToLocal(username: string, password: string) {
    const base64 = btoa(`${username}:${password}`)
    localStorage.setItem('token', base64)
  }

  static readFromLocal() {
    const token = localStorage.getItem('token')
    if (!token) {
      return null
    }
    const [username, password] = atob(token).split(':')
    return { username, password }
  }

  static removeFromLocal() {
    localStorage.removeItem('token')
  }
}

export default AuthApi
