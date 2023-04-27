import { type ByData } from '@/types/by-data.interface'
import { currentMonth, years } from '@/utils/constants'
import clsx from 'clsx'
import { memo } from 'react'
import styles from './YearsButtons.module.scss'

interface Props {
  data: number
  setData: React.Dispatch<React.SetStateAction<ByData>>
}

const YearsButtons = ({ data, setData }: Props) => {
  return (
    <div className={styles.wrapper}>
      {years.map((year) => (
        <button
          key={year}
          className={clsx(styles.button, {
            [styles.active as string]: year === data
          })}
          onClick={() => setData({ month: currentMonth, year })}>
          {year}
        </button>
      ))}
    </div>
  )
}

export default memo(YearsButtons)
