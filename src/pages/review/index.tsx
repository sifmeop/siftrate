import Review from '@/components/screens/review/Review'
import Meta from '@/utils/Meta'

const ReviewPage = () => {
  return (
    <>
      <Meta
        title='Оценка | Siftrate'
        description='Страница где можно оценить фильмы и сериалы'
      />
      <Review />
    </>
  )
}

export default ReviewPage
