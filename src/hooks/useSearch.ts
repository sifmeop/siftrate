import { fetchMovies } from '@/utils/fetchMovies'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from './useDebounce'

export const useSearch = (query: string) => {
  const debounced = useDebounce(query)

  const { data, isLoading, isError } = useQuery(
    ['search', debounced],
    () => fetchMovies(debounced),
    {
      enabled: debounced.length > 0,
      select: (data) => data.results
    }
  )

  return { data, isLoading, isError }
}
