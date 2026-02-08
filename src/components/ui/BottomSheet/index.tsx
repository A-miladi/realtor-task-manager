import React, { Dispatch, SetStateAction, useRef } from 'react'
import Line from '@/assets/icons/close-line.svg'
import useOutSideClick from '@/hooks/useOutSideClick'
import { cn } from '@/utils'

type BottomSheetProps = {
  showBottomSheet: boolean
  setShowBottomSheet: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}

const BottomSheet = ({
  showBottomSheet,
  setShowBottomSheet,
  children,
}: BottomSheetProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useOutSideClick(ref, () => {
    if (showBottomSheet) setShowBottomSheet(false)
  })

  return (
    <div
      className={cn({
        'bg-background fixed inset-0 z-20 flex h-full w-full items-end justify-center bg-opacity-80 duration-500':
          showBottomSheet,
      })}
    >
      <div
        className={cn(
          'z-50 w-full translate-y-0 transform bg-white px-8 pb-6 pt-3 opacity-100 duration-500 ease-in',
          {
            'fixed bottom-0 right-0 translate-y-full transform bg-transparent duration-500 ease-in':
              !showBottomSheet,
          }
        )}
        ref={ref}
      >
        <div
          onClick={() => setShowBottomSheet(!showBottomSheet)}
          className='mb-4 flex w-full justify-center'
        >
          <img src={Line} width={74} height={10} alt='' />
        </div>
        {children}
      </div>
    </div>
  )
}

export default BottomSheet
