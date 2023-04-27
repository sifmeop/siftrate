import Home from '@/components/screens/home/Home'
import Meta from '@/utils/Meta'

const HomePage = () => {
  return (
    <>
      <Meta
        title='Главная | Siftrate'
        description='Главная страница с профилем'
      />
      <Home />
    </>
  )
}

export default HomePage
