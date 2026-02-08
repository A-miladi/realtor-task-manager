/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { FormContainer, FormInputs } from '@/components/Form'
import Button from '@/components/ui/Button'
import LoadingScreen from '@/components/ui/LoadingScreen'
import { MyToast } from '@/components/ui/Toast/MyToast'
import { QueryKeys } from '@/constants/keys'
import { USERS_ROLE } from '@/constants/mock'
import { useCreateUser } from '@/hooks/mutations/useUser'
import { ResponseType } from '@/types'
import { IInput } from '@/types/Forms'
import { IUser } from '@/types/User'
import { renderSelectOptions } from '@/utils'

import { ActiveComponentType } from '..'

interface AddUserProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<ActiveComponentType>>
}

function AddUser({ setActiveComponent }: AddUserProps) {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm()

  const inputs: IInput[] = [
    {
      type: 'text',
      name: 'fullname',
      control,
      rules: { required: ' نام و نام خانوادگی کاربر را وارد کنید' },
      placeholder: 'نام و نام خانوادگی',
      label: 'نام و نام خانوادگی',
    },
    {
      type: 'select',
      name: 'role',
      control,
      rules: { required: ' نقش کاربر را وارد کنید' },
      placeholder: 'نقش کاربر',
      label: 'نقش کاربر',
      options: renderSelectOptions(USERS_ROLE),
      labelKey: 'value',
      valueKey: 'optionId',
    },

    {
      type: 'text',
      name: 'email',
      control,
      rules: { required: ' ایمیل را وارد کنید' },
      placeholder: 'ایمیل',
      label: 'ایمیل',
    },
    {
      type: 'text',
      name: 'phone',
      control,
      rules: { required: ' تلفن کاربر را وارد کنید' },
      placeholder: 'تلفن',
      label: 'تلفن',
    },
  ]
  const updateUserMutate: UseMutationResult<
    ResponseType<IUser>,
    Error,
    IUser
  > = useCreateUser()

  const queryClient = useQueryClient()
  const onSubmit = (data: any) => {
    const body: IUser = {
      fullname: data?.fullname,
      email: data?.email,
      phone: data?.phone,
      role: data?.role,
    }
    updateUserMutate.mutate(body, {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.User.user] })
        MyToast('success', res.message)
        setActiveComponent('usersList')
      },
    })
  }

  if (updateUserMutate.isLoading) return <LoadingScreen />

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex h-5/6 w-[90%] flex-col items-center justify-center max-md:pb-24'
      dir='rtl'
    >
      <div className='h-[60%] w-full rounded-xl border-t-4 border-primary-600 pt-4 md:w-1/2'>
        <FormContainer errors={errors}>
          <FormInputs
            className='h-full w-full'
            inputs={inputs}
            control={control}
          />
        </FormContainer>
      </div>

      <div className='bottom-0 flex h-1/5 w-full items-center justify-center max-md:absolute'>
        <Button
          type='submit'
          className='flex h-12 w-full items-center justify-center bg-primary-600 text-lg font-semibold max-md:w-5/6 md:w-1/2'
          loading={updateUserMutate.isLoading}
        >
          ثبت
        </Button>
      </div>
    </form>
  )
}

export default AddUser
