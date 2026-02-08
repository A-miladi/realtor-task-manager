/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UseMutationResult,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Router, useNavigate, useParams } from 'react-router-dom'

import Plus from '@/components/icons/Plus'
import MapWithSearch from '@/components/Map'
import Button from '@/components/ui/Button'
import LoadingScreen from '@/components/ui/LoadingScreen'
import TextArea from '@/components/ui/TextArea'
import { MyToast } from '@/components/ui/Toast/MyToast'
import { QueryKeys } from '@/constants/keys'
import { PageUrls } from '@/constants/pageUrls'
import { useAddFileImageMutation } from '@/hooks/mutations/useAddFileImage'
import { useAddFileVideoMutation } from '@/hooks/mutations/useAddFileVideo'
import {
  useDeleteFileImageMutation,
  useDeleteFileVideoMutation,
} from '@/hooks/mutations/useDeleteMedia'
import { useEditFile } from '@/hooks/mutations/useEditFile'
import { useGetFileDetail } from '@/hooks/queries/useGetFileDetail'
import { ResponseType } from '@/types'
import {
  AddFileResponse,
  DeleteFileImageRequest,
  DeleteFileVideoRequest,
  EditFileRequest,
  FileData,
  FileUploaderRequest,
  MediaItem,
} from '@/types/Files'

import BasicInfoFields from '../add-file/BasicInfoFields'
import FacilitiesFields from '../add-file/FacilitiesFields'
import LocationFields from '../add-file/LocationFields'
import MainInfoFields from '../add-file/MainInfoFields'
import MediaFields from '../add-file/MediaFields'
import OptionFields from '../add-file/OptionFields'
import ArrowLeft from '@/components/icons/Arrow-left'

