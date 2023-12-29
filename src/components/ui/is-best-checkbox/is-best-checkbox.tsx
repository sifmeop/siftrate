import { Controller, type Control, type FieldValues } from 'react-hook-form'
import { UiCheckbox } from '../ui-checkbox'

interface Props {
  control: Control<FieldValues>
}

export const IsBestCheckbox = ({ control }: Props) => {
  return (
    <Controller
      control={control}
      name='isBest'
      render={({ field: { value, onChange } }) => (
        <UiCheckbox
          className='mx-auto gap-2'
          isSelected={value as boolean}
          onValueChange={onChange}>
          Лучший?
        </UiCheckbox>
      )}
    />
  )
}
