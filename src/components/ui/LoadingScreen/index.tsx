import Spinner from '../Spinner'

const LoadingScreen = () => {
  return (
    <div
      dir='rtl'
      className='absolute inset-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm'
    >
      <div className='flex items-center gap-2'>
        <p className='font-semibold text-white'>در حال بارگذاری...</p>
        <Spinner color='white' size='large' />
      </div>
    </div>
  )
}

export default LoadingScreen
