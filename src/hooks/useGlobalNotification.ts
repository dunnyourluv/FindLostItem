import { NotificationContext } from '@/contexts'
import { useContext } from 'react'

const useGlobalNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useGlobalNotification must be used within a NotificationProvider'
    )
  }

  return context
}

export default useGlobalNotification
