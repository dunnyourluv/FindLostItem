import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const axiosParams = {
  baseURL: 'http://localhost:8080/api/v1',
}

const instance: AxiosInstance = axios.create(axiosParams)

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Basic ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

const api = {
  get<T>(url: string, config?: AxiosRequestConfig) {
    return instance.get<T>(url, config)
  },
  delete<T>(url: string, config?: AxiosRequestConfig) {
    return instance.delete<T>(url, config)
  },
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return instance.post<T>(url, data, config)
  },
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return instance.put<T>(url, data, config)
  },
  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return instance.patch<T>(url, data, config)
  },
}

export default api

