import { MainLayout } from '@/components/Layouts'
import { RegisterForm } from './components'
import { HttpTypes, UserTypes } from '@/types'
import { AuthApi } from '@/api'
import { useAuth } from '@/hooks'
import { useNavigate } from 'react-router-dom'
import { authErrorRegister, authSuccessRegister } from '@/redux/actions'

const Register = () => {
  const { authDispatch, authState } = useAuth()
  const navigate = useNavigate()
  const handleRegister = async (info: UserTypes.Register) => {
    try {
      await AuthApi.register(info)
      authDispatch(
        authSuccessRegister('Đăng ký thành công vui lòng quay lại đăng nhập!')
      )
      navigate('/login')
    } catch (error) {
      const e = error as HttpTypes.Error
      authDispatch(authErrorRegister(e.error || ''))
    }
  }

  return (
    <MainLayout>
      <main className="bg-gray-100">
        <div className="container">
          <div className="pt-10"></div>
          <div className="p-4 bg-white rounded-md max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold text-center">Register</h1>
            <RegisterForm
              onRegister={handleRegister}
              error={authState.register.error || ''}
            />
          </div>
        </div>
      </main>
    </MainLayout>
  )
}

export default Register
