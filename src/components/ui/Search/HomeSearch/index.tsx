import React, { useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'

import RelatedSearch from '../../RelatedSearch'
import { SearchInput } from '..'

const HomeSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const debouncedValue = useDebounce(searchTerm, 500)

  return (
    <div>
      <SearchInput value={searchTerm} onChange={onChange} />
      {debouncedValue ? (
        <div className='mt-1.5'>
          <RelatedSearch
            relatedSearchClassName='w-full  border p-[10px] border-primary border-spacing-1.5 rounded-xl'
            queryValue={debouncedValue}
          />
        </div>
      ) : (
        <p className='mt-8 text-base text-black'>
          تجربه را بخون و بعد مقایسه کن...
        </p>
      )}
    </div>
  )
}

export default HomeSearch
