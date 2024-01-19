import { Rate } from '~/screens/rate'
import { PageTitle } from '~/ui/page-title'
import { Meta } from '~/utils/Meta'

export default function RatePage() {
  return (
    <>
      <Meta title='ОЦЕНИТЬ' description='Оцените фильм' />
      <PageTitle>ОЦЕНИТЬ</PageTitle>
      <Rate />
    </>
  )
}
