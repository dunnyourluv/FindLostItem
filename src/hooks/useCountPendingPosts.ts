import { globalCountPosts } from '@/redux/actions'
import { useGlobalState } from '.'

const useCountPendingPosts = () => {
  const { globalDispatch, globalState } = useGlobalState()

  const setCount = (count: number) => {
    globalDispatch(globalCountPosts(count))
  }

  return [globalState.posts.count, setCount] as const
}

export default useCountPendingPosts
