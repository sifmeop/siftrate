import { Loader } from '../loader'

export const FullScreenLoader = () => {
  return (
    <div className='fixed inset-0 z-20 grid place-items-center bg-black'>
      <Loader />
    </div>
  )
}
