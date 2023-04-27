import Home from '@/components/screens/home/Home'
import Meta from '@/utils/Meta'

const HomePage = () => {
  return (
    <>
      <Meta
        title='Главная | Siftrate'
        description='Главная страница которая описывает что из себя представляет сайт'
      />
      <Home />
    </>
  )
}

export default HomePage
