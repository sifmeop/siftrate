import { useSession } from 'next-auth/react'
import AuthRequired from '../ui/AuthRequired/AuthRequired'
import Loader from '../ui/Loader/Loader'
import styles from './Layout.module.scss'
import Header from './header/Header'
import Main from './main/Main'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const { data: session, status } = useSession()

  if (status === 'loading')
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    )

  if (!session) return <AuthRequired />

  return (
    <div className={styles.wrapper}>
      <Header />
      <Main>{children}</Main>
    </div>
  )
}

export default Layout
