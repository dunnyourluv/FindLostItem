import { LoadAuthLayout } from './components/Layouts'
import { AppProvider, AppState } from './providers'
import AppRoutes from './routes'

const App = () => {
  return (
    <AppState>
      <AppProvider>
        <LoadAuthLayout>
          <AppRoutes />
        </LoadAuthLayout>
      </AppProvider>
    </AppState>
  )
}

export default App
