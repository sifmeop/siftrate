import { type User } from '@prisma/client'
import Image from 'next/image'
import { PageTitle } from '~/ui/page-title'
import { RatedList } from '~/ui/rated-list'
import { api } from '~/utils/api'

interface Props {
  user: User
}

const Profile = ({ user }: Props) => {
  const response = api.rate.getAllRatedMovies.useQuery({ userId: user.id })

  return (
    <>
      <div className='mx-auto mb-[1.5625rem] flex w-fit items-center gap-4 rounded-lg bg-white/50 p-4'>
        <Image
          className='rounded-full'
          width={75}
          height={75}
          src={user?.image ?? ''}
          alt={user?.name ?? ''}
        />
        <p className='text-xl font-bold'>{user?.name}</p>
      </div>
      <PageTitle>РЕЙТИНГ</PageTitle>
      <RatedList isUserProfile {...response} />
    </>
  )
}

export default Profile
