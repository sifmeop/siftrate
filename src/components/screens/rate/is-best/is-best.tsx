import { Controller, type Control } from 'react-hook-form'
import { UiCheckbox } from '~/ui/ui-checkbox'
import { type RateForm } from '../useRateForm'

interface Props {
  control: Control<RateForm>
}

export const IsBest = ({ control }: Props) => {
  return (
    <Controller
      control={control}
      name='isBest'
      render={({ field: { value, onChange } }) => (
        <UiCheckbox
          className='mx-auto gap-2'
          isSelected={value}
          onValueChange={onChange}>
          Лучший?
        </UiCheckbox>
      )}
    />
  )
}
