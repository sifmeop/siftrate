import { api } from '@/utils/api'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

interface Mutation {
  comment: string
  rated: number
}

export const useEditReview = () => {
  const { data: session } = useSession()

  const userId = session?.user.id as string

  const { refetch } = api.rate.getAllRatedMovies.useQuery(
    { userId },
    { enabled: false }
  )

  const mutation = api.rate.updateRate.useMutation<Mutation>()

  const handleEditReview = async (
    id: string,
    comment: string,
    rated: number
  ) => {
    try {
      await mutation.mutateAsync({ id, comment, rated })
      toast.success('Успешно изменено', {
        duration: 1000
      })
      await refetch()
    } catch (error) {
      console.log(error)
    }
  }

  return { handleEditReview }
}
