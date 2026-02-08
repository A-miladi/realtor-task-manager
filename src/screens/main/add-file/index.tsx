/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import Plus from '@/components/icons/Plus'
import MapWithSearch from '@/components/Map'
import Button from '@/components/ui/Button'
import LoadingScreen from '@/components/ui/LoadingScreen'
import TextArea from '@/components/ui/TextArea'
import { MyToast } from '@/components/ui/Toast/MyToast'
import { QueryKeys } from '@/constants/keys'
import { PageUrls } from '@/constants/pageUrls'
import { useAddFile } from '@/hooks/mutations/useAddFile'
import { useAddFileImageMutation } from '@/hooks/mutations/useAddFileImage'
import { useAddFileVideoMutation } from '@/hooks/mutations/useAddFileVideo'
import { ResponseType } from '@/types'
import {
  AddFileRequest,
  AddFileResponse,
  FileUploaderRequest,
  MediaItem,
} from '@/types/Files'

import BasicInfoFields from './BasicInfoFields'
import FacilitiesFields from './FacilitiesFields'
import LocationFields from './LocationFields'
import MainInfoFields from './MainInfoFields'
import MediaFields from './MediaFields'
import OptionFields from './OptionFields'

function AddFile() {
  const [images, setImages] = useState<MediaItem[]>([])
  const [videos, setVideos] = useState<MediaItem[]>([])

  const [description, setDescription] = useState('')

  const [location, setLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)

  const {
    formState: { errors },
    control,
    handleSubmit,
    watch,
    reset,
  } = useForm({})

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const useAddFileMutation: UseMutationResult<
    ResponseType<AddFileResponse>,
    Error,
    AddFileRequest
  > = useAddFile()

  const useAddImageMutation: UseMutationResult<
    ResponseType<object>,
    Error,
    FileUploaderRequest
  > = useAddFileImageMutation()

  const useAddVideoMutation: UseMutationResult<
    ResponseType<object>,
    Error,
    FileUploaderRequest
  > = useAddFileVideoMutation()

  const selectedDealType = watch('dealType')
  const isLeaseDealType = selectedDealType === 'رهن و اجاره'

  const onSubmit = (data: any) => {
    const newData: AddFileRequest = {
      ...data,
      alley: data.alley,
      lat: location?.lat,
      lng: location?.lng,
      zip_code: data.zip_code,
      street: data.street,
      region: data.region,
      adviserName: data.adviserName,
      dealType: selectedDealType,
      usage: data.usage,
      propertyType: data.propertyType,
      area: data.area,
      price: isLeaseDealType ? '' : data.price || '',
      lifespan: Number(data.lifespan),
      floorcount: Number(data.floorcount),
      countOfFloor: Number(data.countOfFloor),
      unit: Number(data.unit),
      countOfUnit: Number(data.countOfUnit),
      Cabinet: data.Cabinet || 'ندارد',
      floor: data.floor || 'ندارد',
      cooler: data.cooler || '',
      Heater: data.Heater || '',
      fireplace: data.fireplace,
      burglaralarm: data.burglaralarm,
      elevator: data.elevator,
      pool: data.pool,
      terrace: data.terrace,
      separatedoor: data.separatedoor,
      parking: data.parking,
      warehouse: data.warehouse,
      toilet: data.toilet,
      centralantenna: data.centralantenna,
      mortgagePrice: !isLeaseDealType ? '' : data.mortgagePrice || '',
      rentPrice: !isLeaseDealType ? '' : data.rentPrice || '',
      isChange: data.isChange || false,
      description: description || '',
    }
    useAddFileMutation.mutate(newData, {
      onSuccess: (res) => {
        const fileId = res.data.id

        const imageUploadPromises = images.map((image) =>
          useAddImageMutation.mutateAsync({ id: fileId, file: image })
        )

        const videoUploadPromises = videos.map((video) =>
          useAddVideoMutation.mutateAsync({ id: fileId, file: video })
        )

        Promise.all([...imageUploadPromises, ...videoUploadPromises])
          .then(() => {
            reset()
            MyToast('success', 'ایجاد فایل موفقیت آمیز بود')
            queryClient.invalidateQueries([QueryKeys.Files.files])
            navigate(`${PageUrls.main.files}/${fileId}`)
          })
          .catch((error) => {
            MyToast('error', 'خطا در آپلود ویدیو یا عکس')
            return error
          })
      },
      onError: (error) => {
        MyToast('error', 'خطا در ایجاد ویدیو یا عکس')
        return error
      },
    })
  }

  if (
    useAddImageMutation.isLoading ||
    useAddVideoMutation.isLoading ||
    useAddFileMutation.isLoading
  ) {
    return <LoadingScreen />
  }

  return (
    <div
      dir='rtl'
      className='flex h-full w-full flex-1 flex-col gap-5 bg-white bg-opacity-30 px-5 pb-36 pt-20 text-primary-600 backdrop-blur-2xl'
    >
      {/* <h1 className='text-right text-2xl font-semibold'>ایجاد فایل جدید</h1> */}

      <form
        className='flex h-full w-full flex-1 flex-col justify-between gap-5'
        onSubmit={handleSubmit(onSubmit)}
        action=''
      >
        <BasicInfoFields watch={watch} errors={errors} control={control} />

        <MainInfoFields control={control} errors={errors} />

        <div className='z-0 flex flex-col gap-5 border-b pb-5'>
          <LocationFields errors={errors} control={control} />
          <MapWithSearch location={location} setLocation={setLocation} />
        </div>

        <MediaFields
          images={images}
          setImages={setImages}
          videos={videos}
          setVideos={setVideos}
        />

        <OptionFields errors={errors} control={control} />

        <FacilitiesFields errors={errors} control={control} />

        <TextArea
          className='max-h-24 min-h-fit w-full bg-neutral-50'
          label='توضیحات'
          labelClassName='font-semibold'
          placeholder='متن خود را وارد کنید ...'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Submit button */}
        <div className='flex w-full items-center justify-center'>
          <Button
            variant='contained'
            color='primary'
            className='mt-5 flex w-full items-center justify-center gap-1 text-base font-normal md:w-2/6'
            type='submit'
            loading={
              useAddImageMutation.isLoading ||
              useAddVideoMutation.isLoading ||
              useAddFileMutation.isLoading
            }
          >
            <p>ایجاد فایل </p>
            <Plus />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddFile
