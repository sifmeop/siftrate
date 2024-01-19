import { Tab, Tabs } from '@nextui-org/react'
import { type RatedMovie } from '@prisma/client'
import { type TRPCClientErrorLike } from '@trpc/client'
import { type UseTRPCQueryResult } from '@trpc/react-query/shared'
import { type BuildProcedure } from '@trpc/server'
import { useSearchParams } from 'next/navigation'
import { Loader } from '../loader'
import { PageSubTitle } from '../page-sub-title'
import { GradeSelect } from './grade-select'
import { RatedRow } from './rated-row'
import { SearchMovies } from './search-movies'
import { SortMovies } from './sort-movies'

interface Item {
  props: {
    movie: {
      title: string
      rated: number
      createdAt: Date
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

  const filterMovies = (item: JSX.Element[]) => {
    let filterSearchMovies = item.filter(
      (item: Item) =>
        item.props.movie.title
          .toLowerCase()
          .includes((searchParams.get('search') ?? '').toLowerCase()) &&
        (Number(
          searchParams.get('grade') && searchParams.get('grade') !== 'Все'
        )
          ? item.props.movie.rated === Number(searchParams.get('grade') ?? '')
          : true)
    )

    const sort = searchParams.get('sort')

    if (sort === 'new') {
      filterSearchMovies = [...filterSearchMovies].sort(
        (a: Item, b: Item) =>
          new Date(b.props.movie.createdAt).getTime() -
          new Date(a.props.movie.createdAt).getTime()
      )
    } else if (sort === 'old') {
      filterSearchMovies = [...filterSearchMovies].sort(
        (a: Item, b: Item) =>
          new Date(a.props.movie.createdAt).getTime() -
          new Date(b.props.movie.createdAt).getTime()
      )
    } else if (sort === 'desc') {
      filterSearchMovies = [...filterSearchMovies].sort(
        (a: Item, b: Item) => b.props.movie.rated - a.props.movie.rated
      )
    } else if (sort === 'asc') {
      filterSearchMovies = [...filterSearchMovies].sort(
        (a: Item, b: Item) => a.props.movie.rated - b.props.movie.rated
      )
    }

    return filterSearchMovies
  }

  return (
    <div className='mx-auto flex max-w-3xl flex-col gap-4'>
      <SearchMovies />
      <div className='grid grid-cols-2 gap-4 mobile:grid-cols-1 mobile:grid-rows-2'>
        <SortMovies />
        <GradeSelect />
      </div>
      <Tabs
        radius='sm'
        className='-order-1'
        fullWidth
        variant='bordered'
        size='lg'
        aria-label='Tabs'
        items={tabs}>
        {(item) => (
          <Tab className='p-0' key={item.id} title={item.label}>
            {filterMovies(item.content)}
          </Tab>
        )}
      </Tabs>
    </div>
  )
}
