import React, { useRef, useState } from 'react'
import { useController } from 'react-hook-form'

import { PropsInput } from '@/types/Forms'
import { cn } from '@/utils'

import ArrowUp from '../icons/ArrowUp'

const RenderSelect: React.FC<PropsInput> = ({ input }) => {
  const [isOpen, setIsOpen] = useState(false)

  // const [selectedOption, setSelectedOption] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOptionClick = (option: any) => {
    // setSelectedOption(option)
    setIsOpen(false)

    field.onChange(option.id)
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const {
    field,
    fieldState: { error },
  } = useController({
    name: input.name,
    control: input.control,
    rules: input.rules ?? {},
    defaultValue: input.defaultValue ?? '',
  })

  return (
    <div
      className='relative flex w-full cursor-pointer flex-col'
      ref={dropdownRef}
    >
      <div
        className={cn(
          'flex h-9 cursor-pointer items-center justify-between rounded-md border-neutral-300 border-red-500 bg-neutral-50 p-2',
          {
            'border-error-500': error,
          }
        )}
        dir='rtl'
        onClick={toggleDropdown}
      >
        <input
          ref={field.ref}
          onChange={field.onChange}
          type='text'
          readOnly
          value={
            input.options?.find((option) => option.id === field.value)?.title ||
            'انتخاب کنید'
          }
          placeholder='انتخاب کنید'
          className='w-full cursor-pointer border-red-500 bg-transparent text-xs outline-none focus:hidden focus:border-none focus:shadow-none'
          disabled={input.readOnly}
        />
        <ArrowUp
          size={12}
          color='var(--primary-600)'
          className={`transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`}
        />
      </div>

      <div
        className={cn(
          `absolute top-9 z-10 mt-1 flex max-h-60 w-full transform flex-wrap gap-1 overflow-y-auto rounded-lg border bg-neutral-50 py-3 shadow-lg shadow-[rgba(1,1,1,.1)] transition-all duration-300 ease-in-out ${
            isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
          } origin-top`
        )}
      >
        {(!input.options || input.options.length === 0) && (
          <option value='' disabled>
            موردی موجود نیست
          </option>
        )}

        {input.options?.map((option, index) => (
          <div
            key={index}
            className='animate-fadeIn flex w-full cursor-pointer items-center rounded-lg px-4 py-2 text-sm text-primary-600'
            onClick={() => handleOptionClick(option)}
          >
            {option.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RenderSelect
