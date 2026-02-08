import React, { useEffect, useState } from 'react'

import ArrowDown from '@/assets/icons/arrow-down.svg'
import { cn } from '@/utils'

type AccordionProps = {
  label: string
  children: React.ReactNode
}

const Accordion = ({ label, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    const isMobile = window.innerWidth <= 768

    setIsOpen(isMobile)
  }, [])

  return (
    <div className='cursor-pointer'>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='mb-[5px] flex items-center justify-between md:mb-2'
      >
        <p className='text-[14px] font-medium text-black'>{label}</p>
        <div>
          <img
            className={cn({
              'rotate-180 transition-all': isOpen,
              'rotate-0 transition-all': !isOpen,
            })}
            src={ArrowDown}
            width={16}
            height={16}
            alt='nazargoo'
          />
        </div>
      </div>
      {isOpen && (
        <div className='text-primary mb-2 cursor-pointer text-[12px] font-normal'>
          {children}
        </div>
      )}
    </div>
  )
}

export default Accordion
