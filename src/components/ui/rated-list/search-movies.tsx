import { Input } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'

export const SearchMovies = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  return (
    <Input
      variant='bordered'
      size='sm'
      startContent={<FaSearch />}
      onValueChange={(value) => {
        const newParams = new URLSearchParams(params)

        if (value === '') {
          newParams.delete('search')
        } else {
          newParams.set('search', value)
        }

        router.push(`${pathname}?${newParams.toString()}`)
      }}
      placeholder='Поиск...'
    />
  )
}
