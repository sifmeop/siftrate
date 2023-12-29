import { type UseFormRegister } from 'react-hook-form'
import { RateLabel } from '../rate-label'
import { UiTextarea } from '../ui-textarea'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
}

export const UiComment = ({ register }: Props) => {
  return (
    <>
      <RateLabel label='Комментарий' />
      <UiTextarea
        register={register('comment')}
        rows={5}
        cols={100}
        placeholder='Комментарий...'
      />
    </>
  )
}
