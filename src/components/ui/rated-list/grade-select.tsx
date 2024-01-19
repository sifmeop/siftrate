import { Select, SelectItem } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { useUser } from '~/hooks/useUser'
import { useByDateStore } from '~/store/by-date'
import { api } from '~/utils/api'

export const GradeSelect = () => {
  const { id } = useUser()
  const { selectedYear } = useByDateStore()
  const { data } = api.user.getAllUserGrade.useQuery({ id, year: selectedYear })
  const [selectedItem, setSelectedItem] = useState<Set<string>>(new Set([]))

  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  useEffect(() => {
    if (data?.length) {
      setSelectedItem(new Set([data[0]!.label.toString() ?? 'Все']))
    }
  }, [data])

  return (
    <Select
      items={data ?? []}
      size='sm'
      variant='bordered'
      label='Рейтинг'
      selectedKeys={selectedItem}
      disabledKeys={selectedItem}
      onSelectionChange={(keys) => setSelectedItem(keys as Set<string>)}
      onChange={(e) => {
        const value = e.target.value
        const newParams = new URLSearchParams(params)

        if (value === 'Все') {
          newParams.delete('grade')
        } else {
          newParams.set('grade', value)
        }

        router.push(`${pathname}?${newParams.toString()}`)
        setSelectedItem(new Set([value]))
      }}>
      {(items) => (
        <SelectItem
          key={String(items.label)}
          textValue={String(items.label)}
          value={String(items.label)}
          startContent={<FaStar fill='#ffbf00' />}
          endContent={<span className='text-primary'>{items.value}</span>}>
          {items.label}
        </SelectItem>
      )}
    </Select>
  )
}
