import { MainLayout } from '@/components/Layouts'
import { LoginForm } from './components'
import { HttpTypes, UserTypes } from '@/types'
import { useAuth } from '@/hooks'
import {
  authErrorLogin,
  authStartLogin,
  authSuccessLogin,
} from '@/redux/actions'
import { AuthApi } from '@/api'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const { authDispatch, authState } = useAuth()
  const navigate = useNavigate()
  const handleLogin = async (info: UserTypes.Login) => {
    authDispatch(authStartLogin())
    try {
      const user = await AuthApi.login(info)
      if (user) {
        authDispatch(authSuccessLogin(user))
        AuthApi.writeToLocal(info.username, info.password)
        navigate('/')
      } else {
        authDispatch(authErrorLogin('Something went wrong'))
      }
    } catch (error: any) {
      const e = error as HttpTypes.Error
      authDispatch(authErrorLogin(e.error || ''))
    }
  }

  return (
    <MainLayout>
      <main className="bg-gray-100">
        <div className="container">
          <div className="pt-10"></div>
          <div className="p-4 bg-white rounded-md max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold text-center">Login</h1>
            <LoginForm
              onLogin={handleLogin}
              error={authState.login.error || ''}
            />
          </div>
        </div>
      </main>
    </MainLayout>
  )
}

export default Login
