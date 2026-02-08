import { useForm } from 'react-hook-form'
import { useShallow } from 'zustand/react/shallow'

import { FormContainer, FormInputs } from '@/components/Form'
import Button from '@/components/ui/Button'
import { DEAL_TYPES, PROPERTY_TYPE, USAGE_TYPE } from '@/constants/mock'
import { Filters } from '@/hooks/queries/useGetAllFiles'
import { UseAllUsersStore } from '@/store/allUsers'
import { IInput } from '@/types/Forms'
import { renderSelectOptions } from '@/utils'

interface FilterFormProps {
  setFilters: React.Dispatch<React.SetStateAction<Filters | null>>
  setIsFilter: React.Dispatch<React.SetStateAction<boolean>>
}

const FilterForm = ({ setFilters, setIsFilter }: FilterFormProps) => {
  const [users] = UseAllUsersStore(useShallow((state) => [state.users]))

  const adviserOptions = users?.map((user) => ({
    optionId: user.fullname,
    label: user.fullname,
  }))

  const {
    formState: { errors, isLoading, isSubmitting },
    control,
    watch,
    handleSubmit,
    reset,
  } = useForm()

  const selectedDealType = watch('dealType')

  const isLeaseDealType = selectedDealType === 'رهن و اجاره'

  const BasicInputs: IInput[] = [
    {
      type: 'select',
      name: 'adviserName',
      control,
      // rules: { required: '   نام مشاور را وارد کنید' },
      placeholder: 'نام مشاور',
      label: 'مشاور',
      options: renderSelectOptions(adviserOptions ? adviserOptions : []),
      labelKey: 'value',
      valueKey: 'value',
    },
    {
      type: 'select',
      name: 'dealType',
      control,
      // rules: { required: ' نوع معامله را وارد کنید' },
      placeholder: 'نوع معامله',
      label: 'نوع معامله',
      options: renderSelectOptions(DEAL_TYPES),
      labelKey: 'value',
      valueKey: 'value',
    },
    {
      type: 'select',
      name: 'propertyType',
      control,
      placeholder: 'نوع ملک',
      label: 'نوع ملک',
      options: renderSelectOptions(PROPERTY_TYPE),
      labelKey: 'value',
      valueKey: 'value',
    },
    {
      type: 'select',
      name: 'usage',
      control,
      placeholder: 'کاربری',
      label: 'کاربری',
      options: renderSelectOptions(USAGE_TYPE),
      labelKey: 'value',
      valueKey: 'value',
    },

    {
      type: 'text',
      name: 'region',
      control,
      placeholder: 'مثال:۱۱',
      label: 'منطقه',
    },
    {
      type: 'text',
      name: 'street',
      control,
      placeholder: 'مثال : امام',
      label: 'خیابان',
    },
    {
      type: 'text',
      name: 'alley',
      control,
      placeholder: 'مثال : حکمت',
      label: 'کوچه',
    },
    {
      type: 'text',
      name: 'PropertyOwnerFirstName',
      control,
      // rules: { required: '   نام مالک را وارد کنید' },
      placeholder: 'مثال : محمدرضا',
      label: 'نام مالک ',
    },

    {
      type: 'text',
      name: 'PropertyOwnerLastName',
      control,
      // rules: { required: '   نام مالک را وارد کنید' },
      placeholder: 'مثال : اسدی',
      label: ' نام خانوادگی مالک',
    },

    {
      type: 'number',
      name: 'PropertyOwnerPhone',
      control,
      // rules: { required: ' شماره تلفن را وارد کنید' },
      placeholder: 'مثال : 0912123456',
      label: 'شماره تلفن مالک',
    },
  ]

  const PriceInputs: IInput[] = [
    {
      type: 'number',
      name: 'MinPrice',
      control,
      placeholder: 'مثال : از ۶۰،۰۰۰،۰۰۰ (تومان)',
      label: 'قیمت',
      addCommas: true,
    },
    {
      type: 'number',
      name: 'MaxPrice',
      control,
      // rules: { required: 'قیمت' },
      placeholder: 'مثال : تا ۱۲۰،۰۰۰،۰۰۰ (تومان)',
      addCommas: true,
    },
  ]

  const MortgageInputs: IInput[] = [
    {
      type: 'number',
      name: 'minMortgagePrice',
      control,
      placeholder: 'مثال : از ۶۰،۰۰۰،۰۰۰ (تومان)',
      label: 'اجاره',
      addCommas: true,
    },
    {
      type: 'number',
      name: 'maxMortgagePrice',
      control,
      // rules: { required: 'قیمت' },
      placeholder: 'مثال : تا ۱۲۰،۰۰۰،۰۰۰ (تومان)',
      addCommas: true,
    },
  ]
  const RentInputs: IInput[] = [
    {
      type: 'number',
      name: 'minRentPrice',
      control,
      placeholder: 'مثال : از ۶۰،۰۰۰،۰۰۰ (تومان)',
      label: 'رهن',
      addCommas: true,
    },
    {
      type: 'number',
      name: 'maxRentPrice',
      control,
      placeholder: 'مثال : تا ۱۲۰،۰۰۰،۰۰۰ (تومان)',
      addCommas: true,
    },
  ]

  const AreaInputs: IInput[] = [
    {
      type: 'number',
      name: 'MinArea',
      control,
      placeholder: 'مثال : ۵۰',
      label: 'متراژ',
    },
    {
      type: 'number',
      name: 'MaxArea',
      control,
      placeholder: 'مثال : ۱۲۰',
    },
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFilterSubmit = (data: any) => {
    setFilters(data)
    setIsFilter(false)
  }

  return (
    <form
      className='max-md:pb-16 md:pr-2'
      onSubmit={handleSubmit(onFilterSubmit)}
    >
      <div className={'mt-1 flex items-center justify-center gap-2'}>
        <Button
          onClick={() => reset()}
          variant='outlined'
          color='primary'
          className='w-full border border-primary-600 bg-neutral-50'
          loading={isLoading || isSubmitting}
        >
          <p className='text-2xs font-semibold'>حذف فیلتر ها</p>
        </Button>

        <Button
          type='submit'
          variant='contained'
          color='primary'
          className='w-full'
        >
          <p className='text-2xs font-semibold'>اعمال فیلتر</p>
        </Button>
      </div>
      <FormContainer errors={errors}>
        <FormInputs
          className='mt-3 w-full grid-cols-1'
          inputs={BasicInputs}
          control={control}
        />
      </FormContainer>

      <FormContainer errors={errors}>
        <FormInputs
          className='mt-3 w-full grid-cols-1'
          inputs={AreaInputs}
          control={control}
        />
      </FormContainer>

      {/* price inputs */}

      {isLeaseDealType ? (
        <>
          <FormContainer errors={errors}>
            <FormInputs
              className='mt-3 w-full grid-cols-1'
              inputs={RentInputs}
              control={control}
            />
          </FormContainer>
          <FormContainer errors={errors}>
            <FormInputs
              className='mt-3 w-full grid-cols-1'
              inputs={MortgageInputs}
              control={control}
            />
          </FormContainer>
        </>
      ) : (
        <FormContainer errors={errors}>
          <FormInputs
            className='mt-3 w-full grid-cols-1'
            inputs={PriceInputs}
            control={control}
          />
        </FormContainer>
      )}
    </form>
  )
}

export default FilterForm
