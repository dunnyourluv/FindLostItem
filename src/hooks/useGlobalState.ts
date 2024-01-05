import { GlobalContext } from '@/contexts'
import { useContext } from 'react'

const useGlobalState = () => {
  const context = useContext(GlobalContext)
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalProvider')
  }
  return context
}

export default useGlobalState
