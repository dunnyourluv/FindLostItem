import { AuthProvider, GlobalProvider } from '.'

type Props = {
  children: React.ReactNode
}

const AppState = ({ children }: Props) => {
  return (
    <GlobalProvider>
      <AuthProvider>{children}</AuthProvider>
    </GlobalProvider>
  )
}

export default AppState
