import { FormContainer, FormInputs } from '@/components/Form'
import { FieldsProps, IInput } from '@/types/Forms'

const LocationFields = ({ control, errors }: FieldsProps) => {
  const LocationInputs: IInput[] = [
    {
      type: 'number',
      name: 'region',
      control,
      // rules: { required: '   منطقه را وارد کنید' },
      placeholder: 'مثال: ۱',
      label: 'منطقه',
    },
    {
      type: 'text',
      name: 'street',
      control,
      // rules: { required: ' خیابان را وارد کنید' },
      placeholder: 'مثال : امام خمینی',
      label: 'خیابان',
    },
    {
      type: 'text',
      name: 'alley',
      control,
      // rules: { required: ' کوچه را وارد کنید' },
      placeholder: 'مثال : حکمت',
      label: 'کوچه',
    },
    {
      type: 'number',
      name: 'zip_code',
      control,
      // rules: { required: ' کد پستی را وارد کنید' },
      placeholder: 'کد پستی',
      label: 'کد پستی',
    },
  ]

  return (
    <>
      <p className='text-right text-xl font-medium'>موقعیت ملک </p>

      <FormContainer errors={errors}>
        <FormInputs
          className='mt-3 w-full grid-cols-1 md:grid-cols-4'
          inputs={LocationInputs}
          control={control}
        />
      </FormContainer>
    </>
  )
}

export default LocationFields
