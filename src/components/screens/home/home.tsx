import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useUser } from '~/hooks/useUser'
import { UiButton } from '~/ui/ui-button'
import { VisibleRateWrapper } from './visible-rate/visible-rate'

export const Home = () => {
  const { image, name, email } = useUser()

  return (
    <div className='grid justify-center gap-3 text-center'>
      <div className='mx-auto max-w-fit rounded-lg bg-white/10'>
        <h2 className='rounded-t-lg bg-white/50 px-8 py-4 text-xl font-bold'>
          {name ?? '-'}
        </h2>
        <div className='flex flex-col items-center gap-3 p-3'>
          <Image
            className='mx-auto h-32 w-32 rounded-full'
            width={100}
            height={100}
            src={image ?? '/default-avatar-user.jpg'}
            alt={`Photo ${name ?? 'user'}`}
          />
          <p className='text-lg font-medium'>{email ?? '-'}</p>
          <UiButton className='w-full' onClick={() => void signOut()}>
            Выйти
          </UiButton>
        </div>
      </div>
      <VisibleRateWrapper />
    </div>
  )
}
