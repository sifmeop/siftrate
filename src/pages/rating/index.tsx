import Rating from '@/components/screens/rating/Rating'
import Meta from '@/utils/Meta'

const RatingPage = () => {
  return (
    <>
      <Meta
        title='Рейтинг | Siftrate'
        description='Страница со всеми отзывами'
      />
      <Rating />
    </>
  )
}

export default RatingPage
