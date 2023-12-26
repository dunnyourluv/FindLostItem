import { Notification } from '@/components/Notification'
import { NotificationContext } from '@/contexts'
import { useNotification } from '@/hooks'

type Props = {
  children: React.ReactNode
}
const NotificationProvider = ({ children }: Props) => {
  const { hiddenNotification, notificationProps, showNotification } =
    useNotification()
  return (
    <NotificationContext.Provider
      value={{ showNotification, hiddenNotification }}
    >
      <Notification
        className="px-4 md:px-0"
        {...notificationProps}
        onClose={() => {
          hiddenNotification()
          notificationProps?.onClose && notificationProps.onClose()
        }}
      />
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
