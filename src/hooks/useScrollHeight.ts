import { useEffect, useState } from 'react'

const useScrollHeight = () => {
  const [scrollHeight, setScrollHeight] = useState(0)

  const handleScroll = () => {
    const position = window.scrollY
    setScrollHeight(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollHeight
}

export default useScrollHeight
