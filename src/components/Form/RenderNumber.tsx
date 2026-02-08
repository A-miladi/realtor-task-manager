import { ChangeEvent, memo } from 'react'
import { useController } from 'react-hook-form'

import { PropsInput } from '@/types/Forms'
import { addCommas, toEnglishNumber, toPersianNumber } from '@/utils/addCommas'

const RenderNumber = ({ input }: PropsInput) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: input.name,
    control: input.control,
    rules: input.rules ?? {},
    defaultValue: input.defaultValue || '',
  })

  const handleOnChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = toEnglishNumber(e.target.value.replace(/,/g, '')) // Convert Persian to English and remove commas
    if (isNaN(Number(rawValue))) return // Ignore invalid number input
    field.onChange(rawValue) // Update the form's raw value with English numbers
  }

  // Format number for display (Persian digits + commas)
  const formatDisplayValue = (value: string) => {
    value = value.toString() || '' // Convert to string or default to an empty string

    const englishValue = value.replace(/,/g, '') // Remove commas
    const shouldAddCommas = input?.addCommas ?? false // Default to false if undefined
    const formattedValue = shouldAddCommas
      ? addCommas(englishValue)
      : englishValue // Conditionally add commas
    return toPersianNumber(formattedValue) // Convert to Persian
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
        value={formatDisplayValue(field.value)} // Show Persian numbers with commas
        type='text'
        placeholder={input.placeholder}
        onChange={handleOnChanged}
        className={`h-9 w-full rounded-lg border bg-neutral-50 py-2.5 pl-3 pr-3 text-right text-xs ${
          error ? 'border-red-500 focus:ring-error-500' : ''
        } transition focus:outline-none focus:ring-1 focus:ring-primary-500 active:outline-none ${
          input.readOnly ? 'cursor-not-allowed bg-gray-200' : ''
        }${input.className} no-arrows`}
      />
    </div>
  )
}

export default memo(RenderNumber)
