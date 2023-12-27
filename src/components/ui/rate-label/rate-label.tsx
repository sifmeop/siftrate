interface Props {
  label: string
  isRequired?: boolean
}

export const RateLabel = ({ label, isRequired }: Props) => {
  return (
    <label className='text-[#ffffffb3]'>
      {label} {isRequired && <span className='text-red'>*</span>}
    </label>
  )
}
