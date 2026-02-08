import {
  UseMutationResult,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { FormContainer, FormInputs } from '@/components/Form'
import Button from '@/components/ui/Button'
import LoadingScreen from '@/components/ui/LoadingScreen'
import { MyToast } from '@/components/ui/Toast/MyToast'
import { QueryKeys } from '@/constants/keys'
import { useUpdatePermissions } from '@/hooks/mutations/useUpdatePermissions'
import { useGetPermissions } from '@/hooks/queries/useGetPermissions'
import { ResponseType } from '@/types'
import { PermissionsData } from '@/types/Files'
import { IInput } from '@/types/Forms'

const PermissionsPage = () => {
  const queryClient = useQueryClient()

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<PermissionsData>()

  const {
    data: permissionsData,
    isLoading,
    isFetching,
  }: UseQueryResult<
    ResponseType<PermissionsData[]>,
    Error
  > = useGetPermissions()

  const updatePermissionsMutation: UseMutationResult<
    ResponseType<PermissionsData>,
    Error,
    PermissionsData
  > = useUpdatePermissions()

  const inputs: IInput[] = [
    {
      type: 'checkbox',
      name: 'adviserName',
      control,
      label: 'نام مشاور',
      defaultValue: permissionsData?.data[0].adviserName,
    },
    {
      type: 'checkbox',
      name: 'propertyFirstName',
      control,
      label: 'نام مالک',
      defaultValue: permissionsData?.data[0].propertyFirstName,
    },
    {
      type: 'checkbox',
      name: 'propertyLastName',
      control,
      label: 'نام خانوادگی مالک',
      defaultValue: permissionsData?.data[0].propertyLastName,
    },
    {
      type: 'checkbox',
      name: 'propertyPhone',
      control,
      label: 'شماره تلفن مالک',
      defaultValue: permissionsData?.data[0].propertyPhone,
    },
    {
      type: 'checkbox',
      name: 'description',
      control,
      label: 'توضیحات',
      defaultValue: permissionsData?.data[0].description,
    },

    {
      type: 'checkbox',
      name: 'dealType',
      control,
      label: 'نوع معامله',
      defaultValue: permissionsData?.data[0].dealType,
    },
    {
      type: 'checkbox',
      name: 'usage',
      control,
      label: 'کاربری',
      defaultValue: permissionsData?.data[0].usage,
    },
    {
      type: 'checkbox',
      name: 'propertyType',
      control,
      label: 'نوع ملک',
      defaultValue: permissionsData?.data[0].propertyType,
    },
    {
      type: 'checkbox',
      name: 'warehouse',
      control,
      label: 'انباری',
      defaultValue: permissionsData?.data[0].warehouse,
    },
    {
      type: 'checkbox',
      name: 'parking',
      control,
      label: 'پارکینگ',
      defaultValue: permissionsData?.data[0].parking,
    },
    {
      type: 'checkbox',
      name: 'separatedoor',
      control,
      label: 'درب جدا',
      defaultValue: permissionsData?.data[0].separatedoor,
    },
    {
      type: 'checkbox',
      name: 'terrace',
      control,
      label: 'تراس',
      defaultValue: permissionsData?.data[0].terrace,
    },
    {
      type: 'checkbox',
      name: 'toilet',
      control,
      label: 'سرویس بهداشتی',
      defaultValue: permissionsData?.data[0].toilet,
    },
    {
      type: 'checkbox',
      name: 'burglaralarm',
      control,
      label: 'دزدگیر',
      defaultValue: permissionsData?.data[0].burglaralarm,
    },
    {
      type: 'checkbox',
      name: 'centralantenna',
      control,
      label: 'آنتن مرکزی',
      defaultValue: permissionsData?.data[0].centralantenna,
    },
    {
      type: 'checkbox',
      name: 'pool',
      control,
      label: 'استخر',
      defaultValue: permissionsData?.data[0].pool,
    },
    {
      type: 'checkbox',
      name: 'elevator',
      control,
      label: 'آسانسور',
      defaultValue: permissionsData?.data[0].elevator,
    },
    {
      type: 'checkbox',
      name: 'Janitor',
      control,
      label: 'سرایدار',
      defaultValue: permissionsData?.data[0].Janitor,
    },
    {
      type: 'checkbox',
      name: 'Heater',
      control,
      label: 'دستگاه گرمایشی',
      defaultValue: permissionsData?.data[0].Heater,
    },

    {
      type: 'checkbox',
      name: 'cooler',
      control,
      label: 'کولر',
      defaultValue: permissionsData?.data[0].cooler,
    },
    {
      type: 'checkbox',
      name: 'isChange',
      control,
      label: 'قابل تعویض',
      defaultValue: permissionsData?.data[0].isChange,
    },
    {
      type: 'checkbox',
      name: 'floor',
      control,
      label: 'طبقه',
      defaultValue: permissionsData?.data[0].floor,
    },
    {
      type: 'checkbox',
      name: 'Cabinet',
      control,
      label: 'کابینت',
      defaultValue: permissionsData?.data[0].Cabinet,
    },
    {
      type: 'checkbox',
      name: 'price',
      control,
      label: 'قیمت',
      defaultValue: permissionsData?.data[0].price,
    },
    {
      type: 'checkbox',
      name: 'mortgagePrice',
      control,
      label: 'قیمت رهن',
      defaultValue: permissionsData?.data[0].mortgagePrice,
    },
    {
      type: 'checkbox',
      name: 'rentPrice',
      control,
      label: 'قیمت اجاره',
      defaultValue: permissionsData?.data[0].rentPrice,
    },
    {
      type: 'checkbox',
      name: 'area',
      control,
      label: 'مساحت',
      defaultValue: permissionsData?.data[0].area,
    },
    {
      type: 'checkbox',
      name: 'region',
      control,
      label: 'منطقه',
      defaultValue: permissionsData?.data[0].region,
    },
    {
      type: 'checkbox',
      name: 'street',
      control,
      label: 'خیابان',
      defaultValue: permissionsData?.data[0].street,
    },
    {
      type: 'checkbox',
      name: 'alley',
      control,
      label: 'کوچه',
      defaultValue: permissionsData?.data[0].alley,
    },
    {
      type: 'checkbox',
      name: 'zip_code',
      control,
      label: 'کد پستی',
      defaultValue: permissionsData?.data[0].zip_code,
    },
    {
      type: 'checkbox',
      name: 'lat',
      control,
      label: 'عرض جغرافیایی',
      defaultValue: permissionsData?.data[0].lat,
    },
    {
      type: 'checkbox',
      name: 'lng',
      control,
      label: 'طول جغرافیایی',
      defaultValue: permissionsData?.data[0].lng,
    },
    {
      type: 'checkbox',
      name: 'lifespan',
      control,
      label: 'عمر بنا',
      defaultValue: permissionsData?.data[0].lifespan,
    },
    {
      type: 'checkbox',
      name: 'floorcount',
      control,
      label: 'تعداد طبقات',
      defaultValue: permissionsData?.data[0].floorcount,
    },
    {
      type: 'checkbox',
      name: 'unit',
      control,
      label: 'واحد',
      defaultValue: permissionsData?.data[0].unit,
    },
    {
      type: 'checkbox',
      name: 'countOfFloor',
      control,
      label: 'تعداد طبقات',
      defaultValue: permissionsData?.data[0].countOfFloor,
    },
    {
      type: 'checkbox',
      name: 'countOfUnit',
      control,
      label: 'تعداد واحد',
      defaultValue: permissionsData?.data[0].countOfUnit,
    },
    {
      type: 'checkbox',
      name: 'galleryImage',
      control,
      label: 'گالری تصاویر',
      defaultValue: permissionsData?.data[0].galleryImage,
    },
    {
      type: 'checkbox',
      name: 'galleryVideo',
      control,
      label: 'گالری ویدیو',
      defaultValue: permissionsData?.data[0].galleryVideo,
    },
  ]

  const onSubmit = (data: PermissionsData) => {
    const newData = {
      ...data,
    }

    updatePermissionsMutation.mutate(newData, {
      onSuccess: (res) => {
        MyToast('success', res.message)
        queryClient.invalidateQueries([QueryKeys.Permissions.permissions])
        queryClient.invalidateQueries([QueryKeys.Files.files])
        queryClient.invalidateQueries([QueryKeys.Files.signleFileDetail])
      },
    })
  }
  if (isLoading || isFetching) return <LoadingScreen />
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex h-5/6 w-[95%] flex-col items-center justify-center gap-4 overflow-hidden max-md:pb-14 max-md:pt-14'
      dir='rtl'
    >
      <div className='no-scrollbar flex h-[500px] w-full items-start justify-start overflow-y-auto border-primary-600 md:h-[550px] md:max-h-[600px] md:w-5/6'>
        <FormContainer errors={errors}>
          <FormInputs
            className='w-full grid-cols-2 md:grid-cols-4'
            boxClassName='bg-primary-600 p-2 rounded-lg'
            labelClassName='text-white'
            inputs={inputs}
            control={control}
          />
        </FormContainer>
      </div>

      <Button
        type='submit'
        className='flex h-12 w-full items-center justify-center bg-primary-600 text-lg font-semibold max-md:w-5/6 md:w-1/2'
        loading={updatePermissionsMutation.isLoading}
      >
        ثبت
      </Button>
    </form>
  )
}

export default PermissionsPage
