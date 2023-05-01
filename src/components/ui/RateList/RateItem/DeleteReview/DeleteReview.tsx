import { useRatedMovies } from '@/hooks/useRatedMovies'
import Image from 'next/image'
import styles from './DeleteReview.module.scss'

interface Props {
  id: string
}

const DeleteReview = ({ id }: Props) => {
  const { handleDeleteReview } = useRatedMovies()

  return (
    <button
      className={styles.delete}
      onClick={() => void handleDeleteReview(id)}>
      <Image
        width={20}
        height={20}
        src='/delete.svg'
        alt='Иконка изменения отзыва'
      />
    </button>
  )
}

export default DeleteReview
