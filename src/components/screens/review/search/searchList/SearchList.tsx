import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { type Form } from '@/types/form.interface'
import { type Movie } from '@/types/search.interface'
import { IMAGE_URL } from '@/utils/constants'
import Image from 'next/image'
import { useRef } from 'react'
import { type UseFormSetValue } from 'react-hook-form'
import styles from './SearchList.module.scss'

interface Props {
  results: Movie[]
  setValue: (value: string) => void
  setValues: UseFormSetValue<Form>
}

const SearchList = ({ results, setValue, setValues }: Props) => {
  const searchRef = useRef(null)

  useOnClickOutside(searchRef, () => setValue(''))

  const handleClick = (item: Movie) => {
    const poster = item.poster_path
      ? `${IMAGE_URL}${item.poster_path}`
      : '/unknown.svg'

    setValues('title', item.title ?? item.name)
    setValues('link', poster)
    setValue('')
  }

  return (
    <ul ref={searchRef} className={styles.list}>
      {results.map((item) => (
        <li
          key={item.id}
          className={styles.item}
          onClick={() => handleClick(item)}>
          <Image
            width={100}
            height={150}
            src={
              item.poster_path
                ? `${IMAGE_URL}${item.poster_path}`
                : '/unknown.svg'
            }
            alt={item.title ?? item.name}
          />
          <div className='flex flex-col gap-y-2'>
            <h3>
              <b>{item.title ?? item.name}</b>
            </h3>
            {item.release_date && (
              <p>{new Date(item.release_date).getFullYear()}</p>
            )}
            {item.first_air_date && (
              <p>{new Date(item.first_air_date).getFullYear()}</p>
            )}
            {item.vote_average && (
              <div className={styles.rate}>
                <Image width={25} height={25} src='/rate.svg' alt='Rate icon' />
                {item.vote_average.toFixed(1)}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default SearchList
