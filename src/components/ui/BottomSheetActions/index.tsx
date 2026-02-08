import Button from '../Button'

type BottomSheetActionsProps = {
  // optional props should remove later
  acceptAction?: () => void
  clearAction?: () => void
}

const BottomSheetActions = ({
  acceptAction,
  clearAction,
}: BottomSheetActionsProps) => {
  return (
    <div className='mt-6 flex gap-4 md:hidden'>
      <Button
        className='flex w-[74px] items-center justify-center rounded-sm'
        color='secondary'
        variant='contained'
        onClick={acceptAction}
      >
        <p className='text-xs font-[600]'>تایید</p>
      </Button>
      <Button
        color='primary'
        className='flex items-center rounded-sm px-3.5 py-2.5'
        variant='outlined'
        onClick={clearAction}
      >
        <p className='w-full text-xs font-[600]'>پاک کردن</p>
      </Button>
    </div>
  )
}

export default BottomSheetActions
