import { FormContainer, FormInputs } from '@/components/Form'
import {
  CABINET_OPTIONS,
  COOLER_OPTIONS,
  FLOOR_OPTIONS,
  HEATER_OPTIONS,
} from '@/constants/mock'
import { FieldsProps, IInput } from '@/types/Forms'
import { renderSelectOptions } from '@/utils'

const OptionFields = ({ control, errors }: FieldsProps) => {
  const OptionFieldsInputs: IInput[] = [
    {
      type: 'number',
      name: 'lifespan',
      control,
      rules: { required: '   قدمت را وارد کنید' },
      placeholder: 'مثال : ۲',
      label: 'قدمت',
    },
    {
      type: 'number',
      name: 'countOfFloor',
      control,
      rules: { required: ' طبقات را وارد کنید' },
      placeholder: 'مثال : ۸',
      label: 'طبقات',
    },
    {
      type: 'number',
      name: 'floorcount',
      control,
      rules: { required: ' طبقه را وارد کنید' },
      placeholder: 'مثال : ۴',
      label: 'طبقه',
    },

    {
      type: 'number',
      name: 'unit',
      control,
      rules: { required: ' واحد را وارد کنید' },
      placeholder: 'مثال : ۱',
      label: 'واحد',
    },
    {
      type: 'number',
      name: 'countOfUnit',
      control,
      rules: { required: ' تعداد واحد را وارد کنید' },
      placeholder: 'مثال : ۲',
      label: 'تعداد واحد',
    },
    {
      type: 'select',
      name: 'Cabinet',
      control,
      placeholder: 'کابینت',
      label: 'کابینت',
      options: renderSelectOptions(CABINET_OPTIONS),
      labelKey: 'value',
      valueKey: 'optionId',
    },

    {
      type: 'select',
      name: 'Heater',
      control,
      label: 'دستگاه گرمایشی',
      options: renderSelectOptions(HEATER_OPTIONS),
      labelKey: 'value',
      valueKey: 'optionId',
    },

    {
      type: 'select',
      name: 'cooler',
      control,
      label: 'دستگاه سرمایشی',
      options: renderSelectOptions(COOLER_OPTIONS),
      labelKey: 'value',
      valueKey: 'optionId',
    },
    {
      type: 'select',
      name: 'floor',
      control,
      label: '  جنس کف ',
      options: renderSelectOptions(FLOOR_OPTIONS),
      labelKey: 'value',
      valueKey: 'optionId',
      placeholder: 'جنس کف',
    },
  ]

  return (
    <div className='flex flex-col gap-5 border-b pb-5'>
      <p className='text-right text-xl font-medium'>سایر ویژگی ها </p>

      <FormContainer errors={errors}>
        <FormInputs
          className='mt-3 w-full grid-cols-1 gap-6 md:grid-cols-4'
          inputs={OptionFieldsInputs}
          control={control}
        />
      </FormContainer>
    </div>
  )
}

export default OptionFields
