import { type Option } from '@/types/select.interface'
import { type RatedMovie } from '@prisma/client'

export const ratedListOptions = (list: RatedMovie[]): Option[] => {
  const options: Option[] = [{ label: 'Все', value: 'all', count: list.length }]

  if (!list) return options

  for (const key of list) {
    const find = options.find((option) => option.value === key.rated.toString())

    if (find) {
      find.count++
    } else {
      options.push({
        label: key.rated.toString(),
        value: key.rated.toString(),
        count: 1
      })
    }
  }

  return options
}
