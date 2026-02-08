import React from 'react'

import ArrowLeft from '@/components/icons/Arrow-left'
import ArrowRight from '@/components/icons/Arrow-right'
import { cn } from '@/utils'

import Button from '../Button'

interface PaginationProps {
  currentPage: number
  totalPages?: number
  className?: string
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const getPageNumbers = () => {
    const delta = 1
    const range = []

    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min((totalPages ? totalPages : 0) - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      range.unshift('...')
    }
    if (currentPage + delta < (totalPages ? totalPages : 0) - 2) {
      range.push('...')
    }

    return [...range, totalPages]
  }

  return (
    <div
      className={cn(
        'm-auto mb-5 flex h-12 w-1/3 items-center justify-center gap-2 p-2',
        className
      )}
    >
      {currentPage === 1 ? null : (
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          className='flex h-6 w-6 items-center justify-center border border-neutral-600 bg-transparent p-0'
        >
          <ArrowRight color='var(--neutral-600)' size={18} />
        </Button>
      )}

      {getPageNumbers().map((page, index) =>
        typeof page === 'string' ? (
          <span
            key={index}
            className='flex h-6 w-6 items-center justify-center text-xs font-medium text-gray-700'
          >
            {page}
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page ? page : 0)}
            className={`flex h-6 w-6 items-center justify-center text-xs font-medium ${
              currentPage === page
                ? 'bg-primary-500 text-white'
                : 'bg-white text-primary-600 hover:bg-neutral-50'
            } rounded border border-neutral-400`}
          >
            {page}
          </button>
        )
      )}
      {currentPage === totalPages ? null : (
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          className='flex h-6 w-6 items-center justify-center border border-neutral-600 bg-transparent p-0'
        >
          <ArrowLeft color='var(--neutral-900)' size={18} />
        </Button>
      )}
    </div>
  )
}

export default Pagination
