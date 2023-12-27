interface Props {
  message: string | undefined
}

export const ErrorMessage = ({ message }: Props) => {
  if (!message) return null

  return <p className='text-red'>{message}</p>
}
