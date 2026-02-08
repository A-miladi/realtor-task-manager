import { RadioButtonProps } from '@/types'
import { cn } from '@/utils'

const RadioButton = ({
  dir = 'rtl',
  label,
  size,
  className,
  value,
  color,
  disabled,
  onChange,
  ...rest
}: RadioButtonProps) => {
  return (
    <label
      htmlFor='Radio'
      className={cn('flex items-center justify-start gap-2', {
        'flex-row-reverse': dir === 'rtl',
      })}
    >
      <p
        className={cn(
          'text-primary font-normal',
          size === 'small' && 'text-xs',
          size === 'medium' && 'text-sm',
          size === 'large' && 'text-base',
          color
        )}
      >
        {label}
      </p>
      <input
        id='Radio'
        value={value}
        type='checkbox'
        disabled={disabled}
        onChange={onChange}
        className={cn(
          'checked:disabled:border-gray disabled:hover:border-gray border-primary checked:border-secondary checked:hover:border-secondary h-5 w-5 appearance-none rounded-full border-[2px] transition-colors hover:border-black disabled:border-[10px] disabled:border-gray-300 checked:disabled:border-[5px]',
          className,
          size === 'small' && 'h-4 w-4 checked:border-[4px]',
          size === 'medium' && 'h-5 w-5 checked:border-[5px]',
          size === 'large' && 'h-6 w-6 checked:border-[6px]'
        )}
        {...rest}
      />
    </label>
  )
}

export default RadioButton
