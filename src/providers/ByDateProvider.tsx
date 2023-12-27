import { createContext, useState } from 'react'

interface ByDateContext {
  date: string
  setDate: React.Dispatch<React.SetStateAction<string>>
}

export const ByDateContext = createContext<ByDateContext | null>(null)

interface Props {
  children: React.ReactNode
}

export const ByDateProvider = ({ children }: Props) => {
  const [date, setDate] = useState('0')

  const value = {
    date,
    setDate
  }

  return (
    <ByDateContext.Provider value={value}>{children}</ByDateContext.Provider>
  )
}
