import { signIn } from 'next-auth/react'

const AuthRequired = () => {
  return (
    <div className='grid h-screen w-screen place-items-center'>
      <button className='loginButton' onClick={() => void signIn('google')}>
        ВОЙТИ (Google)
      </button>
    </div>
  )
}

export default AuthRequired
