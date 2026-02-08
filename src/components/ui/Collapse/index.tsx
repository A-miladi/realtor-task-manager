import React, { useRef, useState } from 'react'

import ArrowUp from '@/components/icons/ArrowUp'
import { cn } from '@/utils'

const Collapse = ({
  className,
  placeholder,
  children,
}: {
  options?: string[]
  className?: string
  placeholder?: string
  children?: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  // const handleOptionClick = (option: string) => {
  //   setSelectedOption(option)
  //   setIsOpen(true)
  // }

  return (
    <div
      className='relative flex w-full flex-col border-b-[1px]'
      ref={dropdownRef}
    >
      <div
        className={cn(
          'placeholder flex cursor-pointer items-center justify-between border-neutral-200',
          className
        )}
        onClick={toggleDropdown}
      >
        <input
          type='text'
          readOnly
          value={selectedOption}
          placeholder={placeholder}
          className={cn(
            'w-full cursor-pointer bg-transparent text-right outline-none'
          )}
        />
        <ArrowUp
          color='var(--primary-600)'
          className={`ml-2 transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`}
        />
      </div>

      {isOpen && (
        <div className='mt-1 w-full rounded-md'>
          <div className='flex cursor-pointer flex-col gap-2'>{children}</div>
        </div>
      )}
    </div>
  )
}

export default Collapse
