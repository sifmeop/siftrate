import { api } from '@/utils/api'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

interface Mutation {
  id: string
}

export const useDeleteReview = () => {
  const { data: session } = useSession()

  const userId = session?.user.id as string

  const { refetch } = api.rate.getAllRatedMovies.useQuery(
    { userId },
    { enabled: false }
  )

  const mutation = api.rate.deleteRate.useMutation<Mutation>()

  const handleDeleteReview = async (id: string) => {
    try {
      await mutation.mutateAsync({ id })
      toast.success('Успешно удалено', {
        duration: 1000
      })
      await refetch()
    } catch (error) {
      console.log(error)
    }
  }

  return { handleDeleteReview }
}
