import { Checkbox, type CheckboxProps } from '@nextui-org/react'

type Props = CheckboxProps

export const UiCheckbox = ({ children, ...props }: Props) => {
  return (
    <Checkbox
      size='lg'
      radius='sm'
      classNames={{
        base: 'ml-0',
        wrapper: 'bg-[#1e1e1e] mr-0'
      }}
      {...props}>
      {children}
    </Checkbox>
  )
}
