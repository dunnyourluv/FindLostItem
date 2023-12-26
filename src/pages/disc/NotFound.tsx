import { Button } from '@/components/Elements'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main className="fixed inset-0 flex justify-center items-center flex-col">
      <h1 className="text-4xl">404</h1>
      <p className="text-xl">Page not found</p>
      <Link to="/">
        <Button className="mt-4">Back to home</Button>
      </Link>
    </main>
  )
}

export default NotFound
