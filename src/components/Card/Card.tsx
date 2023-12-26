import { MyText } from '@/utils'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'
import CardGrid from './CardGrid'
import { Link } from 'react-router-dom'
import { PostTypes } from '@/types'

const TAG_TYPES = {
  primary: 'text-white bg-white border border-white',
  success: 'text-white bg-green-500 border border-green-500',
  danger: 'text-white bg-red-500 border border-red-500',
}

type Props = ComponentPropsWithoutRef<'div'> & {
  info: PostTypes.Card
  allowHandle?: boolean
  tagType?: keyof typeof TAG_TYPES
}

const Instance = ({
  className,
  info,
  allowHandle = false,
  tagType = 'primary',
  ...props
}: Props) => {
  return (
    <div
      className={twMerge(
        'overflow-hidden group border rounded-md block',
        className
      )}
      {...props}
    >
      <Link to={`/posts/${info.uuid}`} className="relative block">
        <div
          className={twMerge(
            'absolute z-[2]  py-2 px-6 top-3 left-3 bg-opacity-30 rounded-md',
            TAG_TYPES[tagType]
          )}
        >
          {info.user.username}
        </div>
        <div className="h-64">
          {info.images.length === 0 && (
            <div className="w-full h-full bg-gray-400"></div>
          )}
          {info.images.length > 0 && (
            <img
              key={info.images[0].uuid}
              className="block w-full max-w-full brightness-90 object-cover group-hover:brightness-75"
              src={info.images[0].url}
              alt="image"
            />
          )}
        </div>
        <div className="absolute bottom-0 w-full p-3 transition-all bg-white translate-y-1/3 group-hover:translate-y-0">
          <h3 className="font-semibold text-lg">{info.title}</h3>
          <p className="text-sm">{MyText.ellipsis(info.content, 100)}</p>
          <div className="inline-flex justify-center items-center">
            <MapPinIcon height={14} className="mr-1" />
            <span className="text-sm">{info.location}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

const Card = Object.assign(Instance, {
  Grid: CardGrid,
})
export default Card
