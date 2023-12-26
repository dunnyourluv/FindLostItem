import { Images } from '@/constants'

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <img
        className="w-20 h-20 mx-auto transition animate-pulse"
        src={Images.LOGO}
        alt="loading"
      />
    </div>
  )
}

export default Loading
