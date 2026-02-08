import { FormContainer, FormInputs } from '@/components/Form'
import { RADIO_OPTIONS } from '@/constants/mock'
import { FieldsProps, IInput } from '@/types/Forms'
import { renderSelectOptions } from '@/utils'

const FacilitiesFields = ({ control, errors }: FieldsProps) => {
  const Burglaralarm: IInput[] = [
    {
      type: 'radio',
      name: 'burglaralarm',
      control,
      label: 'اعلام سرقت',
      options: renderSelectOptions(RADIO_OPTIONS, true),
      labelKey: 'value',
      valueKey: 'optionId',
      defaultValue: false,
    },
  ]
  const Elevator: IInput[] = [
    {
      type: 'radio',
      name: 'elevator',
      control,
      label: 'آسانسور',
      options: renderSelectOptions(RADIO_OPTIONS, true),
      labelKey: 'value',
      valueKey: 'optionId',
      defaultValue: false,
    },
  ]
  const Pool: IInput[] = [
    {
      type: 'radio',
      name: 'pool',
      control,
      label: 'استخر',
      options: renderSelectOptions(RADIO_OPTIONS, true),
      labelKey: 'value',
      valueKey: 'optionId',
      defaultValue: false,
    },
  ]
  const Terrace: IInput[] = [
    {
      type: 'radio',
      name: 'terrace',
      control,
      label: 'بالکن',
      options: renderSelectOptions(RADIO_OPTIONS, true),
      labelKey: 'value',
      valueKey: 'optionId',
      defaultValue: false,
    },
  ]
  const Separatedoor: IInput[] = [
    {
      type: 'radio',
      name: 'separatedoor',
      control,
      label: 'درب مجزا',
      options: renderSelectOptions(RADIO_OPTIONS, true),
      labelKey: 'value',
      valueKey: 'optionId',
      defaultValue: false,
    },
  ]
  const Parking: IInput[] = [
    {
      type: 'radio',
      name: 'parking',
      control,
      label: 'پارکینگ',
      options: renderSelectOptions(RADIO_OPTIONS, true),
      labelKey: 'value',
      valueKey: 'optionId',
      defaultValue: false,
    },
  ]
  const Warehouse: IInput[] = [
    {
      type: 'radio',
      name: 'warehouse',
      control,
      label: 'انباری',
      options: renderSelectOptions(RADIO_OPTIONS, true),
      labelKey: 'value',
      valueKey: 'optionId',
      defaultValue: false,
    },
  ]
  const Janitor: IInput[] = [
    {
      type: 'radio',
      name: 'Janitor',
      control,
      label: 'سرایداری',
      options: renderSelectOptions(RADIO_OPTIONS, true),
      labelKey: 'value',
      valueKey: 'optionId',
      defaultValue: false,
    },
  ]
  const toilet: IInput[] = [
    {
      type: 'radio',
      name: 'toilet',
      control,
      label: 'سرویس بهداشتی',
      options: renderSelectOptions(RADIO_OPTIONS, true),
      labelKey: 'value',
      valueKey: 'optionId',
      defaultValue: false,
    },
  ]
  const centralantenna: IInput[] = [
    {
      type: 'radio',
      name: 'centralantenna',
      control,
      label: 'اینترنت مرکزی',
      options: renderSelectOptions(RADIO_OPTIONS, true),
      labelKey: 'value',
      valueKey: 'optionId',
      defaultValue: false,
    },
  ]

  return (
    <div className='flex flex-col items-start justify-center gap-2 border-b pb-5'>
      <p className='text-right text-xl font-medium'>امکانات ملک </p>
      <div className='flex w-full flex-wrap items-start justify-start gap-1.5'>
        <FormContainer errors={errors}>
          <FormInputs
            className='w-[10%] rounded-md border border-primary-600 bg-white bg-opacity-40 p-2 max-md:w-[49%]'
            inputs={Pool}
            control={control}
          />
        </FormContainer>

        <FormContainer errors={errors}>
          <FormInputs
            className='w-[10%] rounded-md border border-primary-600 bg-white bg-opacity-40 p-2 max-md:w-[49%]'
            inputs={Elevator}
            control={control}
          />
        </FormContainer>
        <FormContainer errors={errors}>
          <FormInputs
            className='w-[10%] rounded-md border border-primary-600 bg-white bg-opacity-40 p-2 max-md:w-[49%]'
            inputs={Separatedoor}
            control={control}
          />
        </FormContainer>
        <FormContainer errors={errors}>
          <FormInputs
            className='w-[10%] rounded-md border border-primary-600 bg-white bg-opacity-40 p-2 max-md:w-[49%]'
            inputs={Terrace}
            control={control}
          />
        </FormContainer>
        <FormContainer errors={errors}>
          <FormInputs
            className='w-[10%] rounded-md border border-primary-600 bg-white bg-opacity-40 p-2 max-md:w-[49%]'
            inputs={Burglaralarm}
            control={control}
          />
        </FormContainer>

        <FormContainer errors={errors}>
          <FormInputs
            className='w-[10%] rounded-md border border-primary-600 bg-white bg-opacity-40 p-2 max-md:w-[49%]'
            inputs={Warehouse}
            control={control}
          />
        </FormContainer>
        <FormContainer errors={errors}>
          <FormInputs
            className='w-[10%] rounded-md border border-primary-600 bg-white bg-opacity-40 p-2 max-md:w-[49%]'
            inputs={centralantenna}
            control={control}
          />
        </FormContainer>
        <FormContainer errors={errors}>
          <FormInputs
            className='w-[10%] rounded-md border border-primary-600 bg-white bg-opacity-40 p-2 max-md:w-[49%]'
            inputs={Parking}
            control={control}
          />
        </FormContainer>
        <FormContainer errors={errors}>
          <FormInputs
            className='w-[10%] rounded-md border border-primary-600 bg-white bg-opacity-40 p-2 max-md:w-[49%]'
            inputs={Janitor}
            control={control}
          />
        </FormContainer>
        <FormContainer errors={errors}>
          <FormInputs
            className='w-[10%] rounded-md border border-primary-600 bg-white bg-opacity-40 p-2 max-md:w-[49%]'
            inputs={toilet}
            control={control}
          />
        </FormContainer>
      </div>
    </div>
  )
}

export default FacilitiesFields
