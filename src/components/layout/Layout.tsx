import { useSession } from 'next-auth/react'
import AuthRequired from '../ui/AuthRequired/AuthRequired'
import styles from './Layout.module.scss'
import Header from './header/Header'
import Main from './main/Main'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const { data: session } = useSession()

  if (!session) return <AuthRequired />

  return (
    <div className={styles.wrapper}>
      <Header />
      <Main>{children}</Main>
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
