import { PostApi } from '@/api'
import { Card } from '@/components/Card'
import { AuthLayout, MainLayout } from '@/components/Layouts'
import { PostTypes } from '@/types'
import { useEffect, useState } from 'react'
import { ManagerCard } from './components'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/Elements'
import { useCountPendingPosts } from '@/hooks'

const ManagerPost = () => {
  const [posts, setPosts] = useState<PostTypes.Instance[]>([])
  const [loading, setLoading] = useState(false)
  const [_, setCountPendingPosts] = useCountPendingPosts()
  const fetch = async () => {
    setLoading(true)
    try {
      const posts = await PostApi.getsPending()
      setPosts(posts)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    setCountPendingPosts(posts.length)
  }, [posts.length])

  const updateStatusPost = (post: PostTypes.Instance) => {
    setPosts((prev) => prev.filter((p) => p.uuid !== post.uuid))
  }

  return (
    <AuthLayout>
      <MainLayout>
        <main className="bg-gray-100">
          <div className="container">
            <div className="flex items-center pt-2">
              <h2 className="text-2xl font-semibold">
                Các bài viết đang chờ phê duyệt
              </h2>
              <Button
                size="sm"
                color="border"
                className="border-primary text-primary ml-2"
                onClick={fetch}
                loading={loading}
              >
                <ArrowPathIcon height={24} /> Làm mới
              </Button>
            </div>
            <div className="">
              <Card.Grid>
                {posts.map((post) => (
                  <ManagerCard
                    info={post}
                    key={post.uuid}
                    onValueChange={updateStatusPost}
                  />
                ))}
              </Card.Grid>
            </div>
          </div>
        </main>
      </MainLayout>
    </AuthLayout>
  )
}

export default ManagerPost
