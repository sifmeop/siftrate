/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRatedMovies } from '@/hooks/useRatedMovies'
import { type Form } from '@/types/form.interface'
import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import styles from './Review.module.scss'
import Commentary from './commentary/Commentary'
import ImageLink from './image-link/ImageLink'
import Rating from './rating/Rating'
import Search from './search/Search'

const Review = () => {
  const toast = useToast({
    status: 'success',
    isClosable: true,
    position: 'top',
    duration: 1000
  })

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

    if (message === 'Успешно оценено') {
      toast({ title: message })
      reset()
      return
    }

    if (message.includes('Unique constraint failed on the constraint')) {
      toast({ title: 'Для него уже есть оценка' })
      return
    }

    toast({ title: 'Что-то пошло не так' })
  }

  return (
    <>
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
