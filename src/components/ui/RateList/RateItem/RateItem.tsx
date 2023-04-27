/* eslint-disable @next/next/no-img-element */
import { type RatedMovie } from '@prisma/client'
import Image from 'next/image'
import styles from './RateItem.module.scss'

interface Props {
  movie: RatedMovie
  index: number
}

const RateItem = ({ movie, index }: Props) => {
  return (
    <div key={movie.id} className={styles.wrapper}>
      <time className={styles.date}>
        {new Date(movie.date).toLocaleDateString()}
      </time>
      <div className={styles.info}>
        <span className={styles.index}>{index}.</span>
        <img
          width={100}
          height={150}
          src={movie.poster}
          alt={movie.title}
          loading='lazy'
        />
        <h2 className={styles.title}>{movie.title}</h2>
        <div className={styles.rate}>
          <Image width={25} height={25} src='/rate.svg' alt='Rate icon' />
          <p>
            {movie.rated} <span className={styles.maxRate}>/ 10</span>
          </p>
        </div>
      </div>
      {movie.comment && (
        <p className={styles.comment}>
          <b>Отзыв:</b> {movie.comment}
        </p>
      )}
    </div>
  )
}

export default RateItem
