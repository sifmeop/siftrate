import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure
} from '@nextui-org/react'
import { type RatedMovie } from '@prisma/client'
import { useForm, type Control, type FieldValues } from 'react-hook-form'
import toast from 'react-hot-toast'
import { MdEdit } from 'react-icons/md'
import { z } from 'zod'
import { queryClient } from '~/pages/_app'
import { api } from '~/utils/api'
import { IsBestCheckbox } from '../is-best-checkbox/is-best-checkbox'
import { UiButton } from '../ui-button'
import { UiComment } from '../ui-comment/ui-comment'
import { UiGrade } from '../ui-grade'

type Props = RatedMovie

const schema = z.object({
  rated: z
    .number({
      required_error: 'Укажите рейтинг'
    })
    .min(0, 'Минимальный рейтинг 0')
    .max(10, 'Максимальный рейтинг 10')
    .step(0.1, 'Допустимо 1 знак после точки'),
  comment: z.string(),
  isBest: z.boolean()
})

export type RateForm = z.infer<typeof schema>

export const EditRate = ({ id, title, comment, isBest, rated }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { mutateAsync, isLoading } = api.rate.editRate.useMutation()

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<RateForm>({
    defaultValues: {
      comment,
      rated,
      isBest
    }
  })

  const onSubmit = async (formData: RateForm) => {
    console.log(formData, 'formData')
    if (
      comment === formData.comment &&
      isBest === formData.isBest &&
      rated === formData.rated
    ) {
      onClose()
      return
    }
    const data = {
      id,
      comment: formData.comment,
      isBest: formData.isBest,
      rated: formData.rated
    }
    try {
      await toast.promise(
        mutateAsync(data, {
          onSuccess: () => void queryClient.invalidateQueries()
        }),
        {
          loading: 'Изменение...',
          success: () => {
            onClose()
            return 'Успешно изменено'
          },
          error: 'Ошибка изменения'
        }
      )
    } catch (error) {
      console.log('ОШИБКА ИЗМЕНЕНИЯ ОЦЕНКИ', error)
    }
  }

  return (
    <>
      <UiButton className='h-10 w-10 min-w-10 p-1' onClick={onOpen}>
        <MdEdit size='20px' />
      </UiButton>
      <Modal
        backdrop='blur'
        placement='center'
        isOpen={isOpen}
        onClose={
          !isLoading
            ? () => {
                onClose()
                reset()
              }
            : undefined
        }>
        <ModalContent as='form' onSubmit={handleSubmit(onSubmit)}>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
              <ModalBody>
                <UiComment register={register} />
                <IsBestCheckbox
                  control={control as unknown as Control<FieldValues>}
                />
                <UiGrade
                  register={register}
                  errorMessage={errors?.rated?.message}
                />
              </ModalBody>
              <ModalFooter>
                <UiButton
                  type='button'
                  onPress={onClose}
                  isDisabled={isLoading}>
                  Отмена
                </UiButton>
                <UiButton
                  type='submit'
                  isLoading={isLoading}
                  spinner={<Spinner />}>
                  {isLoading ? 'Идёт изменение...' : 'Изменить'}
                </UiButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
