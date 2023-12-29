import { type Control, type FieldValues } from 'react-hook-form'
import { IsBestCheckbox } from '~/ui/is-best-checkbox/is-best-checkbox'
import { UiButton } from '~/ui/ui-button'
import { UiComment } from '~/ui/ui-comment/ui-comment'
import { UiGrade } from '~/ui/ui-grade'
import { Search } from './search/search'
import { useRateForm, type RateFormMovie } from './useRateForm'

export const Rate = () => {
  const {
    register,
    handleSubmit,
    control,
    onSubmit,
    setValue,
    formState: { errors },
    poster
  } = useRateForm()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto flex max-w-xl flex-col gap-4 rounded-lg border border-white/10 bg-black/20 p-8'>
      <Search
        setMovieData={(data: RateFormMovie) => setValue('movie', data)}
        errorMessage={errors?.movie?.message}
        poster={poster}
        setPoster={(value: string | undefined) =>
          setValue('movie.poster', value)
        }
      />
      <UiComment register={register} />
      <IsBestCheckbox control={control as unknown as Control<FieldValues>} />
      <UiGrade register={register} errorMessage={errors?.rated?.message} />
      <UiButton type='submit'>Оценить</UiButton>
    </form>
  )
}
