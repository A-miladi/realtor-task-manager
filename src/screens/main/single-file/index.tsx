import {
  UseMutationResult,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'

import ArrowLeft from '@/components/icons/Arrow-left'
import Edit from '@/components/icons/Edit'
import Location from '@/components/icons/Location'
import Trash from '@/components/icons/Trash'
import User from '@/components/icons/User'
import MapWithSearch from '@/components/Map'
import Button from '@/components/ui/Button'
import LoadingScreen from '@/components/ui/LoadingScreen'
import Slider from '@/components/ui/Slider'
import { MyToast } from '@/components/ui/Toast/MyToast'
import { propertyDetailsMapping } from '@/constants'
import { QueryKeys } from '@/constants/keys'
import { PageUrls } from '@/constants/pageUrls'
import { ROLE } from '@/constants/role'
import { useDeleteFile } from '@/hooks/mutations/useDeleteFile'
import { useGetFileDetail } from '@/hooks/queries/useGetFileDetail'
import { UseUserStore } from '@/store/user'
import { ResponseType } from '@/types'
import { FileData, PropertyDetailKeys } from '@/types/Files'
import { addCommas } from '@/utils/addCommas'
import toPersianDigits from '@/utils/toPersianDigits'

function SingleFile() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  )
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    data: fileDetail,
    isLoading,
    isFetching,
  }: UseQueryResult<ResponseType<FileData>, Error> = useGetFileDetail(id)

  useEffect(() => {
    if (fileDetail?.data) {
      setLocation({ lat: fileDetail.data.lat, lng: fileDetail.data.lng })
    }
  }, [fileDetail])

  const deleteFileMutation: UseMutationResult<
    ResponseType<object>,
    Error
  > = useDeleteFile()
  const [user] = UseUserStore(useShallow((state) => [state.user]))

  if (isLoading || isFetching) {
    return <LoadingScreen />
  }

  const handleDeleteFile = () => {
    deleteFileMutation.mutate(id, {
      onSuccess: (res) => {
        MyToast('success', res.message)
        queryClient.invalidateQueries([QueryKeys.Files.files])
        navigate(PageUrls.main.files)
      },
    })
  }

  return (
    <section className='flex h-screen w-full items-center justify-center gap-2 pb-28 backdrop-blur-2xl'>
      <div className='flex h-full w-full flex-wrap gap-8 overflow-y-auto px-7 pt-10 max-md:items-start max-md:justify-start max-md:pt-8'>
        <div className='flex w-full items-start justify-between gap-4 border-b border-primary-600 py-5 max-md:flex-col-reverse md:h-[80%]'>
          <div className='flex h-1/2 w-full items-center justify-center max-md:mt-2 md:h-full md:w-[50%]'>
            <Slider
              images={fileDetail?.data.galleryImage ?? []}
              videos={fileDetail?.data.galleryVideo ?? []}
            />
          </div>
          <div className='mt-10 flex h-2/3 w-full flex-col items-end justify-start gap-6 md:w-[50%]'>
            <div className='flex w-full items-center justify-between' dir='rtl'>
              <h1 className='text-2xl font-semibold text-neutral-50'>
                {fileDetail?.data.usage},{fileDetail?.data.propertyType},
                {fileDetail?.data.dealType}
              </h1>
              <Button
                onClick={() => navigate(PageUrls.main.files)}
                className='flex gap-0.5 border bg-primary-600 px-1.5 py-1'
              >
                <p className='text-xs text-neutral-50 max-md:text-2xs'>
                  بازگشت به فایل‌ ها
                </p>
                <ArrowLeft color='var(--neutral-50)' size={16} />
              </Button>
            </div>

            <div className='flex h-20 w-full flex-col items-center justify-center gap-4'>
              <span className='flex h-1/2 w-full items-center gap-2' dir='rtl'>
                <Location color='var(--neutral-50)' />
                <div dir='rtl' className='flex flex-wrap gap-1 text-neutral-50'>
                  {fileDetail?.data.region && (
                    <h1 className='text-nowrap text-right text-sm font-semibold'>
                      منطقه {toPersianDigits(fileDetail?.data.region)}
                    </h1>
                  )}
                  {fileDetail?.data.street && (
                    <h1 className='text-nowrap text-right text-sm font-semibold'>
                      خیابان {fileDetail?.data.street}
                    </h1>
                  )}
                  {fileDetail?.data.alley && (
                    <h1 className='text-nowrap text-right text-sm font-semibold'>
                      کوچه {fileDetail?.data.alley}
                    </h1>
                  )}
                  {fileDetail?.data.zip_code && (
                    <h1 className='text-nowrap text-right text-sm font-semibold'>
                      کدپستی {toPersianDigits(fileDetail?.data.zip_code)}
                    </h1>
                  )}
                </div>
              </span>
              <span className='flex h-1/2 w-full items-center gap-2' dir='rtl'>
                <User color='var(--neutral-50)' />
                <p className='text-lg font-medium text-neutral-50'>
                  {fileDetail?.data.adviserName}
                </p>
              </span>
            </div>
            <div
              className='flex w-full flex-col gap-1 text-neutral-50'
              dir='rtl'
            >
              <div className='flex w-full items-center justify-between rounded-lg border-b border-primary-600 bg-black bg-opacity-50 p-2 shadow-lg'>
                <p className='text-sm'>متراژ</p>
                <p className='text-sm'>
                  {toPersianDigits(fileDetail?.data.area)} متر
                </p>
              </div>
              <div className='flex w-full items-center justify-between rounded-lg border-b border-primary-600 bg-black bg-opacity-50 p-2 shadow-lg'>
                <p className='text-sm'>قدمت</p>
                <p className='text-sm'>
                  {toPersianDigits(fileDetail?.data.lifespan)} سال
                </p>
              </div>
              <div className='flex w-full items-center justify-between rounded-lg border-b border-primary-600 bg-black bg-opacity-50 p-2 shadow-lg'>
                <p className='text-sm'>طبقه</p>
                <p className='text-sm'>
                  {toPersianDigits(fileDetail?.data.floorcount)}
                </p>
              </div>
              {fileDetail?.data.price !== '0' && (
                <div className='flex w-full items-center justify-between rounded-lg border-b border-primary-600 bg-black bg-opacity-50 p-2 shadow-lg'>
                  <p className='text-sm'>قیمت</p>
                  <p className='text-sm'>
                    {toPersianDigits(
                      addCommas(
                        fileDetail?.data.price ? fileDetail.data.price : '0'
                      )
                    )}{' '}
                    تومان
                  </p>
                </div>
              )}
              {fileDetail?.data.mortgagePrice !== '0' && (
                <div className='flex w-full items-center justify-between rounded-lg border-b border-primary-600 bg-black bg-opacity-50 p-2 shadow-lg'>
                  <p className='text-sm'>رهن</p>
                  <p className='text-sm'>
                    {toPersianDigits(
                      addCommas(
                        fileDetail?.data.mortgagePrice
                          ? fileDetail.data.mortgagePrice
                          : '0'
                      )
                    )}{' '}
                    تومان
                  </p>
                </div>
              )}
              {fileDetail?.data.rentPrice !== '0' && (
                <div className='flex w-full items-center justify-between rounded-lg border-b border-primary-600 bg-black bg-opacity-50 p-2 shadow-lg'>
                  <p className='text-sm'>اجاره</p>
                  <p className='text-sm'>
                    {toPersianDigits(
                      addCommas(
                        fileDetail?.data.rentPrice
                          ? fileDetail.data.rentPrice
                          : '0'
                      )
                    )}{' '}
                    تومان
                  </p>
                </div>
              )}
            </div>

            <div dir='rtl' className='flex w-full gap-1'>
              <Button
                type='button'
                onClick={() => navigate(`${PageUrls.main.editFile}/${id}`)}
                className='flex w-1/2 items-center justify-center gap-1 border border-neutral-50 bg-primary-600 text-neutral-50'
              >
                <Edit color='var(--neutral-50)' />
                <p>ویرایش فایل</p>
              </Button>
              {user?.role === ROLE.admin && (
                <Button
                  loading={deleteFileMutation.isLoading}
                  onClick={handleDeleteFile}
                  className='flex w-1/2 items-center justify-center gap-1 border border-neutral-50 bg-primary-600 text-neutral-50'
                >
                  <Trash />
                  <p>حذف فایل</p>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className='flex h-[70%] w-full items-start justify-between max-md:flex-col'>
          <div className='flex h-[85%] w-full flex-col items-center justify-start gap-3 md:w-2/3'>
            <div dir='rtl' className='flex flex-wrap gap-1 text-neutral-50'>
              {fileDetail?.data.region && (
                <h1 className='text-nowrap text-right text-sm font-semibold'>
                  منطقه {toPersianDigits(fileDetail?.data.region)}
                </h1>
              )}
              {fileDetail?.data.street && (
                <h1 className='text-nowrap text-right text-sm font-semibold'>
                  خیابان {fileDetail?.data.street}
                </h1>
              )}
              {fileDetail?.data.alley && (
                <h1 className='text-nowrap text-right text-sm font-semibold'>
                  کوچه {fileDetail?.data.alley}
                </h1>
              )}
              {/* {fileDetail?.data.zip_code && (
                <h1 className='text-nowrap text-right text-sm font-semibold'>
                  کدپستی {fileDetail?.data.zip_code}
                </h1>
              )} */}
            </div>
            <div className='z-0 mb-2 w-full overflow-hidden rounded-sm border-neutral-400 p-0.5 max-md:shadow-xl md:border'>
              <MapWithSearch location={location} setLocation={setLocation} />
            </div>
          </div>
          <div
            className='mt-2 flex h-full w-full flex-col items-center gap-4 md:w-2/3 md:items-start md:justify-start md:gap-3'
            dir='rtl'
          >
            <h1 className='text-neutral-50 md:pr-1'>سایر ویژگی ها و امکانات</h1>
            <div className='flex w-full gap-1 max-md:flex-col md:h-1/6 md:pl-7'>
              <div className='flex h-full w-full break-words' dir='rtl'>
                <p className='w-full overflow-y-auto break-words rounded-lg border border-neutral-600 bg-black bg-opacity-50 px-2 py-1 text-2xs text-neutral-50 max-md:h-16 md:text-sm'>
                  {fileDetail?.data.description}
                </p>
              </div>
              <div
                className='flex h-full w-full flex-col items-center justify-around rounded-lg border border-neutral-600 bg-black bg-opacity-50 px-2 text-2xs max-md:gap-2 max-md:py-2 md:text-sm'
                dir='rtl'
              >
                <div className='flex h-full w-full items-center justify-start gap-1 pb-1 text-neutral-50'>
                  <p>نام و نام خانوادگی مالک : </p>
                  <p>{fileDetail?.data.PropertyOwnerFirstName}</p>
                  <p>{fileDetail?.data.PropertyOwnerLastName}</p>
                </div>
                <div className='flex h-full w-full items-center justify-start gap-1 pb-1 text-neutral-50'>
                  <p>شماره تماس :</p>
                  <p>{toPersianDigits(fileDetail?.data.PropertyOwnerPhone)}</p>
                </div>
              </div>
            </div>

            <div className='flex h-1/2 w-full flex-wrap gap-1 max-md:items-center max-md:justify-start md:w-full'>
              {Object.entries(propertyDetailsMapping).map(([key, label]) => (
                <div
                  key={key}
                  className='flex h-14 w-[48%] flex-col items-center justify-center gap-1 rounded-lg bg-neutral-50 p-2 md:w-28'
                >
                  <p className='text-nowrap text-2xs text-primary-600'>
                    {label}
                  </p>
                  <p className='text-nowrap text-sm'>
                    {typeof fileDetail?.data[key as PropertyDetailKeys] ===
                    'boolean'
                      ? fileDetail?.data[key as PropertyDetailKeys]
                        ? 'دارد'
                        : 'ندارد'
                      : toPersianDigits(
                          fileDetail?.data[key as PropertyDetailKeys]
                            ? fileDetail?.data[key as PropertyDetailKeys]
                            : 'ندارد'
                        )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleFile
