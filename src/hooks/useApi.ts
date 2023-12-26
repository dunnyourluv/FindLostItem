import { useCallback, useState } from 'react'

type ApiFunction<T = unknown> = (...params: unknown[]) => Promise<T> | T

const useApi = <TData = unknown, TError = unknown>(
  apiFunction: ApiFunction<TData>
) => {
  const [data, setData] = useState<TData | null>(null)
  const [error, setError] = useState<TError | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const request = useCallback(
    async (...params: unknown[]) => {
      setIsLoading(true)
      try {
        const response = await apiFunction(...params)
        setData(response)
        setError(null)
      } catch (error: any) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    },
    [apiFunction]
  )

  return { data, error, isLoading, request }
}

export default useApi
