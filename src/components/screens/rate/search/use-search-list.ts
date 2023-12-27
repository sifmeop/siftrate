import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '~/hooks/useDebounce'
import { type MovieDBSearch } from '~/types/movie-db-search.interface'
import { MOVIE_DB_API_KEY, MOVIE_DB_API_URL } from '~/utils/constants'

export interface Search {
  page: number
  results: MovieDBSearch[]
  total_pages: number
  total_results: number
}

const fetchMovies = async (query: string): Promise<Search> => {
  const url = `${MOVIE_DB_API_URL}/search/multi?api_key=${MOVIE_DB_API_KEY}&query=${query}&language=ru-RU`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Ошибка при выполнении запроса')
    }

    const data = (await response.json()) as Search
    return data
  } catch (error) {
    console.error('Произошла ошибка:', error)
    throw error
  }
}

export const useSearchList = (value: string) => {
  const debounced = useDebounce(value)

  const query = useQuery(['search', debounced], () => fetchMovies(debounced), {
    enabled: debounced.length > 0,
    select: (data) =>
      data.results.filter(
        (item) =>
          item.hasOwnProperty('media_type') && item.media_type !== 'person'
      )
  })

  return query
}
