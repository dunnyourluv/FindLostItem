import { PostApi } from '@/api'
import { Card } from '@/components/Card'
import { Button } from '@/components/Elements'
import { FieldInput } from '@/components/Form'
import { MainLayout } from '@/components/Layouts'
import { PostTypes } from '@/types'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

type SearchValues = {
  keyword: string
  address: string
}

const Home = () => {
  const [posts, setPosts] = useState<PostTypes.Instance[]>([])
  const [searchValues, setSearchValues] = useState<SearchValues>({
    keyword: '',
    address: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await PostApi.getRecommended()
        setPosts(posts)
      } catch (error: any) {
        console.log(error)
      }
    }

    fetchPosts()
  }, [])

  const handleSearchInputChange = (key: keyof SearchValues, value: string) =>
    setSearchValues({ ...searchValues, [key]: value })

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { keyword, address } = searchValues
    navigate(`/search?keyword=${keyword}&address=${address}`)
  }

  return (
    <MainLayout navbarEffect="sticky">
      <section
        className={twMerge(
          'relative h-screen pt-[60px] -mt-[60px]',
          "bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-center bg-cover bg-no-repeat"
        )}
      >
        <div className="absolute z-0 bg-black opacity-40 inset-0"></div>
        <div className="relative z-1 mt-4 container">
          <div className="text-white text-center">
            <h1 className="text-4xl font-semibold">
              Tìm đồ thất lạc trực tuyến
            </h1>
            <p className="text-lg mt-4">Tìm đồ thất lạc bất cứ nơi đâu</p>
          </div>
          <form
            className="bg-white mx-auto rounded-md p-4 mt-10 shadow flex flex-wrap"
            onSubmit={handleSearch}
          >
            <div className="mb-4 md:w-1/2 w-full lg:w-1/3 lg:px-2 md:mb-0">
              <FieldInput
                label="Từ khoá?"
                className="w-full"
                onChange={(e) =>
                  handleSearchInputChange('keyword', e.target.value)
                }
              />
            </div>
            <div className="mb-8 md:w-1/2 w-full lg:w-1/3 lg:px-2 md:mb-0">
              <FieldInput
                label="Địa chỉ"
                className="w-full"
                onChange={(e) =>
                  handleSearchInputChange('address', e.target.value)
                }
              />
            </div>
            <div className="md:w-1/2 w-full lg:w-1/3 lg:px-2 md:mb-0">
              <Button className="w-full" type="submit">
                <MagnifyingGlassIcon height={20} />
                <span className="ml-2 text-sm">Tìm kiếm</span>
              </Button>
            </div>
          </form>
        </div>
      </section>
      {posts.length > 0 && (
        <section className="pt-10 container">
          <h2 className="text-2xl text-center mb-8 font-semibold">
            Các bài đăng gần đây
          </h2>
          <Card.Grid>
            {posts.map((post) => (
              <Card key={post.uuid} info={post} />
            ))}
          </Card.Grid>
        </section>
      )}
    </MainLayout>
  )
}

export default Home
