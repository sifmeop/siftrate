/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRatedMovies } from '@/hooks/useRatedMovies'
import { type Form } from '@/types/form.interface'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'
import styles from './Review.module.scss'
import Commentary from './commentary/Commentary'
import ImageLink from './image-link/ImageLink'
import Rating from './rating/Rating'
import Search from './search/Search'

const Review = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
    watch,
    reset
  } = useForm<Form>({ mode: 'onChange' })

  const link = watch('link')

  const [error, setError] = useState(false)

  const { handleCreateRate } = useRatedMovies()

  const onSubmit: SubmitHandler<Form> = async (data) => {
    console.log(data)

    if (error) {
      setFocus('link', { shouldSelect: true })
      return
    }

    const message = await handleCreateRate({
      title: data.title,
      poster: data.link,
      rated: parseFloat(data.rate),
      comment: data.comment
    })

    console.log(message)

    if (message === 'Успешно оценено') {
      toast.success(message, {
        duration: 1000
      })
      reset()
      return
    }

    if (message.includes('Unique constraint failed on the constraint')) {
      toast.error('Для него уже есть оценка', {
        duration: 1000
      })
      return
    }

    toast.error('Что-то пошло не так', {
      duration: 1000
    })
  }

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <h1 className='title'>ОЦЕНИТЬ</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Search setValues={setValue} />
        <ImageLink link={link} error={error} setError={setError} />
        <Commentary register={register} />
        <Rating register={register} errors={errors} />
        <button className='button'>Оценить</button>
      </form>
    </>
  )
}

export default Review
