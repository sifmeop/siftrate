import { type Form } from '@/types/form.interface'
import { memo } from 'react'
import { type UseFormRegister } from 'react-hook-form'

interface Props {
  register: UseFormRegister<Form>
}

const Commentary = ({ register }: Props) => {
  return (
    <div>
      <label className='text-[#ffffffb3]'>Комментарий</label>
      <textarea
        {...register('comment')}
        className='textarea'
        rows={5}
        cols={100}
        placeholder='Комментарий...'
      />
    </div>
  )
}

export default memo(Commentary)
