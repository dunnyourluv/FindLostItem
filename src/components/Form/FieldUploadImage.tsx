import { ArrowUpOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {
  ComponentPropsWithoutRef,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'> & {
  multiple?: boolean
  error?: string | null
  value?: File[]
  setValue?: (value: File[]) => void
}

const FieldUploadImage = ({
  className,
  multiple = false,
  onChange,
  error = '',
  value = [],
  setValue,
  ...props
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [previewImages, setPreviewImages] = useState<
    {
      url: string
      index: number
    }[]
  >([])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files
    if (inputFiles) {
      let temp = [] as File[]
      if (multiple) {
        temp = [...value, ...Array.from(inputFiles)]
      } else {
        temp = [...Array.from(inputFiles)]
      }
      setValue && setValue(temp)
      onChange && onChange(e)
    }
  }

  useEffect(() => {
    const temp = value.map((file, index) => ({
      url: URL.createObjectURL(file),
      index,
    }))
    setPreviewImages(temp)
    return () => {
      previewImages.forEach((data) => URL.revokeObjectURL(data.url))
    }
  }, [value])

  const handleUploadClick = () => {
    inputRef.current?.click()
  }

  const handleRemoveFile = (index: number) => {
    URL.revokeObjectURL(value[index].name)
    inputRef.current?.value && (inputRef.current.value = '')
    setValue && setValue(value.filter((_, i) => i !== index))
  }

  return (
    <div className={twMerge('', className)} {...props}>
      <div className="flex flex-wrap gap-2 justify-center mb-2">
        {previewImages.map((data, index) => {
          return (
            <div className="h-24 w-24 relative overflow-hidden" key={index}>
              <img
                src={data.url}
                alt={data.url}
                className="object-cover max-w-full w-full"
              />
              <div className="absolute cursor-pointer right-0 top-0 bg-white bg-opacity-50 rounded-full">
                <XMarkIcon
                  className="text-white"
                  height={20}
                  onClick={() => handleRemoveFile(index)}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div
        className={twMerge(
          'py-8 flex flex-col justify-center text-center border-dashed rounded border-gray-300 border-2 cursor-pointer  transition hover:bg-gray-200',
          error && 'border-red-500 text-red-500'
        )}
        onClick={handleUploadClick}
      >
        <ArrowUpOnSquareIcon height={24} />
        <span className="py-2">Nhấn để tải lên</span>
      </div>
      <input
        ref={inputRef}
        onChange={handleOnChange}
        type="file"
        className="hidden"
        accept="image/*"
        multiple={multiple}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  )
}

export default memo(FieldUploadImage)
