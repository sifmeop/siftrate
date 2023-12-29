import { Divider } from '@nextui-org/react'
import clsx from 'clsx'
import { useUser } from '~/hooks/useUser'
import { useByDateStore } from '~/store/by-date'
import { api } from '~/utils/api'
import styles from './years-selector.module.scss'

export const YearsSelector = () => {
  const { selectedYear, setSelectedYear } = useByDateStore()
  const { id: userId } = useUser()
  const { data } = api.rate.getYearRecords.useQuery({ userId })

  return (
    <div className={styles.wrapper}>
      {data?.map(({ year, count, countBest }) => {
        const isDisabled = count === 0
        return (
          <button
            key={year}
            className={clsx(styles.button, {
              [styles.active!]: year === selectedYear
            })}
            onClick={() => {
              if (isDisabled) {
                return
              }
              if (year !== selectedYear) {
                setSelectedYear(year ?? selectedYear)
              }
            }}
            disabled={isDisabled}>
            {year}
            <span className={styles.count}>
              (<span>{count}</span>
              <Divider orientation='vertical' />
              <span className='text-primary'>{countBest}</span>)
            </span>
          </button>
        )
      })}
    </div>
  )
}
