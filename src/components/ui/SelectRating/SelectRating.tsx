import { type Option } from '@/types/select.interface'
import { ratedListOptions } from '@/utils/ratedListOptions'
import { type RatedMovie } from '@prisma/client'
import { useEffect, useState } from 'react'
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

const customStylesSelect:
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

const SelectRating = ({ data, setList }: Props) => {
  const options = ratedListOptions(data)

  const [value, setValue] = useState(options[0])

  useEffect(() => {
    setList(data)
    setValue(options[0])
  }, [data])

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
    setValue(selectedOption as Option)
    if (selectedOption?.value === 'all') {
      setList(data)
      return
    }
    setList(
      data.filter((movie) => movie.rated.toString() === selectedOption?.value)
    )
  }

  return data.length > 0 ? (
    <Select
      aria-label='select rating stars'
      className='w-full max-w-[200px]'
      styles={customStylesSelect}
      options={options}
      onChange={(selectedOption) => handleChange(selectedOption)}
      value={value}
      getOptionLabel={(options) => `${options.label} ${options.count}`}
      getOptionValue={(options) => options.value}
      components={{ SingleValue, Option }}
      isSearchable={false}
    />
  ) : null
}

export default SelectRating
