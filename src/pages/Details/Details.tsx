import { MainLayout } from '@/components/Layouts'
import { useNavigate, useParams } from 'react-router-dom'
import { PostBox } from './components'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Bars3Icon,
  InboxStackIcon,
} from '@heroicons/react/24/outline'
import { Card } from '@/components/Card'
import {
  useAuth,
  useGlobalNotification,
  useImageSlide,
  useScrollTop,
} from '@/hooks'
import { useEffect, useMemo, useState } from 'react'
import { PostTypes } from '@/types'
import { PostApi } from '@/api'
import { User } from '@/components/User'
import { Button } from '@/components/Elements'

const Details = () => {
  const [post, setPost] = useState<PostTypes.Instance | null>(null)
  const [recommendPosts, setRecommendPosts] = useState<PostTypes.Instance[]>([])
  const { showNotification } = useGlobalNotification()

  const navigate = useNavigate()

  const { authState } = useAuth()

  const { uuid } = useParams<{ uuid: string }>()

  useScrollTop(post)
  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (uuid) {
          const post = await PostApi.get(uuid)
          setPost(post)
        }
      } catch (error: any) {
        console.log(error)
      }
    }

    const fetchRecommendedPosts = async () => {
      try {
        const posts = await PostApi.getRecommended()
        setRecommendPosts(posts.filter((post) => post.uuid !== uuid))
      } catch (error: any) {
        console.log(error)
      }
    }
    fetchRecommendedPosts()
    fetchPost()
  }, [uuid])
  const { currentImage, nextImage, prevImage } = useImageSlide(
    post?.images || []
  )

  const isOwner = useMemo(
    () => authState.login.user?.uuid === post?.user.uuid,
    [authState.login.user?.uuid, post?.user.uuid]
  )

  const handleDeleteBtnClick = async () => {
    showNotification({
      message: 'Bạn có chắc chắn muốn xoá nội dung này?',
      isConfirm: true,
      confirmText: 'Xoá',
      onConfirm: async () => {
        if (post) {
          try {
            await PostApi.delete(post.uuid)
            showNotification({
              title: 'Thành công',
              message: 'Đã xoá bài viết thành công',
              cancelText: 'Trở về',
              onClose: () => {
                navigate('/profile')
              },
            })
          } catch (error) {
            console.log(error)
          }
        }
      },
    })
  }

  const handleEditClick = () => {
    navigate('/posts/' + post?.uuid + '/edit')
  }

  return (
    <MainLayout>
      <main className="bg-gray-100">
        {post && (
          <div className="">
            <div className="h-72 flex relative">
              {currentImage ? (
                <div className="w-full">
                  <img
                    className="object-cover w-full h-full"
                    src={currentImage.url}
                    alt={currentImage.uuid}
                  />
                  <div
                    onClick={prevImage}
                    className="absolute top-1/2 -translate-y-1/2 bg-white p-2 rounded-full right-0 opacity-30 cursor-pointer transition-all hover:opacity-70"
                  >
                    <ArrowRightIcon height={22} />
                  </div>
                  <div
                    onClick={nextImage}
                    className="absolute top-1/2 -translate-y-1/2 bg-white p-2 rounded-full  left-0 opacity-30 cursor-pointer transition-all hover:opacity-70"
                  >
                    <ArrowLeftIcon height={22} />
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gray-300"></div>
              )}
            </div>
            <div className="container my-10">
              <h1 className="font-semibold text-2xl">{post?.title}</h1>
              {isOwner && (
                <div className="flex justify-end gap-x-2">
                  <Button onClick={handleEditClick}>Chỉnh sửa</Button>
                  <Button className="bg-red-500" onClick={handleDeleteBtnClick}>
                    Xoá
                  </Button>
                </div>
              )}
            </div>
            <div className="container">
              <PostBox className="mb-6">
                <div className="flex mb-4">
                  <Bars3Icon height={22} />
                  <span className="ml-1">Người đăng</span>
                </div>
                <User
                  name={post.user.username}
                  src={post.user.avatar}
                  alt={post.user.username}
                />
                <div className="flex mt-4">
                  <InboxStackIcon height={24} className="mr-2" />
                  {post.user.email}
                </div>
              </PostBox>
              <PostBox className="mb-6">
                <div className="flex mb-4">
                  <Bars3Icon height={22} />
                  <span className="ml-1">Chi tiết</span>
                </div>
                <p>{post?.content}</p>
              </PostBox>
              <PostBox className="mb-6">
                <div className="flex mb-4">
                  <Bars3Icon height={22} />
                  <span className="ml-1">Địa chỉ</span>
                </div>
                <p>{post?.location}</p>
              </PostBox>
            </div>
            <div className="container mt-10">
              <h2 className="font-semibold text-center text-xl">
                Bạn có thể quan tâm
              </h2>
              <Card.Grid>
                {recommendPosts.map((post) => (
                  <Card key={post.uuid} info={post} />
                ))}
              </Card.Grid>
            </div>
          </div>
        )}
      </main>
    </MainLayout>
  )
}

export default Details
