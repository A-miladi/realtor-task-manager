import { ComponentPropsWithRef, ReactNode } from 'react'

import { cn } from '@/utils'

interface IInputProps extends ComponentPropsWithRef<'input'> {
  error?: boolean
  helperText?: string
  label?: string
  parent?: string
  icon?: ReactNode
  // ref: ForwardedRef<HTMLInputElement>
  labelClassName?: string
}

function TextInput({
  error,
  parent,
  helperText,
  label,
  disabled,
  name,
  icon,
  className,
  labelClassName,
  dir = 'rtl',
  ...rest
}: IInputProps) {
  return (
    <div className={cn('flex flex-col gap-1', parent)}>
      {label && (
        <label
          className={`mb-1 pr-1 text-right text-sm font-medium text-black ${labelClassName}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className='relative flex items-center justify-start'>
        {icon && (
          <div className='absolute right-2 top-1/2 max-w-5 -translate-y-1/2 overflow-hidden'>
            {icon}
          </div>
        )}
        <input
          className={cn(
            'rounded-sm bg-neutral-50 px-2 py-[6px] text-xs placeholder:text-neutral-300 focus:border-primary-700 focus:outline-none focus:ring-0',
            {
              'pr-6': icon,
              'border-danger': error,
              'bg-lightGray': disabled,
              'pr-8 placeholder:text-right': dir === 'rtl',
              'placeholder:text-left': dir === 'ltr',
            },
            className
          )}
          {...rest}
        />
      </div>
      {helperText && (
        <span
          className={cn('pr-1 text-xs text-error-600', {
            'text-danger': error,
          })}
        >
          {helperText}
        </span>
      )}
    </div>
  )
}

export default TextInput
