import { useRouter } from 'next/navigation'

export const NotFound = () => {
  const router = useRouter()

  router.push('/')

  return <></>
}
