import { useContext } from 'react'
import { ByDateContext } from '../providers/ByDateProvider'

export const useByDate = () => {
  const values = useContext(ByDateContext)

  return values
}
