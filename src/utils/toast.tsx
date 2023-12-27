import toast from 'react-hot-toast'
import { IoClose } from 'react-icons/io5'

type ToastType = 'success' | 'error' | 'promise'

const getToastMessage = (type: ToastType, message: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return toast[type]((t) => (
    <span className='flex items-center gap-2'>
      {message}{' '}
      <button onClick={() => toast.dismiss(t.id)}>
        <IoClose Close className='h-6 w-6' size='40px' />
      </button>
    </span>
  ))
}

export const UiTost = {
  success: (message: string) => getToastMessage('success', message),
  error: (message: string) => getToastMessage('error', message)
}
