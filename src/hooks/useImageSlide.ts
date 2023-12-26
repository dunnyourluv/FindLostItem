import { useEffect, useState } from 'react'

const useImageSlide = <T>(images: T[]) => {
  const [currentImage, setCurrentImage] = useState<T>(images[0])
  useEffect(() => {
    setCurrentImage(images[0])
  }, [images])

  const nextImage = () => {
    const currentIndex = images.indexOf(currentImage)
    const nextIndex = currentIndex + 1 === images.length ? 0 : currentIndex + 1
    setCurrentImage(images[nextIndex])
  }

  const prevImage = () => {
    const currentIndex = images.indexOf(currentImage)
    const prevIndex =
      currentIndex - 1 === -1 ? images.length - 1 : currentIndex - 1
    setCurrentImage(images[prevIndex])
  }

  return {
    currentImage,
    nextImage,
    prevImage,
  }
}

export default useImageSlide
