import { FC } from 'react'

import CheckIcon from '@/components/icons/CheckIcon'
import { CheckboxProps } from '@/types'
import { cn } from '@/utils'

const CheckBox: FC<CheckboxProps> = ({
  label,
  size = 'medium',
  disabled = false,
  checked = false,
  value,
  onChange,
  className,
  ...props
}) => {
  const CheckBoxSizeClasses = {
    small: 'h-[16px] w-[16px]',
    medium: 'h-[20px] w-[20px]',
    large: 'h-[24px] w-[24px]',
  }
  return (
    <div className='flex cursor-pointer flex-row items-center gap-2'>
      <input
        type='checkbox'
        value={value}
        className='hidden'
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <span
        className={cn(
          'relative border border-neutral-100 transition-all duration-200 ease-in-out',
          CheckBoxSizeClasses[size],
          checked ? 'relative border-transparent bg-primary-600' : 'bg-white',
          disabled
            ? 'cursor-not-allowed border-[1px] border-neutral-700 bg-neutral-50'
            : 'cursor-pointer',
          'rounded-[4px]',
          className
        )}
      >
        {checked && <CheckIcon className='fill-white' size={15} />}
      </span>
      {label && (
        <span
          className={cn(
            'ml-2 text-xs md:text-sm',
            disabled ? 'text-neutral-700' : 'text-primary-200'
          )}
        >
          {label}
        </span>
      )}
    </div>
  )
}

export default CheckBox
