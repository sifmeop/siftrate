import { useState } from 'react'
import { useUser } from '~/hooks/useUser'
import { api } from '~/utils/api'

export const useVisibleRate = () => {
  const { id, isVisibleRate } = useUser()
  const [isVisible, setIsVisible] = useState(isVisibleRate)

  const { mutate, isLoading } = api.user.toggleVisible.useMutation()

  try {
  } catch (error) {
    console.log('ОШИБКА ИЗМЕНЕНИЯ ВИДИМОСТИ', error)
  }

  return { isVisible }
}