function EditFile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(-1)
  }
  const {
    data: fileDetail,
    isLoading,
    isFetching,
  }: UseQueryResult<ResponseType<FileData>, Error> = useGetFileDetail(id)

  const [images, setImages] = useState<MediaItem[]>([])
  const [videos, setVideos] = useState<MediaItem[]>([])

  const [deletedImages, setDeletedImages] = useState<string[]>([])
  const [deletedVideos, setDeletedVideos] = useState<string[]>([])

  const [existingImages, setExistingImages] = useState<string[]>([])
  const [existingVideos, setExistingVideos] = useState<string[]>([])

  const [location, setLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)

  const [description, setDescription] = useState('')

  const {
    formState: { errors },
    control,
    handleSubmit,
    watch,
    reset,
  } = useForm()

  useEffect(() => {
    if (fileDetail?.data) {
      reset({
        adviserName: fileDetail.data.adviserName,
        dealType: fileDetail.data.dealType,
        usage: fileDetail.data.usage,
        propertyType: fileDetail.data.propertyType,
        warehouse: fileDetail.data.warehouse,
        parking: fileDetail.data.parking,
        separatedoor: fileDetail.data.separatedoor,
        terrace: fileDetail.data.terrace,
        toilet: fileDetail.data.toilet,
        burglaralarm: fileDetail.data.burglaralarm,
        centralantenna: fileDetail.data.centralantenna,
        pool: fileDetail.data.pool,
        elevator: fileDetail.data.elevator,
        Janitor: fileDetail.data.Janitor,
        Heater: fileDetail.data.Heater,
        cooler: fileDetail.data.cooler,
        isChange: fileDetail.data.isChange,
        floor: fileDetail.data.floor,
        Cabinet: fileDetail.data.Cabinet,
        price: fileDetail.data.price || '',
        area: fileDetail.data.area,
        region: fileDetail.data.region,
        street: fileDetail.data.street,
        alley: fileDetail.data.alley,
        zip_code: fileDetail.data.zip_code,
        lat: fileDetail.data.lat,
        lng: fileDetail.data.lng,
        lifespan: fileDetail.data.lifespan,
        floorcount: fileDetail.data.floorcount,
        unit: fileDetail.data.unit,
        countOfFloor: fileDetail.data.countOfFloor,
        countOfUnit: fileDetail.data.countOfUnit,
        mortgagePrice: fileDetail.data.mortgagePrice || '',
        rentPrice: fileDetail.data.rentPrice || '',
        PropertyOwnerFirstName: fileDetail.data.PropertyOwnerFirstName,
        PropertyOwnerLastName: fileDetail.data.PropertyOwnerLastName,
        PropertyOwnerPhone: fileDetail.data.PropertyOwnerPhone,
      })

      setDescription(fileDetail.data.description)

      setLocation({ lat: fileDetail.data.lat, lng: fileDetail.data.lng })
      setExistingImages(fileDetail.data.galleryImage || [])
      setExistingVideos(fileDetail.data.galleryVideo || [])
    }
  }, [fileDetail, reset])

  const queryClient = useQueryClient()

  const useEditFileMutation: UseMutationResult<
    ResponseType<AddFileResponse>,
    Error,
    EditFileRequest
  > = useEditFile()

  const useDeleteImageMutation: UseMutationResult<
    ResponseType<object>,
    Error,
    DeleteFileImageRequest
  > = useDeleteFileImageMutation()

  const useDeleteVideoMutation: UseMutationResult<
    ResponseType<object>,
    Error,
    DeleteFileVideoRequest
  > = useDeleteFileVideoMutation()

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
    if (deletedImages.length > 0) {
      useDeleteImageMutation.mutateAsync(
        {
          id: id,
          images: deletedImages,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([
              QueryKeys.Files.signleFileDetail,
              id,
            ])
          },
        }
      )
    }

    if (deletedVideos.length > 0) {
      useDeleteVideoMutation.mutateAsync(
        {
          id: id,
          videos: deletedVideos,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([QueryKeys.Files.files, id])
          },
        }
      )
    }

    const newData: EditFileRequest = {
      body: {
        ...data,
        alley: data.alley,
        lat: location?.lat,
        lng: location?.lng,
        zip_code: data.zip_code,
        street: data.street,
        region: data.region,
        adviserName: data.adviserName,
        dealType: data.dealType,
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
        cooler: data.cooler,
        Heater: data.Heater,
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
        PropertyOwnerFirstName: data.PropertyOwnerFirstName || '',
        PropertyOwnerLastName: data.PropertyOwnerLastName || '',
        PropertyOwnerPhone: data.PropertyOwnerPhone || '',
        description: description || '',
      },
      id: id,
    }

    // Mutation logic
    const deleteImagesPromise =
      deletedImages.length > 0
        ? useDeleteImageMutation.mutateAsync({ id, images: deletedImages })
        : Promise.resolve()

    const deleteVideosPromise =
      deletedVideos.length > 0
        ? useDeleteVideoMutation.mutateAsync({ id, videos: deletedVideos })
        : Promise.resolve()

    const editFilePromise = useEditFileMutation.mutateAsync(newData)

    Promise.all([deleteImagesPromise, deleteVideosPromise, editFilePromise])
      .then(([deleteImagesRes, deleteVideosRes, editFileRes]) => {
        // eslint-disable-next-line no-console
        console.log(deleteImagesRes, deleteVideosRes)

        const fileId = editFileRes.data.id

        const imageUploadPromises = images.map((image) =>
          useAddImageMutation.mutateAsync({ id: fileId, file: image })
        )

        const videoUploadPromises = videos.map((video) =>
          useAddVideoMutation.mutateAsync({ id: fileId, file: video })
        )

        return Promise.all([...imageUploadPromises, ...videoUploadPromises])
      })
      .then(() => {
        // Invalidate the queries AFTER all promises are resolved
        queryClient.invalidateQueries([QueryKeys.Files.signleFileDetail, id])
        queryClient.invalidateQueries([QueryKeys.Files.files])

        MyToast('success', 'ویرایش فایل موفقیت آمیز بود')
        navigate(`${PageUrls.main.files}/${id}`)
      })
      .catch((error) => {
        MyToast('error', 'خطا در آپلود فایل‌ها')
        return error
      })
  }
  if (
    isLoading ||
    isFetching ||
    useAddImageMutation.isLoading ||
    useAddVideoMutation.isLoading ||
    useEditFileMutation.isLoading
  ) {
    return <LoadingScreen />
  }

  return (
    <div
      dir='rtl'
      className='flex h-full w-full flex-1 flex-col gap-5 bg-white bg-opacity-40 px-5 pb-36 pt-20 text-primary-600 backdrop-blur-xl'
    >
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-right text-2xl font-semibold'>ویرایش فایل</h1>
        <Button
          onClick={handleGoBack}
          className='flex gap-0.5 border bg-primary-600 px-1.5 py-1'
        >
          <p className='text-xs text-neutral-50 max-md:text-2xs'>
            بازگشت به فایل‌ ها
          </p>
          <ArrowLeft color='var(--neutral-50)' size={16} />
        </Button>
      </div>

      <form
        className='flex h-full w-full flex-1 flex-col justify-between gap-5'
        onSubmit={handleSubmit(onSubmit)}
        action=''
      >
        <BasicInfoFields errors={errors} control={control} watch={watch} />

        <MainInfoFields errors={errors} control={control} />

        <div className='flex flex-col gap-5 border-b pb-5'>
          <LocationFields errors={errors} control={control} />
          <MapWithSearch location={location} setLocation={setLocation} />
        </div>

        <MediaFields
          images={images}
          setImages={setImages}
          videos={videos}
          setVideos={setVideos}
          existingImages={existingImages}
          existingVideos={existingVideos}
          setDeletedImages={setDeletedImages}
          deletedImages={deletedImages}
          setDeletedVideos={setDeletedVideos}
          deletedVideos={deletedVideos}
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
        <div className='flex w-full items-center justify-center'>
          <Button
            variant='contained'
            color='primary'
            className='mt-5 flex w-full items-center justify-center gap-1 text-base font-normal md:w-2/6'
            type='submit'
            loading={
              useAddImageMutation.isLoading ||
              useAddVideoMutation.isLoading ||
              useDeleteImageMutation.isLoading
            }
          >
            <p>ویرایش فایل </p>
            <Plus />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditFile
