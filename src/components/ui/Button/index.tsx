import React from 'react'

import { ButtonProps } from '@/types'
import { cn } from '@/utils'

import Spinner from '../Spinner'

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  color = 'secondary',
  variant = 'contained',
  size = 'sm',
  loading = false,
  ...rest
}: ButtonProps) => {
  const styleMap = {
    primary: {
      contained: 'bg-primary-600 text-white',
      outlined: 'border-primary border-sm text-primary',
    },
    secondary: {
      contained: 'bg-secondary-500 text-white',
      outlined: 'border-secondary border-sm text-secondary',
    },
  }

  const sizeMap = {
    sm: 'text-sm px-[14px] py-[10px] rounded-sm',
    lg: 'text-base px-4 py-4 font-semibold rounded-xl',
  }

  const buttonStyle = styleMap[color][variant]

  return (
    <button
      dir='rtl'
      className={cn(
        `${buttonStyle} ${sizeMap[size]} cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-400`,
        className
      )}
      {...rest}
      disabled={loading}
    >
      {loading ? (
        <div className='flex items-center justify-center gap-1.5'>
          <p className='font-semibold text-white'>صبر کنید...</p>
          <Spinner color='white' size='small' />
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
