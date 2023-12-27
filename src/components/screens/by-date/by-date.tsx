import { ByDateMovieList } from './by-date-list'
import { MonthsSelector } from './months-selector/months-selector'
import { YearsSelector } from './years-selector/years-selector'

export const ByDate = () => {
  return (
    <>
      <div className='mx-auto max-w-[1730px]'>
        <YearsSelector />
        <MonthsSelector />
      </div>
      <ByDateMovieList />
    </>
  )
}
