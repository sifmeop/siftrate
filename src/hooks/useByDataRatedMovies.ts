import { type ByData } from '@/types/by-data.interface'
import { api } from '@/utils/api'
import { useSession } from 'next-auth/react'

export const useByDataRatedMovies = ({ month, year }: ByData) => {
  const { data: session } = useSession()

  const userId = session?.user.id as string

  const { data, isLoading, isError, refetch } =
    api.rate.getByDataRatedMovies.useQuery({ userId, month, year })

  const handleByDataRatedMovies = async () => {
    if (!userId) return

    try {
      await refetch()
    } catch (error) {
      console.log(error)
    }
  }

  return { data, isLoading, isError, handleByDataRatedMovies }
}
