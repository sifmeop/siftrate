import { signIn, useSession } from 'next-auth/react'
import { FaGithub, FaGoogle, FaTwitch } from 'react-icons/fa'
import { FullScreenLoader } from '../full-screen-loader'
import { UiButton } from '../ui-button'

interface Props {
  children: React.ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  const { status } = useSession()

  const isLoading = status === 'loading'
  const isUnauthenticated = status === 'unauthenticated'

  if (isLoading) {
    return <FullScreenLoader />
  }

  if (isUnauthenticated) {
    return (
      <div className='mx-auto flex h-screen w-full max-w-80 flex-col items-center justify-center gap-2'>
        <p>ВОЙТИ</p>
        <UiButton className='w-full' onClick={() => signIn('google')}>
          <FaGoogle />
        </UiButton>
        <UiButton className='w-full' onClick={() => signIn('twitch')} disabled>
          <FaTwitch />
        </UiButton>
        <UiButton className='w-full' onClick={() => signIn('github')} disabled>
          <FaGithub />
        </UiButton>
      </div>
    )
  }

  return children
}
