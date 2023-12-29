import { Tab, Tabs } from '@nextui-org/react'
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
> & {
  isUserProfile?: boolean
}

export const RatedList = ({
  data,
  isLoading,
  error,
  isSuccess,
  isError,
  isUserProfile = false
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

  const allMovies = data?.map((movie, index) => (
    <RatedRow
      isUserProfile={isUserProfile}
      key={movie.id}
      movie={movie}
      index={index + 1}
    />
  ))
  const bestMovies = data
    ?.filter((movie) => movie.isBest)
    ?.map((movie, index) => (
      <RatedRow
        isUserProfile={isUserProfile}
        key={movie.id}
        movie={movie}
        index={index + 1}
      />
    ))

  const tabs = [
    {
      id: 'all',
      label: `${allMovies.length ?? 0} - ВСЕ`,
      content: allMovies
    },
    {
      id: 'best',
      label: `${bestMovies.length ?? 0} - ЛУЧШИЕ`,
      content: bestMovies
    }
  ]

  return (
    <div className='mx-auto grid max-w-3xl gap-6'>
      <Tabs
        fullWidth
        variant='bordered'
        size='lg'
        aria-label='Dynamic tabs'
        items={tabs}>
        {(item) => (
          <Tab className='p-0' key={item.id} title={item.label}>
            {item.content}
          </Tab>
        )}
      </Tabs>
    </div>
  )
}
