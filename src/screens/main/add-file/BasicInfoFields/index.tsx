import { FieldValues, UseFormWatch } from 'react-hook-form'
import { useShallow } from 'zustand/react/shallow'

import { FormContainer, FormInputs } from '@/components/Form'
import {
  DEAL_TYPES,
  PROPERTY_TYPE,
  RADIO_OPTIONS,
  USAGE_TYPE,
} from '@/constants/mock'
import { UseAllUsersStore } from '@/store/allUsers'
import { FieldsProps, IInput } from '@/types/Forms'
import { renderSelectOptions } from '@/utils'

interface BasicInfoFieldsProps extends FieldsProps {
  watch: UseFormWatch<FieldValues>
}

const BasicInfoFields = ({ control, errors, watch }: BasicInfoFieldsProps) => {
  const [users] = UseAllUsersStore(useShallow((state) => [state.users]))

  const adviserOptions = users?.map((user) => ({
    optionId: user.fullname,
    label: user.fullname,
  }))

  const selectedDealType = watch('dealType')

  const isLeaseDealType = selectedDealType === 'رهن و اجاره'

  const BasicInputs: IInput[] = [
    {
      type: 'select',
      name: 'adviserName',
      control,
      rules: { required: '   نام مشاور را وارد کنید' },
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
      rules: { required: ' نوع معامله را وارد کنید' },
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
      rules: { required: ' نوع ملک را وارد کنید' },
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
      rules: { required: ' نوع کاربری را وارد کنید' },
      placeholder: 'کاربری',
      label: 'کاربری',
      options: renderSelectOptions(USAGE_TYPE),
      labelKey: 'value',
      valueKey: 'value',
    },
    {
      type: 'number',
      name: 'area',
      control,
      rules: { required: ' متراژ را وارد کنید' },
      placeholder: 'مثال : ۱۲۰',
      label: 'متراژ',
    },
  ]

  // Conditionally add the price input based on the selected deal type
  if (selectedDealType == 'رهن و اجاره') {
    BasicInputs.push(
      {
        type: 'number',
        name: 'mortgagePrice',
        control,
        placeholder: 'تومان',
        label: isLeaseDealType ? 'رهن' : '',
        className: isLeaseDealType ? '' : 'hidden',
        rules: { required: ' رهن را وارد کنید' },
        addCommas: true,
      },
      {
        type: 'number',
        name: 'rentPrice',
        control,
        placeholder: 'تومان',
        label: isLeaseDealType ? 'اجاره' : '',
        className: isLeaseDealType ? '' : 'hidden',
        rules: { required: ' اجاره را وارد کنید' },
        addCommas: true,
      },
      {
        type: 'select',
        name: 'isChange',
        control,
        label: ' قابلیت تبدیل',
        options: renderSelectOptions(RADIO_OPTIONS, true),
        labelKey: 'value',
        valueKey: 'optionId',
      }
    )
  } else {
    BasicInputs.push({
      type: 'number',
      name: 'price',
      control,
      rules: { required: ' قیمت را وارد کنید' },
      placeholder: 'تومان',
      label: 'قیمت',
      addCommas: true,
    })
  }

  return (
    <div className='flex flex-col gap-5 border-b pb-5'>
      <p className='text-right text-xl font-medium'>اطلاعات اولیه </p>

      <FormContainer errors={errors}>
        <FormInputs
          className='mt-3 w-full grid-cols-1 md:grid-cols-4'
          inputs={BasicInputs}
          control={control}
        />
      </FormContainer>
    </div>
  )
}

export default BasicInfoFields
