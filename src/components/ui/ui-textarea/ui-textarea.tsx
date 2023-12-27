import { type UseFormRegisterReturn } from 'react-hook-form'
import { cn } from '~/utils/cn'
import styles from './ui-textarea.module.scss'

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  register?: UseFormRegisterReturn
}

export const UiTextarea = ({ register, className, ...props }: Props) => {
  return (
    <textarea
      {...register}
      className={cn(styles.textarea, className)}
      {...props}
    />
  )
}
