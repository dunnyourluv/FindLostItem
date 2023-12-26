import { BrowserRouter } from 'react-router-dom'
import { NotificationProvider } from '.'

type Props = {
  children: React.ReactNode
}
const AppProvider = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <NotificationProvider>{children}</NotificationProvider>
    </BrowserRouter>
  )
}

export default AppProvider
