import Image from 'next/image'

interface Props {
  label: string
  count: number
}

const SelectOptionComponent = ({ label, count }: Props) => {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex gap-2'>
        <Image
          width={20}
          height={20}
          src='/rate.svg'
          alt='Иконка звезды оценки'
        />
        {label}
      </div>
      <p className='opacity-60'>{count}</p>
    </div>
  )
}

export default SelectOptionComponent
