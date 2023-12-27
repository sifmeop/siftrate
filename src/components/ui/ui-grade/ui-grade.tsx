import { useState } from 'react'
import { ErrorMessage } from '../error-message'
import { RateLabel } from '../rate-label'
import { UiInput } from '../ui-input'

interface Props {
  setValue: (value: string) => void
  errorMessage?: string
}

export const UiGrade = ({ setValue, errorMessage }: Props) => {
  const [grade, setGrade] = useState('')

  return (
    <>
      <RateLabel label='Оценка' isRequired />
      <div className='flex items-center justify-center gap-2 text-4xl'>
        <UiInput
          inputMode='decimal'
          style={{
            width: '60px',
            height: '50px',
            textAlign: 'center',
            padding: '0',
            fontSize: '36px',
            lineHeight: '40px'
          }}
          className='h-[50px] w-[50px] p-0 text-center text-4xl'
          value={grade}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '')

            if (value.length > 2 || +value > 10) {
              setGrade('10')
              setValue('10')
            } else if (value === '00') {
              setGrade('0')
              setValue('0')
            } else if (value[0] && value[1]) {
              setGrade(`${value[0]}.${value[1]}`)
              setValue(`${value[0]}.${value[1]}`)
            } else {
              setGrade(value)
              setValue(value)
            }
          }}
        />
        <span>/</span>
        <span>10</span>
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </>
  )
}
