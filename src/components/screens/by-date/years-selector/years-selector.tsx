import clsx from 'clsx'
import { useByDateStore } from '~/store/by-date'
import { currentYear, startYear } from '~/utils/constants'
import styles from './years-selector.module.scss'

const years = Array.from(
  { length: currentYear - startYear + 1 },
  (_, i) => startYear + i
)

export const YearsSelector = () => {
  const { selectedYear, setSelectedYear } = useByDateStore()

  return (
    <div className={styles.wrapper}>
      {years.map((year) => (
        <button
          key={year}
          className={clsx(styles.button, {
            [styles.active!]: year === selectedYear
          })}
          onClick={() => {
            if (year !== selectedYear) {
              setSelectedYear(year)
            }
          }}>
          {year}
        </button>
      ))}
    </div>
  )
}
