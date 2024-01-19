import { Divider, Select, SelectItem } from '@nextui-org/react'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { useUser } from '~/hooks/useUser'
import { useByDateStore } from '~/store/by-date'
import { api } from '~/utils/api'
import { currentMonth, currentYear, months } from '~/utils/constants'
import styles from './months-selector.module.scss'

export const MonthsSelector = () => {
  const { selectedYear, selectedMonth, setSelectedMonth } = useByDateStore()

  const isMobile = useMediaQuery('(max-width:425px)')

  const { id } = useUser()

  const { data } = api.rate.getMonthlyRecords.useQuery({
    userId: id,
    selectedYear
  })

  const options =
    data?.map(({ id, title, count, countBest }) => ({
      label: title,
      value: id.toString(),
      count,
      countBest,
      isDisabled: id > currentMonth && currentYear <= selectedYear
    })) ?? []

  const zeroOptions = options?.filter(({ count }) => count === 0)
  const disabledKeys = zeroOptions?.map(({ label }) => label)

  useEffect(() => {
    if (data?.length) {
      const firstDataIndex = data.findIndex((item) => item.count > 0)
      console.log(firstDataIndex, 'firstDataIndex')
      console.log(selectedMonth, 'selectedMonth')
      console.log(data[selectedMonth], 'data[selectedMonth]')

      if (data[selectedMonth]?.count === 0) {
        setSelectedMonth(firstDataIndex + 1)
      }
    }
  }, [data])

  return (
    <div className={styles.wrapper}>
      {isMobile ? (
        <Select
          label='Месяц'
          disabledKeys={disabledKeys}
          selectedKeys={[
            months.find((option) => +option.id === selectedMonth)!.title
          ]}
          onChange={(e) => {
            const value = months.find(
              (option) => option.title === e.target.value
            )!.id
            setSelectedMonth(value)
          }}>
          {options.map(({ label, value, count, countBest }) => (
            <SelectItem
              key={label}
              value={value}
              endContent={
                <span className='flex h-4 items-center gap-2'>
                  <span>{count}</span>
                  <Divider orientation='vertical' />
                  <span className='text-primary'>{countBest}</span>
                </span>
              }>
              {label}
            </SelectItem>
          ))}
        </Select>
      ) : (
        data?.map(({ id, title, count, countBest }) => {
          const isDisabled = count === 0
          return (
            <button
              key={id}
              className={clsx(styles.button, {
                [styles.disabled!]: isDisabled,
                [styles.active!]: id === selectedMonth && !isDisabled
              })}
              onClick={() => {
                if (isDisabled) {
                  return
                }
                if (id !== selectedMonth) {
                  setSelectedMonth(id)
                }
              }}
              disabled={isDisabled}>
              {title}
              <span className='flex h-8 items-center gap-2'>
                <span>{count}</span>
                <Divider orientation='vertical' />
                <span className='text-primary'>{countBest}</span>
              </span>
            </button>
          )
        })
      )}
    </div>
  )
}
