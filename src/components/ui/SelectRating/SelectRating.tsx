import { type Option } from '@/types/select.interface'
import { ratedListOptions } from '@/utils/ratedListOptions'
import { type RatedMovie } from '@prisma/client'
import { useEffect } from 'react'
import Select, {
  components,
  type GroupBase,
  type OptionProps,
  type SingleValue,
  type SingleValueProps,
  type StylesConfig
} from 'react-select'
import SelectOptionComponent from './SelectOptionComponent'

interface Props {
  data: RatedMovie[]
  setList: (list: RatedMovie[]) => void
}

const SelectRating = ({ data, setList }: Props) => {
  const options = ratedListOptions(data)

  useEffect(() => {
    setList(data)
  }, [data])

  const customStyles:
    | StylesConfig<Option, false, GroupBase<Option>>
    | undefined = {
    option: (provided) => ({
      ...provided,
      color: 'black'
    }),
    control: (provided) => ({
      ...provided,
      color: 'black'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black'
    })
  }

  const SingleValue = (props: SingleValueProps<Option>) => {
    const { label, count } = props.data

    return (
      <components.SingleValue {...props}>
        <SelectOptionComponent label={label} count={count} />
      </components.SingleValue>
    )
  }

  const Option = (props: OptionProps<Option>) => {
    const { label, count } = props.data

    return (
      <components.Option {...props}>
        <SelectOptionComponent label={label} count={count} />
      </components.Option>
    )
  }

  const handleChange = (selectedOption: SingleValue<Option>) => {
    if (selectedOption?.value === 'all') {
      setList(data)
      return
    }
    setList(
      data.filter((movie) => movie.rated.toString() === selectedOption?.value)
    )
  }

  return (
    <Select
      aria-label='select rating stars'
      className='mb-5 ml-auto max-w-[200px]'
      styles={customStyles}
      options={options}
      onChange={(selectedOption) => handleChange(selectedOption)}
      defaultValue={options[0]}
      getOptionLabel={(options) => `${options.label} ${options.count}`}
      getOptionValue={(options) => options.value}
      components={{ SingleValue, Option }}
      isSearchable={false}
    />
  )
}

export default SelectRating
