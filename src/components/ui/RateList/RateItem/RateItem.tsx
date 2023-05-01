/* eslint-disable @next/next/no-img-element */
import { type RatedMovie } from '@prisma/client'
import clsx from 'clsx'
import Image from 'next/image'
import DeleteReview from './DeleteReview/DeleteReview'
import EditReview from './EditReview/EditReview'
import styles from './RateItem.module.scss'

interface Props {
  movie: RatedMovie
  index: number
}

const RateItem = ({ movie, index }: Props) => {
  const isCurrentDay =
    new Date(movie.date).toLocaleDateString() ===
    new Date().toLocaleDateString()

  return (
    <div key={movie.id} className={styles.wrapper}>
      <div className={styles.movieTop}>
        <time
          className={clsx(styles.date, {
            [styles.dateNow as string]: isCurrentDay
          })}>
          {new Date(movie.date).toLocaleDateString()}
        </time>
        <EditReview review={movie} />
        <DeleteReview id={movie.id} />
      </div>
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
