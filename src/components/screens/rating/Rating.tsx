import RateList from '@/components/ui/RateList/RateList'
import { useRatedMovies } from '@/hooks/useRatedMovies'

const Rating = () => {
  const { data, isLoading, isError } = useRatedMovies()

  return (
    <>
      <h1 className='title'>РЕЙТИНГ</h1>
      <div className='mx-auto max-w-3xl'>
        <RateList
          rating={data?.sort((a, b) => b.rated - a.rated)}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </>
  )
}

export default Rating
