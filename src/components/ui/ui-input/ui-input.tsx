import { type UseFormRegisterReturn } from 'react-hook-form'
import { cn } from '~/utils/cn'
import styles from './ui-input.module.scss'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegisterReturn
}

export const UiInput = ({ className, ...props }: Props) => {
  return <input className={cn(styles.input, className)} {...props} />
}
