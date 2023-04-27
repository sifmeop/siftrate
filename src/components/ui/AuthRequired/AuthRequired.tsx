import { handleLogin } from '@/utils/constants'

const AuthRequired = () => {
  return (
    <div className='grid h-screen w-screen place-items-center'>
      <button className='loginButton' onClick={() => void handleLogin()}>
        ВОЙТИ
      </button>
    </div>
  )
}

export default AuthRequired
