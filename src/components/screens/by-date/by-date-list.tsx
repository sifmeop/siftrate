import { useUser } from '~/hooks/useUser'
import { useByDateStore } from '~/store/by-date'
import { RatedList } from '~/ui/rated-list'
import { api } from '~/utils/api'

export const ByDateMovieList = () => {
  const { id } = useUser()

  const { selectedMonth, selectedYear } = useByDateStore()

  const response = api.movie.getByDateMovies.useQuery({
    userId: id,
    selectedMonth,
    selectedYear
  })

  return <RatedList {...response} />
}
