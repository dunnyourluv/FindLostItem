import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'> & {
  logo?: React.ReactNode
  title?: string
}

const Instance = ({
  className,
  logo,
  title = '',
  children,
  ...props
}: Props) => {
  return (
    <div
      className={twMerge(
        'py-4 px-2 border border-gray-200 rounded bg-white',
        className
      )}
      {...props}
    >
      <div className="flex items-center mb-2 pb-2 border-b border-gray-200">
        {logo && <div className="bg-primary p-2 rounded-full">{logo}</div>}
        <h3 className={twMerge(logo && 'ml-2')}>{title}</h3>
      </div>
      {children}
    </div>
  )
}

type ItemProps = ComponentPropsWithoutRef<'div'> & {
  title?: string
  line?: boolean
}

const FieldItem = ({
  className,
  children,
  title,
  line = false,
  ...props
}: ItemProps) => {
  return (
    <div
      className={twMerge(
        'pb-2 mb-2',
        line && 'border-b border-gray-200',
        className
      )}
      {...props}
    >
      <div className="flex items-center mb-1">
        <h3 className="font-bold text-sm">{title}</h3>
      </div>
      {children}
    </div>
  )
}

const FieldBox = Object.assign(Instance, { Item: FieldItem })

export default FieldBox
