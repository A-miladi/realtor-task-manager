import { ComponentPropsWithRef, ForwardedRef } from 'react'

import { cn } from '@/utils'

interface IInputProps extends ComponentPropsWithRef<'textarea'> {
  error?: boolean
  helperText?: string
  labelClassName?: string
  label?: string
  ref?: ForwardedRef<HTMLTextAreaElement>
  resize?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

function TextArea({
  error,
  helperText,
  label,
  disabled,
  name,
  ref,
  onChange,
  className,
  labelClassName,
  dir = 'rtl',
  resize = true,
  ...rest
}: IInputProps) {
  return (
    <div className='flex h-full w-full flex-col'>
      {label && (
        <label
          className={cn(
            'mb-1 pr-1 text-right text-sm text-black',
            labelClassName
          )}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className='flex items-center justify-start'>
        <textarea
          onChange={onChange}
          className={cn(
            'placeholder:text-primary focus:border-secondary rounded-sm border-sm border-gray-900 px-2 py-[6px] text-xs focus:outline-none focus:ring-0',
            {
              'border-danger': error,
              'bg-lightGray': disabled,
              'placeholder:text-right': dir === 'rtl',
              'placeholder:text-left': dir === 'ltr',
              'resize-none': !resize,
            },
            className
          )}
          ref={ref}
          {...rest}
        />
      </div>
      {helperText && (
        <span className={cn('text-primary text-xs', { 'text-danger': error })}>
          {helperText}
        </span>
      )}
    </div>
  )
}

export default TextArea
