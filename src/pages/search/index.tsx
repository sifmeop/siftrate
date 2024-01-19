import { Search } from '~/screens/search'
import { Meta } from '~/utils/Meta'

const SearchPage = () => {
  return (
    <>
      <Meta title='ПОИСК' description='Поиск пользователей' />
      <Search />
    </>
  )
}

export default SearchPage
