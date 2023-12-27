import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useUser } from '~/hooks/useUser'
import { UiCheckbox } from '~/ui/ui-checkbox'
import { api } from '~/utils/api'
import { LinkRating } from '../link-rating/link-rating'

export const VisibleRateWrapper = () => {
  const { isVisibleRate } = useUser()
  const [isVisible, setIsVisible] = useState(isVisibleRate)

  return (
    <>
      <VisibleRate isVisible={isVisible} setIsVisible={setIsVisible} />
      {isVisible && <LinkRating />}
    </>
  )
}

interface VisibleRateProps {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const VisibleRate = ({ isVisible, setIsVisible }: VisibleRateProps) => {
  const { id } = useUser()
  const { mutateAsync, isLoading } = api.user.toggleVisible.useMutation()

  const handleClick = async () => {
    try {
      await toast.promise(mutateAsync({ id, isVisibleRate: !isVisible }), {
        loading: 'Изменение...',
        success: () => {
          setIsVisible((prevValue) => !prevValue)
          return `Профиль ${!isVisible ? 'скрыт' : 'открыт'}`
        },
        error: 'Ошибка изменения'
      })
    } catch (error) {
      console.log('ОШИБКА ИЗМЕНЕНИЯ ВИДИМОСТИ', error)
    }
  }

  return (
    <div className='flex items-center justify-center'>
      {isVisible
        ? 'Видимость рейтинга: Видима'
        : 'Видимость рейтинга: Не видима'}
      <UiCheckbox isSelected={isVisible} onClick={handleClick} />
    </div>
  )
}
