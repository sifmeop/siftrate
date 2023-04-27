import ByDate from '@/components/screens/by-date/ByDate'
import Meta from '@/utils/Meta'

const ByDatePage = () => {
  return (
    <>
      <Meta
        title='По датам | Siftrate'
        description='Страница где можно посмотреть по датам в какой месяц, год написаны отзывы'
      />
      <ByDate />
    </>
  )
}

export default ByDatePage
