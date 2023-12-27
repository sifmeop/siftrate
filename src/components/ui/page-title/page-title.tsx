interface Props {
  children: string
}

export const PageTitle = ({ children }: Props) => {
  return (
    <h1 className='mb-7 text-center text-3xl font-semibold mobile:text-2xl'>
      {children}
    </h1>
  )
}
