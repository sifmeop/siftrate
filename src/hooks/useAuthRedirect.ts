import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'

export const useAuthRedirect = () => {
  const { status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') void signIn()
  }, [status])

  return { status }
}
