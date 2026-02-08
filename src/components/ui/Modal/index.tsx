import React, { Dispatch, SetStateAction } from 'react'

import { cn } from '@/utils'

type ModalProps = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
  className?: string
  ModalBgClassName?: string
}

const Modal = ({
  showModal,
  children,
  className,
  ModalBgClassName,
}: ModalProps) => {
  return showModal ? (
    <div
      className={cn(
        'fixed inset-0 z-10 flex items-center justify-center bg-white bg-opacity-70',
        ModalBgClassName
      )}
    >
      <div className={cn('relative', className)}>{children}</div>
    </div>
  ) : null
}

export default Modal
