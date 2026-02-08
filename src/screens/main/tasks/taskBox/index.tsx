import { FC } from 'react'

import { cn } from '@/utils'
interface TaskBox {
  className?: string
  text: string
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const TaskBox: FC<TaskBox> = ({ className, text, children }) => {
  return (
    <div className='relative flex h-[90%] w-[400px] flex-col items-center justify-start rounded-2xl border border-neutral-50 bg-black bg-opacity-50 pt-16 max-md:h-auto max-md:border-none md:mb-10'>
      <div
        className={cn(
          'top-0 z-10 flex h-12 w-full items-center justify-center border-b border-neutral-900 bg-success-600 max-md:rounded-2xl md:absolute md:rounded-t-2xl',
          className
        )}
      >
        <p className='text-white'>{text}</p>
      </div>
      {children}
    </div>
  )
}

export default TaskBox
