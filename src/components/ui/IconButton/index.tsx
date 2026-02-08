import { FC, ReactNode } from 'react'
import { cn } from '@/utils'

interface IconButton {
  icon?: ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement> | any
}

const IconButton: FC<IconButton> = ({ icon, className, onClick }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-[50%] bg-primary-900 p-1',
        className
      )}
    >
      {icon}
    </button>
  )
}

export default IconButton
