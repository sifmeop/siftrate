import { useUser } from '~/hooks/useUser'
import { RatedList } from '~/ui/rated-list'
import { api } from '~/utils/api'

export const Rating = () => {
  const { id: userId } = useUser()

  const response = api.rate.getAllRatedMovies.useQuery({ userId })

  return <RatedList {...response} />
}
