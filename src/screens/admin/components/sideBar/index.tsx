import { FC, useRef, useState } from 'react'
import useOutSideClick from '@/hooks/useOutSideClick'
import { cn } from '@/utils'

interface sideBar {
  children?: React.ReactNode
  className?: string
}

const SideBar: FC<sideBar> = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef(null)
  useOutSideClick(sidebarRef, () => setIsOpen(false))

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        className='fixed right-1 top-1 z-50 rounded-sm p-2 text-white md:hidden'
        onClick={toggleSidebar}
      >
        <div
          ref={sidebarRef}
          className={`space-y-1 rounded-md p-1 ${isOpen ? 'bg-primary-600' : 'bg-white'}`}
        >
          <span
            className={`block h-0.5 w-6 ${isOpen ? 'bg-neutral-300' : 'bg-primary-600'}`}
          ></span>
          <span
            className={`block h-0.5 w-6 ${isOpen ? 'bg-neutral-300' : 'bg-primary-600'}`}
          ></span>
          <span
            className={`block h-0.5 w-6 ${isOpen ? 'bg-neutral-300' : 'bg-primary-600'}`}
          ></span>
        </div>
      </button>

      <div
        className={cn(
          `fixed right-0 top-0 z-10 flex h-screen w-1/2 flex-col bg-white px-3 py-14 transition-transform duration-300 md:w-1/5 md:translate-x-0 md:py-5 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`,
          className
        )}
      >
        {children}
      </div>
    </>
  )
}

export default SideBar
