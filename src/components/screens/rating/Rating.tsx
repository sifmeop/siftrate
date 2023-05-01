import RateList from '@/components/ui/RateList/RateList'
import { useRatedMovies } from '@/hooks/useRatedMovies'

const Rating = () => {
  const { data, isLoading, isError } = useRatedMovies()

  if (!data) return null

  return (
    <>
      <h1 className='title'>РЕЙТИНГ</h1>
      <RateList rating={data} isLoading={isLoading} isError={isError} />
    </>
  )
}

export default Rating
