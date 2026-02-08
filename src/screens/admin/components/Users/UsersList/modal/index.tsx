/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useShallow } from 'zustand/react/shallow'

import { FormContainer, FormInputs } from '@/components/Form'
import Edit from '@/components/icons/Edit'
import Trash from '@/components/icons/Trash'
import Button from '@/components/ui/Button'
import { MyToast } from '@/components/ui/Toast/MyToast'
import { QueryKeys } from '@/constants/keys'
import { USERS_ROLE } from '@/constants/mock'
import { useDeleteUser, useEditUser } from '@/hooks/mutations/useUser'
import { UseUserStore } from '@/store/user'
import { ResponseType } from '@/types'
import { IInput } from '@/types/Forms'
import { IUser } from '@/types/User'
import { renderSelectOptions } from '@/utils'

export interface ListModalProps {
  userData: IUser | undefined
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ListModal = ({ userData, setShowModal }: ListModalProps) => {
  const queryClient = useQueryClient()
  const [user, setUser] = UseUserStore(
    useShallow((state) => [state.user, state.setUser])
  )

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<IUser>({
    defaultValues: {
      email: userData?.email,
      fullname: userData?.fullname,
      phone: userData?.phone,
      role: userData?.role,
    },
  })

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

  // const [show, setShow] = useState(false)

  const editUserMutate: UseMutationResult<
    ResponseType<IUser>,
    Error,
    IUser
  > = useEditUser()

  const handleEditUser = (data: any) => {
    const body: IUser = {
      fullname: data?.fullname,
      email: data?.email,
      phone: data?.phone,
      role: data?.role,
      id: userData?.id,
    }
    editUserMutate.mutate(body, {
      onSuccess: (res) => {
        setUser(res.data)
        MyToast('success', res.message)
        setShowModal(false)
        queryClient.invalidateQueries({ queryKey: [QueryKeys.User.user] })
      },
    })
  }
  const deleteUserMutate: UseMutationResult<
    ResponseType<object>,
    Error,
    any
  > = useDeleteUser()

  const handleDeleteUser = () => {
    deleteUserMutate.mutate(userData?.id, {
      onSuccess: (res) => {
        MyToast('success', res.message)
        setShowModal(false)
        queryClient.invalidateQueries({ queryKey: [QueryKeys.User.user] })
      },
    })
  }

  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl bg-white p-5 shadow-xl md:p-10`}
      dir='rtl'
    >
      <form
        onSubmit={handleSubmit(handleEditUser)}
        className='flex h-full w-full flex-col items-center justify-center'
        dir='rtl'
      >
        <FormContainer errors={errors}>
          <FormInputs className='w-full' inputs={inputs} control={control} />
        </FormContainer>
        <div className='mt-5 flex h-16 w-full items-center justify-between gap-2'>
          <Button
            type='submit'
            className='flex w-1/2 items-center justify-center gap-1 border-[1px] border-primary-500 bg-transparent text-primary-500'
            loading={editUserMutate.isLoading}
          >
            <Edit />
            <p>ویرایش کاربر</p>
          </Button>
          {user?.id !== userData?.id && (
            <Button
              loading={deleteUserMutate.isLoading}
              onClick={handleDeleteUser}
              className='flex w-1/2 items-center justify-center gap-1 border-[1px] border-primary-500 bg-transparent text-primary-500'
            >
              <Trash />
              <p>حذف کاربر</p>
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

export default ListModal
