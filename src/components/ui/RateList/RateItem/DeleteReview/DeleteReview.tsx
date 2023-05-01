import { useDeleteReview } from '@/hooks/useDeleteReview'
import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import styles from './DeleteReview.module.scss'

interface Props {
  id: string
}

const DeleteReview = ({ id }: Props) => {
  const { handleDeleteReview } = useDeleteReview()

  return (
    <>
      <Toaster />
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
    </>
  )
}

export default DeleteReview
