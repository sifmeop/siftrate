import { type Form } from '@/types/form.interface'
import clsx from 'clsx'
import { type FieldErrors, type UseFormRegister } from 'react-hook-form'
import styles from './Rating.module.scss'

interface Props {
  register: UseFormRegister<Form>
  errors: FieldErrors<Form>
}

const Rating = ({ register, errors }: Props) => {
  return (
    <div>
      <label className='text-[#ffffffb3]'>
        Оценка<span className='text-red'>*</span>
      </label>
      <div className={styles.rating}>
        <input
          type='number'
          step='0.1'
          inputMode='numeric'
          className={clsx(styles.input, 'input')}
          {...register('rate', {
            required: 'Это обязательное поле ввода',
            min: {
              value: 0,
              message: 'Число должно быть выше 0'
            },
            max: {
              value: 10,
              message: 'Число должно быть меньше 10'
            }
          })}
        />
        <span>/</span>
        <span>10</span>
      </div>
      {errors.rate?.message && (
        <p className='text-red'>{errors.rate.message}</p>
      )}
    </div>
  )
}

export default Rating
