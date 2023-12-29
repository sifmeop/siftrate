export const ROUTES = {
  HOME: '/',
  RATE: '/rate',
  RATING: '/rating',
  BY_DATE: '/by-date',
  SEARCH: '/search'
}

export const MOVIE_DB_API_KEY = '2e418a90d6fed4aa1bdf54489a9ec741'

export const MOVIE_DB_API_URL = 'https://api.themoviedb.org/3'

export const MOVIE_DB_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

export const startYear = 2023
export const currentYear = new Date().getFullYear()
export const currentMonth = new Date().getMonth() + 1

export const years = Array.from(
  { length: currentYear - startYear + 1 },
  (_, i) => startYear + i
)

export const months = [
  { id: 1, title: 'Январь' },
  { id: 2, title: 'Февраль' },
  { id: 3, title: 'Март' },
  { id: 4, title: 'Апрель' },
  { id: 5, title: 'Май' },
  { id: 6, title: 'Июнь' },
  { id: 7, title: 'Июль' },
  { id: 8, title: 'Август' },
  { id: 9, title: 'Сентябрь' },
  { id: 10, title: 'Октябрь' },
  { id: 11, title: 'Ноябрь' },
  { id: 12, title: 'Декабрь' }
]

export const defaultContainerWidth = 'mx-auto flex flex-col max-w-3xl gap-6'
