import { type RatedMovie } from '@prisma/client'
import { type TRPCClientErrorLike } from '@trpc/client'
import { type UseTRPCQueryResult } from '@trpc/react-query/shared'
import { type BuildProcedure } from '@trpc/server'
import { Loader } from '../loader'
import { PageSubTitle } from '../page-sub-title'
import { RatedRow } from './rated-row'

type Props = UseTRPCQueryResult<
  RatedMovie[],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  TRPCClientErrorLike<BuildProcedure<'query', object, RatedMovie>>
>

export const RatedList = ({
  data,
  isLoading,
  error,
  isSuccess,
  isError
}: Props) => {
  if (isError) {
    return <div>{error.message}</div>
  }

  if (isLoading) {
    return <Loader />
  }

  if (isSuccess && !data?.length) {
    return <PageSubTitle>СПИСОК ПУСТ</PageSubTitle>
  }

  return (
    <div className='mx-auto grid max-w-3xl gap-6'>
      {data.map((movie, index) => (
        <RatedRow key={movie.id} movie={movie} index={index + 1} />
      ))}
    </div>
  )
}
