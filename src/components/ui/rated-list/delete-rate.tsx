import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure
} from '@nextui-org/react'
import toast from 'react-hot-toast'
import { MdDelete } from 'react-icons/md'
import { queryClient } from '~/pages/_app'
import { api } from '~/utils/api'
import { UiButton } from '../ui-button'

interface Props {
  id: string
  title: string
}

export const DeleteRate = ({ id, title }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { mutateAsync, isLoading } = api.rate.deleteRate.useMutation()

  const onDelete = async () => {
    try {
      await mutateAsync(
        { id },
        {
          onSuccess: () => void queryClient.invalidateQueries()
        }
      ).then(() => {
        onClose()
        toast.success('Успешно удалено')
      })
    } catch (error) {
      console.log('ОШИБКА УДАЛЕНИЯ ОТЗЫВА', error)
      toast.error('Ошибка удаления отзыва')
    }
  }

  return (
    <>
      <UiButton className='h-10 w-10 min-w-10 p-1' onPress={onOpen}>
        <MdDelete size='20px' />
      </UiButton>
      <Modal
        backdrop='blur'
        placement='center'
        isOpen={isOpen}
        onClose={!isLoading ? onClose : undefined}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
              <ModalBody>Вы уверены, что хотите удалить этот отзыв?</ModalBody>
              <ModalFooter>
                <UiButton onPress={onClose} isDisabled={isLoading}>
                  Отмена
                </UiButton>
                <UiButton
                  onPress={onDelete}
                  isLoading={isLoading}
                  spinner={<Spinner />}>
                  {isLoading ? 'Идёт удаление...' : 'Удалить'}
                </UiButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
