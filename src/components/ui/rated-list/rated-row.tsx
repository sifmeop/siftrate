import { type RatedMovie } from '@prisma/client'
import clsx from 'clsx'
import Image from 'next/image'
import { BiCameraMovie, BiMovie } from 'react-icons/bi'
import { FaStar } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { cn } from '~/utils/cn'
import styles from './rated-row.module.scss'

interface Props {
  movie: RatedMovie
  index: number
  isProfile?: boolean
}

export const RatedRow = ({ movie, index, isProfile = false }: Props) => {
  const isCurrentDay =
    new Date(movie.createdAt).toLocaleDateString() ===
    new Date().toLocaleDateString()

  return (
    <div
      key={movie.id}
      className={clsx(styles.wrapper, {
        ['bg-white/20']: movie.isBest
      })}>
      <div className={styles.movieTop}>
        <time
          className={clsx('text-lg text-white/50', {
            'text-white underline': isCurrentDay
          })}>
          {new Date(movie.createdAt).toLocaleDateString()}
        </time>
        {/* {!isProfile && (
          <>
            <EditReview review={movie} />
            <DeleteReview id={movie.id} title={movie.title} />
          </>
        )} */}
      </div>
      <div className={styles.info}>
        <span className={styles.index}>{index}.</span>
        <div className='relative'>
          <div
            className={cn(styles.mediaType, {
              [styles.isMovie]: movie.type === 'MOVIE',
              [styles.isSeries]: movie.type === 'TV'
            })}>
            {movie.type === 'MOVIE' ? (
              <BiCameraMovie size='16px' />
            ) : (
              <BiMovie size='16px' />
            )}
          </div>
          <Image
            width={100}
            height={150}
            src={movie.poster ?? '/default-cover-rate.svg'}
            alt={movie.title}
          />
          {movie.isBest && (
            <div className='absolute -bottom-2 -right-2 rounded-lg bg-white p-1.5 text-sm shadow-lg'>
              <MdFavorite fill='#f44336' size='20px' />
            </div>
          )}
        </div>
        {/* <div className={styles.infoTop}> */}
        <h2 className={styles.title}>{movie.title}</h2>
        <div className={styles.rate}>
          <FaStar fill='#ffbf00' size='25px' />
          <p>
            {movie.rated} <span className={styles.maxRate}>/ 10</span>
          </p>
        </div>
        {/* </div> */}
      </div>
      {movie.comment && (
        <p className={styles.comment}>
          <b>Отзыв:</b> {movie.comment}
        </p>
      )}
    </div>
  )
}
