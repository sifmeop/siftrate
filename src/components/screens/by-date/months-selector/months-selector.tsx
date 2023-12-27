import clsx from 'clsx'
import { useUser } from '~/hooks/useUser'
import { useByDateStore } from '~/store/by-date'
import { api } from '~/utils/api'
import { currentMonth, currentYear } from '~/utils/constants'
import styles from './months-selector.module.scss'

export const MonthsSelector = () => {
  const { selectedYear, selectedMonth, setSelectedMonth } = useByDateStore()

  const { id } = useUser()

  const { data } = api.movie.getMonthlyRecords.useQuery({
    userId: id,
    selectedYear
  })

  return (
    <div className={styles.wrapper}>
      {data?.map(({ id, title, count }) => {
        const isDisabled = id > currentMonth && currentYear <= selectedYear
        return (
          <button
            key={id}
            className={clsx(styles.button, {
              [styles.disabled!]: isDisabled,
              [styles.active!]: id === selectedMonth
            })}
            onClick={() => {
              if (id !== selectedMonth) {
                setSelectedMonth(id)
              }
            }}
            disabled={isDisabled}>
            {title}
            <span>{count}</span>
          </button>
        )
      })}
    </div>
  )
}
