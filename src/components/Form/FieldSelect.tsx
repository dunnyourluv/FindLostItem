import { Fragment, memo, useEffect, useMemo, useState } from 'react'

import { Listbox, Transition } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FieldWrapper, FieldWrapperPassThroughProps } from '.'

export type SelectOption = {
  label: string
  value: string
}

type Props = FieldWrapperPassThroughProps & {
  className?: string
  onChange: (value: SelectOption) => void
  options?: SelectOption[]
  listBoxClassName?: string
  value?: SelectOption
}

const FieldSelect = ({
  error,
  label = '',
  options = [],
  className,
  listBoxClassName,
  value,
  onChange,
}: Props) => {
  const [firstOption, setFirstOption] = useState<SelectOption | null>(null)
  useEffect(() => {
    if (options.length > 0) {
      onChange(options[0])
      setFirstOption(options[0])
    }
  }, [options])

  useEffect(() => {
    if (value) {
      onChange(value)
    }
  }, [value])

  const showLabel = useMemo(() => {
    return (
      value?.value !== firstOption?.value && value?.label !== firstOption?.label
    )
  }, [value])

  const handleChange = (option: SelectOption) => {
    onChange(option)
    onChange && onChange(option)
  }

  return (
    <FieldWrapper error={error} className={twMerge('relative', className)}>
      <span
        className={twMerge(
          'block  absolute w-full opacity-0 transition-all top-1/2 left-0 -translate-y-1/2 invisible',
          showLabel &&
            'visible top-0 -translate-y-0 opacity-100 text-gray-600 text-sm'
        )}
      >
        {firstOption?.label}
      </span>
      <Listbox value={value} onChange={handleChange}>
        <div className={twMerge('relative pt-2 z-10', listBoxClassName)}>
          <Listbox.Button
            className={twMerge(
              'pt-3 pb-2 w-full border-b-2 hover:border-primary transition-all text-left flex items-center justify-between'
            )}
          >
            <span className="block truncate">{value?.label || label}</span>
            <ChevronDownIcon className="h-4 w-4" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={twMerge(
                'border-primary border-t-2 rounded-b shadow absolute w-full bg-white'
              )}
            >
              {options.map((option, optionIndex) => (
                <Listbox.Option
                  className="p-2 text-base transition-all hover:font-bold cursor-pointer"
                  key={option.value}
                  value={option}
                >
                  {({ selected }) => {
                    return (
                      <>
                        <span
                          className={twMerge(
                            selected && 'font-bold',
                            'truncate block'
                          )}
                        >
                          {option.label}
                        </span>
                        {optionIndex !== options.length - 1 && (
                          <span className="block w-full h-px bg-gray-200 mt-2"></span>
                        )}
                      </>
                    )
                  }}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </FieldWrapper>
  )
}

export default memo(FieldSelect)
