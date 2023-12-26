import { FieldInput } from '@/components/Form'
import { Disclosure } from '@headlessui/react'
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
  value?: string
  onChange?: (value: string) => void
}

const SearchInput = ({ className, value = '', onChange }: Props) => {
  return (
    <div
      className={twMerge(
        'flex items-center px-2 rounded justify-between shadow relative bg-white',
        className
      )}
    >
      <MagnifyingGlassIcon height={22} />
      <input
        type="text"
        className="px-2 w-full outline-none py-4 text-sm"
        placeholder="Bạn muốn tìm gì?"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
      <Disclosure>
        <Disclosure.Button className="inline-flex items-center font-bold text-sm">
          Filters
          <AdjustmentsHorizontalIcon height={22} className="text-primary" />
        </Disclosure.Button>
        <Disclosure.Panel className="px-2 pt-4 pb-10 border border-gray-300 border-t-transparent rounded-b absolute top-full z-[3] bg-white shadow left-0 w-full">
          <div className="mb-2">
            <FieldInput label="Tìm ở?" />
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}

export default SearchInput
