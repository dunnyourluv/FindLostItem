import { NotificationProps } from '@/components/Notification/Notification'
import { useState } from 'react'

const useNotification = () => {
  const [notificationProps, setNotificationProps] =
    useState<NotificationProps>()

  const showNotification = (props: Omit<NotificationProps, 'open'>) => {
    setNotificationProps({ ...props, open: true })
  }

  const hiddenNotification = () => {
    setNotificationProps({ ...notificationProps, open: false })
  }
  return { showNotification, hiddenNotification, notificationProps }
}

export default useNotification
