import { type Month } from '@/types/months.interface'
import { signIn, signOut } from 'next-auth/react'

export const API_KEY = '2e418a90d6fed4aa1bdf54489a9ec741'

export const API_URL = 'https://api.themoviedb.org/3'

export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

export const MONTHS: Month[] = [
  { id: 1, title: 'Январь', count: 0 },
  { id: 2, title: 'Февраль', count: 0 },
  { id: 3, title: 'Март', count: 0 },
  { id: 4, title: 'Апрель', count: 0 },
  { id: 5, title: 'Май', count: 0 },
  { id: 6, title: 'Июнь', count: 0 },
  { id: 7, title: 'Июль', count: 0 },
  { id: 8, title: 'Август', count: 0 },
  { id: 9, title: 'Сентябрь', count: 0 },
  { id: 10, title: 'Октябрь', count: 0 },
  { id: 11, title: 'Ноябрь', count: 0 },
  { id: 12, title: 'Декабрь', count: 0 }
]

export const currentMonth: number = new Date().getMonth() + 1

const startYear = 2023
export const currentYear: number = new Date().getFullYear()

export const years: number[] = Array.from(
  { length: currentYear - startYear + 1 },
  (_, i) => startYear + i
)

export const handleLogin = async () => await signIn()

export const handleLogout = async () => await signOut()
