import React, { useRef, useState } from 'react'
import { useController } from 'react-hook-form'

import ArrowUp from '@/components/icons/ArrowUp'
import { PropsInput } from '@/types/Forms'
import { cn } from '@/utils'

const Dropdown = ({ input }: PropsInput) => {
  const [isOpen, setIsOpen] = useState(false)
  // const [selectedOption, setSelectedOption] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = () => {
    // setSelectedOption(option)
    setIsOpen(false)
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
      className='relative -mt-3 mb-2 flex w-full cursor-pointer flex-col'
      ref={dropdownRef}
    >
      <div
        className={cn(
          'flex h-9 cursor-pointer items-center justify-between rounded-md border-neutral-300 bg-neutral-50 p-2',
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
          value={field.value === 0 ? '0' : field.value}
          placeholder='انتخاب کنید'
          className='w-full cursor-pointer bg-transparent outline-none focus:hidden focus:border-none focus:shadow-none'
          disabled={input.readOnly}
        />
        <ArrowUp
          color='var(--primary-600)'
          className={`ml-2 transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`}
        />
      </div>

      <div
        className={cn(
          `absolute top-10 z-10 mt-1 flex w-full transform flex-wrap gap-1 overflow-y-auto rounded-lg border bg-neutral-50 py-3 shadow-lg shadow-[rgba(1,1,1,.1)] transition-all duration-300 ease-in-out ${
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
            className='animate-fadeIn flex w-full cursor-pointer items-center rounded-lg px-4 py-2 text-primary-600'
            onClick={() => handleOptionClick()}
          >
            {option.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
