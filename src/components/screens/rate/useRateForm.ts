import { zodResolver } from '@hookform/resolvers/zod'
import { TypeEnum } from '@prisma/client'
import {
  useForm,
  type SubmitHandler,
  type UseFormRegister
} from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useUser } from '~/hooks/useUser'
import { useQueryLoadingStore } from '~/store/query-loading'
import { api } from '~/utils/api'

const schema = z.object({
  movie: z.object(
    {
      title: z.string(),
      poster: z.string().optional(),
      type: z.nativeEnum(TypeEnum)
    },
    {
      required_error: 'Вы не выбрали фильм'
    }
  ),
  rated: z
    .number({
      required_error: 'Укажите рейтинг'
    })
    .min(0, 'Минимальный рейтинг 0')
    .max(10, 'Максимальный рейтинг 10')
    .step(0.1, 'Допустимо 1 знак после точки'),
  comment: z.string(),
  isBest: z.boolean()
})

export type RateForm = z.infer<typeof schema>
export type RateFormMovie = RateForm['movie']

export type RegisterRateForm = UseFormRegister<RateForm>

export const useRateForm = () => {
  const { id } = useUser()
  const setIsLoading = useQueryLoadingStore((state) => state.setIsLoading)

  const form = useForm<RateForm>({
    defaultValues: {
      isBest: false
    },
    resolver: zodResolver(schema)
  })

  const poster = form.watch('movie.poster')

  const { mutateAsync } = api.rate.createRate.useMutation()

  const onSubmit: SubmitHandler<RateForm> = async (formData) => {
    console.log(formData)

    const data = {
      userId: id,
      title: formData.movie.title,
      poster: formData.movie.poster,
      rated: +formData.rated,
      comment: formData.comment,
      type: formData.movie.type,
      isBest: formData.isBest
    }

    try {
      setIsLoading(true)
      await toast.promise(mutateAsync(data), {
        loading: 'Оценивание...',
        success: () => {
          form.reset()
          return 'Успешно оценено'
        },
        error: (error: Error) => {
          if (
            error?.message?.includes?.(
              'Unique constraint failed on the constraint: `RatedMovie_userId_title_key`'
            )
          ) {
            return 'Уже есть оценка'
          }
          return 'Что-то пошло не так'
        }
      })
    } catch (error) {
      console.log('ОШИБКА СОЗДАНИЯ ОЦЕНКИ', error)
    } finally {
      setIsLoading(false)
    }
  }

  return { ...form, poster, onSubmit }
}
