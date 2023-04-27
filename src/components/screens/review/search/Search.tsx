import { useSearch } from '@/hooks/useSearch'
import { type Form } from '@/types/form.interface'
import { memo, useEffect, useState } from 'react'
import { type UseFormSetValue } from 'react-hook-form'
import styles from './Search.module.scss'
import SearchList from './searchList/SearchList'

interface Props {
  setValues: UseFormSetValue<Form>
}

const Search = ({ setValues }: Props) => {
  const [value, setValue] = useState('')

  const { data } = useSearch(value)

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className='relative'>
      <label className='text-[#ffffffb3]'>Поиск</label>
      <div className={styles.search}>
        <input
          style={{ paddingRight: '50px' }}
          type='text'
          className='input'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Поиск...'
        />
      </div>
      {data && data.length > 0 && (
        <SearchList results={data} setValues={setValues} setValue={setValue} />
      )}
    </div>
  )
}

export default memo(Search)
