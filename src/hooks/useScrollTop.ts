import { useEffect } from 'react'

const useScrollTop = <T>(dependency: T) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [dependency])
}

export default useScrollTop
