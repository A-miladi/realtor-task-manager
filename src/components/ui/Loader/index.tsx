import { FC } from 'react'

import { cn } from '@/utils'

interface IconButton {
  className?: string
}

const Loader: FC<IconButton> = ({ className }) => {
  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <div className='h-8 w-8 animate-spin rounded-full border-b-[2px] border-t-[2px] border-b-neutral-300 border-t-primary-600'></div>
    </div>
  )
}

export default Loader
