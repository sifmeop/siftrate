import RateList from '@/components/ui/RateList/RateList'
import SelectRating from '@/components/ui/SelectRating/SelectRating'
import { useRatedMovies } from '@/hooks/useRatedMovies'
import { type RatedMovie } from '@prisma/client'
import { useEffect, useState } from 'react'

const Rating = () => {
  const { data, isLoading, isError } = useRatedMovies()

  const [list, setList] = useState<RatedMovie[] | undefined>([])

  useEffect(() => {
    setList(data)
  }, [data])

  if (!data) return

  return (
    <>
      <h1 className='title'>РЕЙТИНГ</h1>
      <div className='mx-auto max-w-3xl'>
        <SelectRating data={data} setList={setList} />
        <RateList
          rating={list?.sort((a, b) => b.rated - a.rated)}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </>
  )
}

export default Rating
