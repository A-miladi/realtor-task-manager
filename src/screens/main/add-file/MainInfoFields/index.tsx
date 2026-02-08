import { FormContainer, FormInputs } from '@/components/Form'
import { FieldsProps, IInput } from '@/types/Forms'

const MainInfoFields = ({ control, errors }: FieldsProps) => {
  const OwnerInputs: IInput[] = [
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

  return (
    <div className='flex flex-col gap-5 border-b pb-5'>
      <p className='text-right text-xl font-medium'>اطلاعات مالک </p>

      <FormContainer errors={errors}>
        <FormInputs
          className='mt-3 w-full grid-cols-1 md:grid-cols-4'
          inputs={OwnerInputs}
          control={control}
        />
      </FormContainer>
    </div>
  )
}

export default MainInfoFields
