/* eslint-disable @next/next/no-img-element */
import { memo, useEffect } from 'react'

interface Props {
  link: string
  error: boolean
  setError: (value: boolean) => void
}

const ImageLink = ({ error, setError, link }: Props) => {
  useEffect(() => {
    setError(false)
  }, [link])

  const handleSrc = (): string => {
    if (error) return '/unknown.svg'

    if (link) return link

    return '/unknown.svg'
  }

  return (
    <div>
      <label className='text-[#ffffffb3]'>
        Постер<span className='text-red'>*</span>
      </label>
      <div>
        <img
          className='mx-auto mb-2'
          width={200}
          height={200}
          src={handleSrc()}
          alt='Link film'
          onError={() => setError(true)}
        />
        {error && (
          <p className='text-center text-red'>Ошибка загрузки изображения</p>
        )}
      </div>
    </div>
  )
}

export default memo(ImageLink)
