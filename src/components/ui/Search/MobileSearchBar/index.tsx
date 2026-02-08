import React, { useState } from 'react'
import RightArrow from '@/assets/icons/arrow-right.svg'
import { SearchInput } from '..'
import { Link } from 'react-router-dom'

const MobileSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className='mt-3.5 flex items-center justify-center'>
      <div className='flex gap-2 md:hidden'>
        <Link className='flex items-center' to={'/'}>
          <img src={RightArrow} width={24} height={24} alt='nazargoo | نظرگو' />
        </Link>
        <SearchInput
          value={searchTerm}
          onChange={onChange}
          inputClassName='h-[57px] w-[297px]'
        />
      </div>
    </div>
  )
}

export default MobileSearchBar
