import { FC } from 'react'

import ArrowLeft from '@/components/icons/Arrow-left'
import User from '@/components/icons/User'
interface TaskCard {
  title?: string
  adviser?: string
  count?: number | string
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

const TaskCard: FC<TaskCard> = ({ title, adviser, count, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='flex h-20 w-full cursor-pointer items-center justify-between overflow-hidden rounded-2xl border border-neutral-50'
      dir='rtl'
    >
      <div className='flex h-full w-1/6 items-center justify-center border-l border-neutral-200 bg-neutral-200 text-neutral-800'>
        <p>{count}.</p>
      </div>
      <div className='relative flex h-full w-5/6 flex-col items-start justify-center gap-1 bg-neutral-50 px-2'>
        <p className='w-3/4 truncate text-lg font-medium text-neutral-800'>
          {title}
        </p>
        <span
          className='flex items-end justify-center gap-1 text-neutral-600'
          dir='rtl'
        >
          <User color='var(--neutral-600)' size={25} />
          <p>{adviser}</p>
        </span>
        <ArrowLeft
          className='absolute left-2'
          color='var(--primary-600)'
          size={25}
        />
      </div>
    </div>
  )
}

export default TaskCard
