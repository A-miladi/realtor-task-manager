import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { MEDIA_URL } from '@/api'
import SampleImage from '@/assets/images/sampleImage.png'
import { PageUrls } from '@/constants/pageUrls'
import { FileData } from '@/types/Files'
import toPersianDigits from '@/utils/toPersianDigits'
interface CardProps {
  item: FileData
}

const Cards: FC<CardProps> = ({ item }) => {
  const navigate = useNavigate()

  return (
    <div
      dir='rtl'
      onClick={() => navigate(`${PageUrls.main.files}/${item.id}`)}
      className='flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-primary-500 md:h-[300px] md:w-[32%]'
    >
      <div className='flex h-full w-full flex-col gap-3 bg-white bg-opacity-50'>
        <img
          src={
            item.galleryImage.length > 0
              ? `${MEDIA_URL}${item.galleryImage[0]}`
              : SampleImage
          }
          alt=''
          className='h-1/2 w-full rounded-t-lg object-cover'
        />
        <div className='mb-2 flex w-full flex-col gap-y-1 px-2 md:gap-y-1.5'>
          <div className='flex gap-1'>
            {item.region && (
              <h1 className='text-nowrap text-right text-sm font-semibold'>
                منطقه {toPersianDigits(item.region)}
              </h1>
            )}
            {item.street && (
              <h1 className='truncate text-nowrap text-right text-sm font-semibold'>
                خیابان {item.street}
              </h1>
            )}
            {item.alley && (
              <h1 className='truncate text-nowrap text-right text-sm font-semibold'>
                کوچه {item.alley}
              </h1>
            )}
          </div>

          <p className='w-full text-sm font-normal text-neutral-700'>
            مشاور {item.adviserName}
          </p>
          <div className='flex items-center gap-0.5 text-sm font-normal text-neutral-600'>
            <p>{toPersianDigits(item.area)}</p>
            <p>متر</p>
          </div>

          <div className='flex flex-wrap gap-1'>
            {item.propertyType && (
              <h1 className='text-nowrap text-right text-sm text-neutral-700'>
                {item.propertyType}
              </h1>
            )}
            {item.usage && (
              <h1 className='text-nowrap text-right text-sm text-neutral-700'>
                {item.usage}
              </h1>
            )}
            {item.dealType && (
              <h1 className='text-nowrap text-right text-sm text-neutral-700'>
                ، {item.dealType}
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards
