import { Select, SelectItem } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const options = [
  {
    label: 'Новые оценки',
    value: 'new'
  },
  {
    label: 'Старые оценки',
    value: 'old'
  },
  {
    label: 'Оценки по убыванию',
    value: 'desc'
  },
  {
    label: 'Оценки по возрастанию',
    value: 'asc'
  }
]

export const SortMovies = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [selectedItem, setSelectedItem] = useState(new Set([options[0]!.value]))

  return (
    <Select
      items={options}
      size='sm'
      variant='bordered'
      label='Сортировка'
      selectedKeys={selectedItem}
      disabledKeys={selectedItem}
      onSelectionChange={(keys) => setSelectedItem(keys as Set<string>)}
      onChange={(e) => {
        const value = e.target.value

        const newParams = new URLSearchParams(params)

        newParams.set('sort', value)

        router.push(`${pathname}?${newParams.toString()}`)
        setSelectedItem(new Set([value]))
      }}>
      {(items) => (
        <SelectItem
          key={items.value}
          textValue={items.label}
          value={items.value}>
          {items.label}
        </SelectItem>
      )}
    </Select>
  )
}
