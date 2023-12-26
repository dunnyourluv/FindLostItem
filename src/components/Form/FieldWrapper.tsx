import { twMerge } from 'tailwind-merge'

type Props = {
  children: React.ReactNode
  error?: string | null
  label?: string
  className?: string
}

export type FieldWrapperPassThroughProps = Omit<Props, 'children' | 'className'>

export const FieldWrapper = ({ children, className, error, label }: Props) => {
  return (
    <div>
      <label className={twMerge('block', className)}>
        {label && <span className="block mb-1">{label}</span>}
        {children}
      </label>
      {error && <div className="text-red-600 text-sm italic">{error}</div>}
    </div>
  )
}
