import { FC } from 'react'
import { ChipsProps } from '@/types'
import { cn } from '@/utils'

const Chips: FC<ChipsProps> = ({
  dir = 'ltr',
  icon,
  textClassName,
  text,
  className,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center justify-center rounded-sm bg-gray-100 px-2 py-1',
        { 'flex-row-reverse': dir === 'rtl' },
        className
      )}
      {...props}
    >
      {icon && (
        <span
          className={cn('flex items-center justify-center pr-1', {
            'pl-1': dir === 'rtl',
          })}
        >
          {icon}
        </span>
      )}
      <div>
        <p
          className={cn(
            'flex h-[18px] items-center justify-center text-xl font-medium',
            textClassName
          )}
        >
          {text}
        </p>
      </div>
    </div>
  )
}

export default Chips
