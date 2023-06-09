import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import styles from './Home.module.scss'

const Home = () => {
  const { data } = useSession()

  const name = data?.user?.name as string

  return data ? (
    <>
      <h1 className='title'>ПРОФИЛЬ</h1>
      <div className={styles.profile}>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.info}>
          <Image
            className={styles.photo}
            width={100}
            height={100}
            src={data.user.image!}
            alt={`Photo ${name}`}
          />
          <p className={styles.mail}>{data.user.email}</p>
          <button className={styles.button} onClick={() => void signOut()}>
            Выйти
          </button>
        </div>
      </div>
    </>
  ) : null
}

export default Home
