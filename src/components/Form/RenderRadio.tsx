import { useController } from 'react-hook-form'

import { PropsInput } from '@/types/Forms'

const RenderRadio = ({ input }: PropsInput) => {
  const { field } = useController({
    name: input.name,
    control: input.control!,
    rules: input.rules ?? {},
    defaultValue: input?.defaultValue,
  })

  return (
    <div className='flex w-full flex-row'>
      {input?.options?.map((option) => {
        const isChecked =
          field.value === option.id || field.value === String(option.id)

        return (
          <label
            key={option.id}
            className='flex items-center gap-1 text-nowrap text-sm'
          >
            <input
              type='radio'
              name={field.name}
              ref={field.ref}
              value={option.id}
              checked={isChecked}
              onChange={() =>
                field.onChange(
                  typeof option.id === 'boolean' ? option.id : String(option.id)
                )
              }
              onBlur={field.onBlur}
              className='disabled:border-gray checked:disabled:border-gray disabled:hover:border-gray border-primary checked:hover:border-secondary h-4 w-4 appearance-none rounded-full border-[2px] transition-colors checked:border-[4px] checked:border-primary-500 hover:border-black disabled:border-[10px] checked:disabled:border-[5px]'
            />
            <span className='ml-2 text-xs'>{option.title}</span>
          </label>
        )
      })}
    </div>
  )
}

export default RenderRadio
