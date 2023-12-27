import { UiButton } from '~/ui/ui-button'
import { UiGrade } from '~/ui/ui-grade'
import { Comment } from './comment/comment'
import { IsBest } from './is-best/is-best'
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
      className='flex flex-col gap-4 rounded-lg border border-white/10 bg-black/20 p-8'>
      <Search
        setMovieData={(data: RateFormMovie) => setValue('movie', data)}
        errorMessage={errors?.movie?.message}
        poster={poster}
      />
      <Comment register={register} />
      <IsBest control={control} />
      <UiGrade
        setValue={(value) => setValue('rate', +value)}
        errorMessage={errors?.rate?.message}
      />
      <UiButton type='submit'>Оценить</UiButton>
    </form>
  )
}
