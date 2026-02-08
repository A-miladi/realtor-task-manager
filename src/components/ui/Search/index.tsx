import React, { useCallback } from 'react'
import search from '@/assets/icons/search.svg'
import { cn } from '@/utils'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'

type SearchInputProps = {
  inputClassName?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

export function SearchInput({
  inputClassName,
  onChange,
  value,
}: SearchInputProps) {
  const navigate = useNavigate()

  const handleSearchSubmit = useCallback(() => {
    if (value) {
      navigate(`/products/${encodeURIComponent(value)}`)
    }
  }, [value, navigate])

  return (
    <div className='flex flex-col'>
      <div className='relative flex w-full min-w-[300px] items-center justify-start'>
        <img
          className='absolute right-2 top-1/2 -translate-y-1/2'
          src={search}
          alt='search icon | nazargoo'
          width={24}
          height={24}
        />
        <input
          dir='rtl'
          value={value}
          onChange={onChange}
          className={cn(
            'border-primary placeholder:text-primary focus:border-secondary w-full rounded-xl border-sm px-2 py-4 pr-9 text-xs placeholder:font-medium focus:outline-none focus:ring-0 md:h-[61px] md:w-full',
            inputClassName
          )}
          placeholder={'دنبال نظر چه محصولی هستی؟'}
        />
        <Button
          onClick={handleSearchSubmit}
          className='absolute left-2.5 top-1/2 h-[37px] w-[81px] -translate-y-1/2 px-3 text-xs font-normal md:left-2 md:h-max md:w-max md:px-3.5'
          variant='contained'
          color='secondary'
        >
          <p className='w-[57px]'>جست و جو</p>
        </Button>
      </div>
    </div>
  )
}
