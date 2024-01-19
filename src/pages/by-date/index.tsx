import { ByDate } from '~/screens/by-date'
import { PageTitle } from '~/ui/page-title'
import { Meta } from '~/utils/Meta'

export default function ByDatePage() {
  return (
    <>
      <Meta title='ПО ДАТАМ' description='Оценки по датам' />
      <PageTitle>ПО ДАТАМ</PageTitle>
      <ByDate />
    </>
  )
}
