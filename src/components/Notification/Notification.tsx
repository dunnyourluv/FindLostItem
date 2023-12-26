import { twMerge } from 'tailwind-merge'
import { Button } from '../Elements'

export type NotificationProps = {
  className?: string
  open?: boolean
  onClose?: () => void
  onConfirm?: () => void | Promise<void>
  message?: React.ReactNode
  title?: React.ReactNode
  isConfirm?: boolean
  confirmText?: string
  cancelText?: string
  isProcessing?: boolean
}

const Notification = ({
  className,
  open,
  onClose,
  message = '',
  title = 'Thông báo',
  isConfirm = false,
  confirmText = 'Xác nhận',
  cancelText = 'Huỷ bỏ',
  isProcessing = false,
  onConfirm,
}: NotificationProps) => {
  return (
    <div
      className={twMerge(
        'fixed inset-0 z-[100] justify-center items-center bg-black bg-opacity-40 hidden',
        open && 'flex',
        className
      )}
    >
      <div className="bg-white p-2 rounded max-w-md mx-auto w-full">
        {title && (
          <div className="border-b border-gray-200 py-2 mb-2">
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
        )}
        <div className="py-4">{message}</div>
        <div className="flex justify-end gap-x-1">
          <Button onClick={onClose} color="border">
            {cancelText}
          </Button>
          {isConfirm && (
            <Button color="primary" disabled={isProcessing} onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notification
