import {
  type MutationDelete,
  type MutationEdit
} from '@/types/mutation.interface'
import { api } from '@/utils/api'
import { useToast } from '@chakra-ui/react'
import { type RatedMovie } from '@prisma/client'
import { useSession } from 'next-auth/react'

export const useRatedMovies = () => {
  const toast = useToast({
    status: 'success',
    isClosable: true,
    position: 'top',
    duration: 1000
  })

  const { data: session } = useSession()

  const userId = session?.user.id as string

  const { data, isLoading, isError, refetch } =
    api.rate.getAllRatedMovies.useQuery(
      {
        userId
      },
      { enabled: !!userId }
    )

  // create rate

  const mutationCreateRate = api.rate.createRate.useMutation<RatedMovie>()

  const handleCreateRate = async (
    input: Omit<RatedMovie, 'id' | 'userId' | 'date' | 'month' | 'year'>
  ) => {
    let message
    try {
      await mutationCreateRate.mutateAsync({
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

  // edit rate

  const mutationEditRate = api.rate.editRate.useMutation<MutationEdit>()

  const handleEditReview = async (
    id: string,
    comment: string,
    rated: number
  ) => {
    try {
      await mutationEditRate.mutateAsync({ id, comment, rated })
      await refetch()
      toast({ title: 'Успешно изменено' })
    } catch (error) {
      console.log('Error edit review', error)
    }
  }

  // delete rate

  const mutationDeleteRate = api.rate.deleteRate.useMutation<MutationDelete>()

  const handleDeleteReview = async (id: string) => {
    try {
      await mutationDeleteRate.mutateAsync({ id })
      await refetch()
      toast({ title: 'Успешно удалено' })
    } catch (error) {
      console.log('Error delete review', error)
    }
  }

  return {
    data,
    isLoading,
    isError,
    handleCreateRate,
    handleEditReview,
    handleDeleteReview
  }
}
