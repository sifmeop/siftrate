import { Select, SelectItem } from '@nextui-org/react'

export interface IOption {
  label: string
  value: string
  isDisabled: boolean
}

interface Props {
  label: string
  options?: IOption[]
}

export const UiSelect = ({ label, options }: Props) => {
  if (!options?.length) {
    return null
  }

  return (
    <Select label={label}>
      {options.map(({ label, value }) => (
        <SelectItem key={label} value={value} endContent={value}>
          {label}
        </SelectItem>
      ))}
    </Select>
  )
}
