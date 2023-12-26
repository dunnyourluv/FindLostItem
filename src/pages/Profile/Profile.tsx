import { PostApi } from '@/api'
import { Card } from '@/components/Card'
import { AuthLayout, MainLayout } from '@/components/Layouts'
import { useAuth } from '@/hooks'
import { PostTypes } from '@/types'
import { PostStatus } from '@/types/Post'
import { useEffect, useState } from 'react'

const Profile = () => {
  const { authState } = useAuth()
  const [posts, setPosts] = useState<PostTypes.Instance[]>([])
  const user = authState.login.user

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await PostApi.getMyPosts()
        setPosts(posts)
      } catch (error: any) {
        console.log(error)
      }
    }

    fetchPosts()
  }, [])

  const getStatus = (status: PostStatus) => {
    switch (status) {
      case PostStatus.PENDING:
        return {
          text: 'Đang chờ phê duyệt',
          tagType: 'primary',
        }
      case PostStatus.PUBLISHED:
        return {
          text: 'Đã được phê duyệt',
          tagType: 'success',
        }
      case PostStatus.REJECTED:
        return {
          text: 'Bị từ chối',
          tagType: 'danger',
        }
      default:
        return {
          text: 'Không xác định',
          tagType: 'primary',
        }
    }
  }

  return (
    <AuthLayout>
      <MainLayout>
        <main className="bg-gray-100">
          <div className="h-40 bg-gray-300 container relative">
            <div className="h-20 w-20 rounded-full overflow-hidden absolute -bottom-10 left-1/2 -translate-x-1/2 border-2 border-primary">
              <img
                src={user?.avatar}
                alt={user?.username}
                className="max-w-full w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-12 text-center container">
            <span className="font-bold text-lg">{user?.username}</span>
          </div>
          {posts.length > 0 && (
            <div className="container mt-6">
              <h1 className="font-semibold text-xl">Các bài đăng của bạn</h1>
              <div className="">
                <Card.Grid>
                  {posts.map((post) => (
                    <Card
                      tagType={getStatus(post.status).tagType as any}
                      key={post.uuid}
                      info={{
                        ...post,
                        user: {
                          ...post.user,
                          username: getStatus(post.status).text,
                        },
                      }}
                    />
                  ))}
                </Card.Grid>
              </div>
            </div>
          )}
        </main>
      </MainLayout>
    </AuthLayout>
  )
}

export default Profile
