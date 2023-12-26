import { AuthProvider } from '.'

type Props = {
  children: React.ReactNode
}

const AppState = ({ children }: Props) => {
  return <AuthProvider>{children}</AuthProvider>
}

export default AppState
