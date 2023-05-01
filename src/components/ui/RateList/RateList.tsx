import { type RatedMovie } from '@prisma/client'
import { useState } from 'react'
import Loader from '../Loader/Loader'
import SelectRating from '../SelectRating/SelectRating'
import RateItem from './RateItem/RateItem'
import styles from './RateList.module.scss'

interface Props {
  rating: RatedMovie[] | undefined
  isLoading: boolean
  isError: boolean
}

const RateList = ({ rating, isLoading, isError }: Props) => {
  const [list, setList] = useState<RatedMovie[] | undefined>([])

  if (isLoading) return <Loader />

  if (isError) return <h1 className='title'>ОШИБКА</h1>

  const sortedRating = list?.sort((a, b) => b.rated - a.rated)

  return rating && rating.length > 0 ? (
    <div className={styles.wrapper}>
      <div className={styles.selects}>
        <SelectRating data={rating} setList={setList} />
      </div>
      {sortedRating?.map((rate, index) => (
        <RateItem key={rate.id} movie={rate} index={index + 1} />
      ))}
    </div>
  ) : (
    <h1 className='title'>СПИСОК ПУСТ</h1>
  )
}

export default RateList
