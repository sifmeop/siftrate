import { RateLabel } from '~/ui/rate-label'
import { UiTextarea } from '~/ui/ui-textarea'
import { type RegisterRateForm } from '../useRateForm'

interface Props {
  register: RegisterRateForm
}

export const Comment = ({ register }: Props) => {
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
