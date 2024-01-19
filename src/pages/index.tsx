import { Home } from '~/screens/home'
import { PageTitle } from '~/ui/page-title'
import { Meta } from '~/utils/Meta'

export default function HomePage() {
  return (
    <>
      <Meta title='ПРОФИЛЬ' description='Профиль пользователя' />
      <PageTitle>ПРОФИЛЬ</PageTitle>
      <Home />
    </>
  )
}
