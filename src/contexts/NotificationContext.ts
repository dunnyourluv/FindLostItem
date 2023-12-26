import { NotificationProps } from '@/components/Notification'
import { createContext } from 'react'

type Props = {
  showNotification: (props: Omit<NotificationProps, 'open'>) => void
  hiddenNotification: () => void
}

export const NotificationContext = createContext<Props>({
  showNotification: () => {},
  hiddenNotification: () => {},
})
