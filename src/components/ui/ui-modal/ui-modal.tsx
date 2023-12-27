import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'

interface Props {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
}

export const UiModal = ({ isOpen, onClose, children, title }: Props) => {
  return (
    <Modal size='2xl' isOpen={isOpen} onClose={onClose} placement='center'>
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
        <ModalBody className='py-3'>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
