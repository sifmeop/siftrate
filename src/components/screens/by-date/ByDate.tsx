import RateList from '@/components/ui/RateList/RateList'
import { useByDataRatedMovies } from '@/hooks/useByDataRatedMovies'
import { type ByData } from '@/types/by-data.interface'
import { currentMonth, currentYear } from '@/utils/constants'
import { useEffect, useState } from 'react'
import MonthButtons from './MonthButtons/MonthButtons'
import YearsButtons from './YearsButtons/YearsButtons'

const ByDate = () => {
  const [data, setData] = useState<ByData>({
    month: currentMonth,
    year: currentYear
  })

  const {
    data: rating,
    isLoading,
    isError,
    handleByDataRatedMovies
  } = useByDataRatedMovies(data)

  useEffect(() => {
    void handleByDataRatedMovies()
  }, [data])

  return (
    <>
      <h1 className='title'>ПО ДАТАМ</h1>
      <div className='mx-auto max-w-[108.125rem]'>
        <YearsButtons data={data.year} setData={setData} />
        <MonthButtons data={data} setData={setData} />
        {/* {isLoading && <Loader />} */}
        {/* {isError && <h1 className='title'>ОШИБКА</h1>} */}
        <RateList
          rating={rating?.sort((a, b) => b.rated - a.rated)}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </>
  )
}

export default ByDate
