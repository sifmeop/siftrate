import { Divider, Input, User } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { Loader } from '~/ui/loader'
import { PageSubTitle } from '~/ui/page-sub-title'
import { api } from '~/utils/api'
import { defaultContainerWidth } from '~/utils/constants'

export const Search = () => {
  const [name, setName] = useState('')
  const router = useRouter()

  const { data, isFetching, isError, error, isSuccess } =
    api.user.getUser.useQuery(
      {
        name
      },
      {
        enabled: !!name.length
      }
    )

  return (
    <div className={defaultContainerWidth}>
      <Input startContent={<FiSearch />} value={name} onValueChange={setName} />
      {isError && <PageSubTitle>{error.message}</PageSubTitle>}
      {!!data?.length && <PageSubTitle>РЕЗУЛЬТАТЫ ПОИСКА</PageSubTitle>}
      {isFetching && !data?.length && <Loader />}
      {isSuccess && !data?.length && <PageSubTitle>СПИСОК ПУСТ</PageSubTitle>}
      {isSuccess &&
        !!data?.length &&
        data.map(({ id, name, image, count, countBest }) => (
          <div
            key={id}
            className='mx-auto flex w-fit cursor-pointer items-center gap-6 rounded-lg px-8 py-4 transition-colors hover:bg-white/20'
            onClick={() => router.push(`/user/${id}`)}>
            <User
              name={name}
              avatarProps={{
                src: image ?? '/default-avatar-user.jpg'
              }}
            />
            <span className='flex h-4 items-center gap-2'>
              (<span>{count}</span>
              <Divider orientation='vertical' />
              <span className='text-primary'>{countBest}</span>)
            </span>
          </div>
        ))}
    </div>
  )
}
