import { Spinner } from '@nextui-org/react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useQueryLoadingStore } from '~/store/query-loading'
import { cn } from '~/utils/cn'

export const QueryLoading = () => {
  const { isLoading } = useQueryLoadingStore()

  useEffect(() => {
    if (isLoading) {
      document.documentElement.style.overflowY = 'hidden'
    } else {
      document.documentElement.style.overflowY = 'auto'
    }
  }, [])

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 grid place-items-center transition-all duration-500',
        {
          'z-[51] bg-black/60 opacity-100': isLoading,
          '-z-10 bg-transparent opacity-0': !isLoading
        }
      )}>
      <Spinner size='lg' />
    </div>,
    document.body
  )
}
