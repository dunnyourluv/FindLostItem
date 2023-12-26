import { Card } from '@/components/Card'
import { MainLayout } from '@/components/Layouts'
import { SearchInput } from './components'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PostTypes } from '@/types'
import { PostApi } from '@/api'

const Search = () => {
  const [searchParams] = useSearchParams()
  const [posts, setPosts] = useState<PostTypes.Instance[]>([])
  useEffect(() => {
    const keyword = searchParams.get('keyword') || ''
    const topic = searchParams.get('topic') || ''
    const address = searchParams.get('address') || ''
    const fetchPosts = async () => {
      try {
        const posts = await PostApi.search(keyword, topic, address)
        setPosts(posts)
      } catch (error: any) {
        console.log(error)
      }
    }

    fetchPosts()
  }, [searchParams])

  return (
    <MainLayout>
      <main className="bg-gray-100">
        <div className="flex flex-wrap container md:py-10">
          <div className="w-full md:w-3/12 md:pr-2">
            <SearchInput value={searchParams.get('keyword') || ''} />
          </div>

          <section className="py-10 md:py-0 w-full md:w-9/12 md:pl-2">
            <Card.Grid>
              {posts.map((post) => (
                <Card key={post.uuid} info={post} />
              ))}
            </Card.Grid>
          </section>
        </div>
      </main>
    </MainLayout>
  )
}

export default Search
