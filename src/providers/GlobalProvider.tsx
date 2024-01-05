import { GlobalContext } from '@/contexts'
import { globalReducer, initialGlobalState } from '@/redux/reducers'
import { useReducer } from 'react'

type Props = {
  children: React.ReactNode
}

const GlobalProvider = ({ children }: Props) => {
  const [globalState, globalDispatch] = useReducer(
    globalReducer,
    initialGlobalState
  )
  return (
    <GlobalContext.Provider value={{ globalState, globalDispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
