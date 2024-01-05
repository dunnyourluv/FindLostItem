import { GlobalActions } from '@/redux/actions'
import { GlobalState } from '@/redux/reducers'
import { createContext } from 'react'

export type GlobalContextType = {
  globalState: GlobalState
  globalDispatch: React.Dispatch<GlobalActions>
}

export const GlobalContext = createContext<GlobalContextType>(
  {} as GlobalContextType
)
