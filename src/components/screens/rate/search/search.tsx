import { type TypeEnum } from '@prisma/client'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { useOnClickOutside } from '~/hooks/useOnClickOutside'
import { ErrorMessage } from '~/ui/error-message'
import { RateLabel } from '~/ui/rate-label'
import { UiInput } from '~/ui/ui-input'
import { MOVIE_DB_IMAGE_URL } from '~/utils/constants'
import { type RateFormMovie } from '../useRateForm'
import { useSearchList } from './use-search-list'

interface Props {
  setMovieData: (data: RateFormMovie) => void
  errorMessage?: string
  poster: React.MutableRefObject<string | null>
}

export const Search = ({ setMovieData, errorMessage, poster }: Props) => {
  const [value, setValue] = useState('')

  const { data } = useSearchList(value)

  const searchRef = useRef(null)

  const handleClear = () => setValue('')

  useOnClickOutside(searchRef, handleClear)

  const handleSrc = (): string => {
    if (poster.current) return poster.current

    return '/default-cover-rate.svg'
  }

  const handleClick = (item: RateFormMovie) => {
    setMovieData(item)
    poster.current = item.poster ? item.poster : null
    handleClear()
  }

  return (
    <>
      <RateLabel label='Поиск' />
      <div ref={searchRef} className='relative'>
        <div className='relative flex items-center'>
          <UiInput
            style={{ paddingRight: '40px' }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Поиск...'
          />
          {!!value.length && (
            <button
              className='absolute right-4 cursor-pointer'
              onClick={handleClear}>
              <IoClose size='25px' />
            </button>
          )}
        </div>
        {data && data.length > 0 && (
          <ul className='absolute left-0 top-full h-96 w-full overflow-y-auto border border-white/10 bg-[#1e1e1e] p-[0.625rem]'>
            {data.map(
              ({
                id,
                title,
                name,
                poster_path,
                release_date,
                first_air_date,
                vote_average,
                media_type
              }) => {
                const label = title ?? name ?? ''
                return (
                  <li
                    key={id}
                    className='relative flex cursor-pointer gap-3 rounded-lg px-4 py-3 hover:bg-white/10'
                    onClick={() =>
                      handleClick({
                        title: label,
                        poster: poster_path
                          ? `${MOVIE_DB_IMAGE_URL}${poster_path}`
                          : undefined,
                        type: media_type.toUpperCase() as TypeEnum
                      })
                    }>
                    <Image
                      width={100}
                      height={150}
                      src={
                        poster_path
                          ? `${MOVIE_DB_IMAGE_URL}/${poster_path}`
                          : '/default-cover-rate.svg'
                      }
                      alt={label}
                    />
                    <div className='flex flex-col gap-y-2'>
                      <h3>
                        <b>{label}</b>
                      </h3>
                      {release_date && (
                        <p>{new Date(release_date).getFullYear()}</p>
                      )}
                      {first_air_date && (
                        <p>{new Date(first_air_date).getFullYear()}</p>
                      )}
                      {vote_average && (
                        <div className='flex gap-2'>
                          <FaStar size='25px' fill='#ffbf00' />
                          {vote_average.toFixed(1)}
                        </div>
                      )}
                    </div>
                  </li>
                )
              }
            )}
          </ul>
        )}
      </div>
      <RateLabel label='Постер' isRequired />
      <Image
        className='mx-auto mb-2'
        width={200}
        height={200}
        src={handleSrc()}
        alt='Cover'
      />
      <ErrorMessage message={errorMessage} />
    </>
  )
}
