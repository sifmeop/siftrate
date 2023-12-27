import clsx from 'clsx'
import { Montserrat } from 'next/font/google'
import { Header } from './header/header'
import { Main } from './main/main'

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin']
})

interface Props {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className={clsx('h-full', montserrat.className)}>
      <Header />
      <Main>{children}</Main>
    </div>
  )
}
