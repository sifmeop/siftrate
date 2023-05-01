/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRatedMovies } from '@/hooks/useRatedMovies'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { type RatedMovie } from '@prisma/client'
import clsx from 'clsx'
import Image from 'next/image'
import { useForm, type SubmitHandler } from 'react-hook-form'
import styles from './EditReview.module.scss'

interface Props {
  review: RatedMovie
}

interface Form {
  comment: string
  rating: number
}

const EditReview = ({ review }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Form>({
    mode: 'onChange',
    defaultValues: { comment: review.comment ?? '', rating: review.rated }
  })

  const { handleEditReview } = useRatedMovies()

  const onSubmit: SubmitHandler<Form> = async (data) => {
    await handleEditReview(
      review.id,
      data.comment,
      parseFloat(data.rating.toString())
    ).then(onClose)
  }

  return (
    <>
      <button className={styles.edit} onClick={onOpen}>
        <Image
          width={20}
          height={20}
          src='/edit.svg'
          alt='Иконка изменения отзыва'
        />
      </button>
      <Modal
        motionPreset='slideInBottom'
        isOpen={isOpen}
        onClose={() => {
          onClose()
          reset()
        }}>
        <ModalOverlay />
        <ModalContent bg='#333333'>
          <ModalHeader>{review.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-2'>
                <label className='text-[#ffffffb3]'>Комментарий</label>
                <textarea
                  {...register('comment')}
                  className='textarea'
                  rows={5}
                  cols={100}
                  placeholder='Комментарий...'
                />
              </div>
              <div className='mb-2'>
                <label className='text-[#ffffffb3]'>
                  Оценка<span className='text-red'>*</span>
                </label>
                <div className={styles.rating}>
                  <input
                    type='number'
                    step='0.1'
                    inputMode='numeric'
                    className={clsx(styles.input, 'input')}
                    {...register('rating', {
                      required: 'Это обязательное поле ввода',
                      min: {
                        value: 0,
                        message: 'Число должно быть выше 0'
                      },
                      max: {
                        value: 10,
                        message: 'Число должно быть меньше 10'
                      }
                    })}
                  />
                  <span>/</span>
                  <span>10</span>
                </div>
              </div>
              {errors.rating?.message && (
                <p className='text-red'>{errors.rating.message}</p>
              )}
              <button className='button' type='submit'>
                Сохранить
              </button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditReview
