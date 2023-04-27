import { useCountYearlyRatedMovies } from '@/hooks/useCountYearlyRatedMovies'
import { type ByData } from '@/types/by-data.interface'
import { memo } from 'react'
import styles from './MonthButtons.module.scss'
import MonthsItem from './MonthsItem/MonthsItem'

interface Props {
  data: ByData
  setData: React.Dispatch<React.SetStateAction<ByData>>
}

const MonthButtons = ({ data, setData }: Props) => {
  const { months } = useCountYearlyRatedMovies(data.year)

  return (
    <div className={styles.wrapper}>
      {months.map((month, index) => (
        <MonthsItem
          key={month.id}
          month={month}
          index={index + 1}
          data={data}
          setData={setData}
        />
      ))}
    </div>
  )
}

export default memo(MonthButtons)
