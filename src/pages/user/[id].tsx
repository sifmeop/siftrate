import { useRouter } from 'next/router'
import { Loader } from '~/ui/loader'
import { PageTitle } from '~/ui/page-title'
import { api } from '~/utils/api'
import Profile from './Profile'

const UserWrapper = () => {
  const router = useRouter()

  const id = router.query.id as string | undefined

  const { data, isLoading, isError } = api.user.checkVisibleUser.useQuery(
    {
      id
    },
    {
      enabled: !!id
    }
  )

  if (isError) return <PageTitle>ПРОФИЛЬ НЕ НАЙДЕН</PageTitle>

  if (isLoading || typeof data === 'undefined') return <Loader />

  if (data === null) return <PageTitle>ПРОФИЛЬ СКРЫТ</PageTitle>

  return <Profile user={data} />
}

export default UserWrapper
