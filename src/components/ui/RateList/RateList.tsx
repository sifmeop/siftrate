import { type RatedMovie } from '@prisma/client'
import Loader from '../Loader/Loader'
import RateItem from './RateItem/RateItem'

interface Props {
  rating: RatedMovie[] | undefined
  isLoading: boolean
  isError: boolean
}

const RateList = ({ rating, isLoading, isError }: Props) => {
  if (isLoading) return <Loader />

  if (isError) return <h1 className='title'>ОШИБКА</h1>

  return rating && rating.length > 0 ? (
    <div className='mx-auto max-w-3xl'>
      {rating.map((rate, index) => (
        <RateItem key={rate.id} movie={rate} index={index + 1} />
      ))}
    </div>
  ) : (
    <h1 className='title'>СПИСОК ПУСТ</h1>
  )
}

export default RateList
