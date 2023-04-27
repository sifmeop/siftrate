import { api } from '@/utils/api'
import { type RatedMovie } from '@prisma/client'
import { useSession } from 'next-auth/react'

export const useRatedMovies = () => {
  const { data: session } = useSession()

  const userId = session?.user.id as string

  const { data, isLoading, isError } = api.rate.getAllRatedMovies.useQuery(
    {
      userId
    },
    { enabled: !!userId }
  )

  const mutation = api.rate.createRate.useMutation<RatedMovie>()

  const handleCreateRate = async (
    input: Omit<RatedMovie, 'id' | 'userId' | 'date' | 'month' | 'year'>
  ) => {
    let message
    try {
      await mutation.mutateAsync({
        title: input.title,
        poster: input.poster,
        rated: input.rated,
        comment: input.comment ?? '',
        userId: userId,
        date: new Date().toISOString(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
      })
      message = 'Успешно оценено'
    } catch (error: unknown) {
      message = (error as Error).message
      console.log(error)
    }

    return message
  }

  return {
    data,
    isLoading,
    isError,
    handleCreateRate
  }
}
