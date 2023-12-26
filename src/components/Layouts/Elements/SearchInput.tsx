import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'> & {
  onClose?: () => void
}

const SearchInput = ({ className, onClose, ...props }: Props) => {
  return (
    <div
      className={twMerge('h-[60px] px-2 flex items-center', className)}
      {...props}
    >
      <MagnifyingGlassIcon height={20} />
      <input
        placeholder="Bạn muốn tìm gì?"
        className="py-2 px-1 outline-none ml-2 w-full"
      />
      <XCircleIcon
        height={28}
        className="ml-auto text-gray-400 hover:text-black transition-all cursor-pointer"
        onClick={onClose}
      />
    </div>
  )
}

export default SearchInput
