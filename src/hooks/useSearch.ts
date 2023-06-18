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
      select: (data) =>
        data.results.filter(
          (item) =>
            item.hasOwnProperty('media_type') && item.media_type !== 'person'
        )
    }
  )

  return { data, isLoading, isError }
}
