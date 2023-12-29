import {
  Button as NextUIButton,
  cn,
  type ButtonProps as NextUIButtonProps
} from '@nextui-org/react'

type Props = NextUIButtonProps

export const UiButton = ({ children, className, ...props }: Props) => {
  return (
    <NextUIButton
      className={cn(
        'inline-flex h-[3.125rem] items-center gap-2 rounded-lg border border-white/10 bg-[#1e1e1e] px-5 py-2 text-base outline-2 outline-offset-2 outline-transparent transition-all duration-300 hover:border-[#ffffff33] focus:border-[#ffffff66] focus:outline-none',
        className
      )}
      {...props}>
      {children}
    </NextUIButton>
  )
}
