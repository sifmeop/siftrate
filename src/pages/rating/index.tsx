import { Rating } from '~/screens/rating'
import { PageTitle } from '~/ui/page-title'
import { Meta } from '~/utils/Meta'

export default function RatingPage() {
  return (
    <>
      <Meta title='РЕЙТИНГ' description='Рейтинг оценок' />
      <PageTitle>РЕЙТИНГ</PageTitle>
      <Rating />
    </>
  )
}
