import { type ByData } from '@/types/by-data.interface'
import { type Month } from '@/types/months.interface'
import { currentMonth, currentYear } from '@/utils/constants'
import clsx from 'clsx'
import Image from 'next/image'
import styles from './MonthsItem.module.scss'

interface Props {
  month: Month
  index: number
  data: ByData
  setData: React.Dispatch<React.SetStateAction<ByData>>
}

const MonthsItem = ({ month, index, data, setData }: Props) => {
  const isDisabled = index > currentMonth && currentYear <= data.year

  return (
    <button
      className={clsx(styles.button, {
        [styles.disabled as string]: isDisabled,
        [styles.active as string]: index === data.month
      })}
      onClick={() => setData((prev) => ({ ...prev, month: index }))}
      disabled={isDisabled}>
      {month.title}
      <div className={styles.countRate}>
        <Image width={30} height={30} src='/movie.svg' alt='Movie icon' />
        {month.count}
      </div>
    </button>
  )
}

export default MonthsItem
