import { PostApi } from '@/api'
import { Card } from '@/components/Card'
import { Button } from '@/components/Elements'
import { useNotification } from '@/hooks'
import { PostTypes } from '@/types'
import { ComponentPropsWithoutRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'> & {
  info: PostTypes.Card
  onValueChange?: (value: PostTypes.Instance) => void
}

const ManagerCard = ({ info, className, onValueChange, ...props }: Props) => {
  const [status, setStatus] = useState<'accept' | 'reject' | 'free'>('free')
  const { showNotification } = useNotification()
  const handleAccept = async (uuid: string) => {
    setStatus('accept')
    try {
      const post = await PostApi.accept(uuid)
      onValueChange && post && onValueChange(post)
    } catch (error: any) {
      showNotification({
        title: 'Thất bại',
        message: error.error,
      })
    } finally {
      setStatus('free')
    }
  }

  const handleReject = async (uuid: string) => {
    setStatus('reject')
    try {
      const post = await PostApi.reject(uuid)
      onValueChange && post && onValueChange(post)
    } catch (error: any) {
      showNotification({
        title: 'Thất bại',
        message: error.error,
      })
    } finally {
      setStatus('free')
    }
  }

  return (
    <div className={twMerge('py-4', className)} {...props}>
      <Card info={info} />
      <div className="flex gap-x-2 mt-2">
        <Button
          className="w-1/2"
          onClick={() => handleAccept(info.uuid)}
          loading={status === 'accept'}
        >
          Phê Duyệt
        </Button>
        <Button
          color="border"
          className="border-red-500 text-red-500 w-1/2 "
          onClick={() => handleReject(info.uuid)}
          loading={status === 'reject'}
        >
          Từ Chối
        </Button>
      </div>
    </div>
  )
}

export default ManagerCard
