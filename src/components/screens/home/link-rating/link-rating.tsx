import { toast } from 'react-hot-toast'
import { RxCopy } from 'react-icons/rx'
import { useUser } from '~/hooks/useUser'

export const LinkRating = () => {
  const { id } = useUser()

  const link = `${window.location.origin}/user/${id}`

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(link).then(() => {
        toast.success('Успешно скопировано')
      })
    } catch (error) {
      toast.error('Не удалось скопировать ссылку')
      console.log('Не удалось скопировать ссылку', error)
    }
  }

  return (
    <>
      <p className='text-lg'>Ссылка на рейтинг</p>
      <div className='flex overflow-hidden rounded-[10px] bg-white/10'>
        <p className='overflow-hidden text-ellipsis px-4 py-2'>{link}</p>
        <button
          className='block rounded-r-[10px] bg-white/50 p-2 transition-all hover:bg-white/40 active:bg-white/30'
          onClick={() => void handleClick()}>
          <RxCopy size='25px' />
        </button>
      </div>
    </>
  )
}
