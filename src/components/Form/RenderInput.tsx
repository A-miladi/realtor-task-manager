import { ChangeEvent, memo } from 'react'
import { useController } from 'react-hook-form'

import { PropsInput } from '@/types/Forms'

const RenderInput = ({ input }: PropsInput) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: input.name,
    control: input.control,
    rules: input.rules ?? {},
    defaultValue: input.defaultValue,
  })

  const handleOnChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    const maxLength = input.rules?.maxLength?.value
    if (maxLength && inputValue.length > maxLength) {
      return // Prevent input beyond max length
    }

    field.onChange(inputValue)
  }

  return (
    <div className='relative w-full'>
      {input.startIcon && (
        <span className='absolute right-2 top-1/2 -translate-y-1/2 transform'>
          {input.startIcon}
        </span>
      )}
      <input
        ref={field.ref}
        value={field.value === 0 ? '0' : field.value || ''}
        type={input.type === 'number' ? 'number' : input.type}
        placeholder={input.placeholder}
        onChange={handleOnChanged}
        onWheel={(e) => {
          const element = e.target as HTMLInputElement
          if (input.noInputArrow) {
            element.blur() // Prevent scroll for certain input types
          }
        }}
        className={`h-9 w-full rounded-lg border bg-neutral-50 py-2.5 pl-3 pr-3 text-right text-xs ${
          error ? 'border-red-500 focus:ring-error-500' : ''
        } transition focus:outline-none focus:ring-1 focus:ring-primary-500 active:outline-none ${
          input.readOnly ? 'cursor-not-allowed bg-gray-200' : ''
        }${input.className} no-arrows`}
        autoComplete={input.type === 'password' ? 'new-password' : 'off'}
        readOnly={input.readOnly}
        dir={input.isLtr ? 'ltr' : 'inherit'}
      />
      {input.endIcon && (
        <span className='absolute left-2 top-1/2 -translate-y-1/2 transform'>
          {input.endIcon}
        </span>
      )}
    </div>
  )
}

export default memo(RenderInput)
