import { type UseFormRegister } from 'react-hook-form'
import { ErrorMessage } from '../error-message'
import { RateLabel } from '../rate-label'
import { UiInput } from '../ui-input'

interface Props {
  errorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
}

export const UiGrade = ({ register, errorMessage }: Props) => {
  return (
    <>
      <RateLabel label='Оценка' isRequired />
      <div className='flex items-center justify-center gap-2 text-4xl'>
        <UiInput
          register={register('rated', {
            setValueAs: (value) => (value === '' ? undefined : +value)
          })}
          inputMode='decimal'
          type='number'
          step='0.1'
          style={{
            width: '60px',
            height: '50px',
            textAlign: 'center',
            padding: '0',
            fontSize: '36px',
            lineHeight: '40px'
          }}
        />
        <span>/</span>
        <span>10</span>
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </>
  )
}
