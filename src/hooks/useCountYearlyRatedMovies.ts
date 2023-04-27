import { type Month } from '@/types/months.interface'
import { api } from '@/utils/api'
import { MONTHS } from '@/utils/constants'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const useCountYearlyRatedMovies = (year: number) => {
  const [months, setMonths] = useState<Month[]>([...MONTHS])

  const { data: session } = useSession()

  const userId = session?.user.id as string

  const {
    data: rating,
    isLoading,
    isError
  } = api.rate.getYearlyRatedMovies.useQuery({
    userId,
    year
  })

  useEffect(() => {
    if (rating) {
      const updatedMonths = months.map((month) => ({ ...month, count: 0 }))

      const ratedMonths = rating.map((item) => item.month)

      for (const key of ratedMonths) {
        const month = updatedMonths[key - 1]
        if (month !== undefined) {
          month.count += 1
        }
      }

      setMonths(updatedMonths)
    }
  }, [rating])

  return { months }
}
