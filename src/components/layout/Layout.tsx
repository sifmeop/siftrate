import styles from './Layout.module.scss'
import Header from './header/Header'
import Main from './main/Main'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  // const { data: session } = useSession()
  // const router = useRouter()

  // useEffect(() => {
  //   if (!session) {
  //     void router.push('/api/auth/signin')
  //   }
  // }, [session])

  return (
    <div className={styles.wrapper}>
      <Header />
      <Main>{children}</Main>
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
