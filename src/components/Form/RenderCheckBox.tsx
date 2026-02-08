import { useController } from 'react-hook-form'

import { PropsInput } from '@/types/Forms'

const RenderCheckBox = ({ input }: PropsInput) => {
  const { field } = useController({
    name: input.name,
    control: input.control,
    rules: input.rules ?? {},
    defaultValue: input.defaultValue,
  })

  return (
    <div className='flex items-center gap-2 space-x-2'>
      <label
        className={`${input.labelClassName && input.labelClassName} w-28 text-sm font-medium text-gray-700`}
      >
        {input.label}
      </label>
      <input
        type='checkbox'
        ref={field.ref}
        className='h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 disabled:opacity-50'
        checked={!!field.value}
        readOnly={input.readOnly}
        onChange={(e) => {
          field.onChange(e.target.checked ? true : false)
        }}
      />
    </div>
  )
}

export default RenderCheckBox
