import { Input, Tab, Tabs } from '@nextui-org/react'
import { type RatedMovie } from '@prisma/client'
import { type TRPCClientErrorLike } from '@trpc/client'
import { type UseTRPCQueryResult } from '@trpc/react-query/shared'
import { type BuildProcedure } from '@trpc/server'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'
import { Loader } from '../loader'
import { PageSubTitle } from '../page-sub-title'
import { RatedRow } from './rated-row'

interface Item {
  props: {
    movie: {
      title: string
    }
  }
}

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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

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
    <div className='mx-auto flex max-w-3xl flex-col gap-6'>
      <Tabs
        fullWidth
        variant='bordered'
        size='lg'
        aria-label='Dynamic tabs'
        items={tabs}
        onSelectionChange={() => router.push(pathname)}>
        {(item) => (
          <Tab className='p-0' key={item.id} title={item.label}>
            <Input
              startContent={<FaSearch />}
              className='mb-6'
              onValueChange={(value) => {
                if (value === '') {
                  router.push(pathname)
                } else {
                  const params = new URLSearchParams(searchParams)
                  params.set('search', value)
                  router.push(pathname + '?' + params.toString())
                }
              }}
            />
            {item.content.filter((item: Item) =>
              item.props.movie.title
                .toLowerCase()
                .includes((searchParams.get('search') ?? '').toLowerCase())
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  )
}
