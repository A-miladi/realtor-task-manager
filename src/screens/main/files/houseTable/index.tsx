import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { PageUrls } from '@/constants/pageUrls'
import { FileData } from '@/types/Files'
import { cn } from '@/utils'
import { addCommas } from '@/utils/addCommas'
import toPersianDigits from '@/utils/toPersianDigits'

interface DataTableProps {
  item: FileData
  dealType?: string
}

const DataTable: FC<DataTableProps> = ({ item, dealType }) => {
  const navigate = useNavigate()

  return (
    <tr
      onClick={() => navigate(`${PageUrls.main.files}/${item.id}`)}
      className='hide-scrollbar flex h-full w-full cursor-pointer overflow-x-auto py-0.5'
    >
      <td className='flex h-full w-1/4 items-center justify-center truncate text-center text-2xs md:text-xs'>
        <p className='truncate'>{item.adviserName}</p>
      </td>
      <td className='flex h-full w-1/4 items-center justify-center gap-0.5 truncate border-r border-neutral-200 px-1 text-center text-2xs md:text-xs'>
        <p className='text-primary-600'>{item.PropertyOwnerFirstName}</p>
        <p className='truncate'>{item.PropertyOwnerLastName}</p>
      </td>
      <td className='flex h-full w-1/4 items-center justify-center truncate border-r border-neutral-200 text-center text-2xs md:text-xs'>
        <p>{item.PropertyOwnerPhone}</p>
      </td>
      <td className='flex h-full w-1/4 items-center justify-center truncate border-x border-neutral-200 text-center text-2xs md:text-xs'>
        <p>{item.dealType}</p>
      </td>
      <td className='flex h-full w-1/4 items-center justify-center truncate border-l border-neutral-200 text-center text-2xs md:text-xs'>
        <p>{item.propertyType}</p>
      </td>
      <td className='flex h-full w-1/4 items-center justify-center truncate border-l border-neutral-200 text-center text-2xs md:text-xs'>
        <p>{item.usage}</p>
      </td>
      <td className='flex h-full w-1/4 items-center justify-center truncate border-l border-neutral-200 text-center text-2xs md:text-xs'>
        <p>{toPersianDigits(item.area)}متر</p>
      </td>
      <td className='flex h-full w-1/4 items-center justify-center truncate border-l border-neutral-200 text-center text-2xs md:text-xs'>
        <p>{toPersianDigits(item.region)}</p>
      </td>
      <td className='flex h-full w-1/4 items-center justify-center truncate border-l border-neutral-200 text-center text-2xs md:text-xs'>
        <p>{item.street}</p>
      </td>
      <td className='flex h-full w-1/4 items-center justify-center truncate border-l border-neutral-200 text-center text-2xs md:text-xs'>
        <p>{item.alley}</p>
      </td>
      <td
        className={cn(
          'flex h-full w-1/4 items-center justify-center truncate border-l border-neutral-200 text-center text-2xs md:text-xs',
          {
            hidden: dealType === 'رهن و اجاره',
          }
        )}
      >
        <p>{toPersianDigits(addCommas(String(item.price)))}</p>
      </td>
      <td
        className={cn(
          'flex h-full w-1/4 items-center justify-center truncate border-l border-neutral-200 text-center text-2xs md:text-xs',
          {
            hidden:
              dealType !== 'رهن و اجاره' &&
              dealType !== undefined &&
              dealType !== '',
          }
        )}
      >
        {toPersianDigits(addCommas(String(item.mortgagePrice)))}
      </td>
      <td
        className={cn(
          'flex h-full w-1/4 items-center justify-center truncate border-l border-neutral-200 text-center text-2xs md:text-xs',
          {
            hidden:
              dealType !== 'رهن و اجاره' &&
              dealType !== undefined &&
              dealType !== '',
          }
        )}
      >
        {toPersianDigits(addCommas(String(item.rentPrice)))}
      </td>
    </tr>
  )
}

export default DataTable
