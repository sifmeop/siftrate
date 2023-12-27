interface Props {
  children: string
}

export const PageSubTitle = ({ children }: Props) => {
  return (
    <h2 className='text-center text-2xl font-semibold mobile:text-xl'>
      {children}
    </h2>
  )
}
