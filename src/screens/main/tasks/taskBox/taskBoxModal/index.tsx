/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useShallow } from 'zustand/react/shallow'

import { FormContainer, FormInputs } from '@/components/Form'
import Plus from '@/components/icons/Plus'
import Button from '@/components/ui/Button'
import TextArea from '@/components/ui/TextArea'
import { MyToast } from '@/components/ui/Toast/MyToast'
import { QueryKeys } from '@/constants/keys'
import { TASK_STATUS } from '@/constants/optionValues'
import { useAddTask } from '@/hooks/mutations/useAddTask'
import { UseAllUsersStore } from '@/store/allUsers'
import { ResponseType } from '@/types'
import { IInput } from '@/types/Forms'
import { ITask } from '@/types/Task'
import { renderSelectOptions } from '@/utils'

interface ModalProps {
  onClose: () => void
}

const TaskBoxModal: FC<ModalProps> = ({ onClose }) => {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      status: TASK_STATUS[0].optionId,
    },
  })

  const [users] = UseAllUsersStore(useShallow((state) => [state.users]))

  // const adviserUsers = users?.filter((user) => user.role === ROLE.adviser) || []

  const adviserOptions = users?.map((user) => ({
    optionId: user.id,
    label: user.fullname,
  }))

  const Inputs: IInput[] = [
    {
      type: 'text',
      name: 'title',
      control,
      rules: { required: 'عنوان تسک را وارد کنید' },
      placeholder: 'مثال : قرارداد شرکت میسان',
      label: 'عنوان تسک',
    },
    {
      type: 'select',
      name: 'adviserId',
      control,
      rules: { required: '   نام مشاور را وارد کنید' },
      placeholder: 'نام مشاور',
      label: 'مشاور',
      options: renderSelectOptions(adviserOptions ? adviserOptions : []),
      labelKey: 'value',
      valueKey: 'optionId',
    },
    {
      type: 'text',
      name: 'link',
      control,
      placeholder: 'Example.ir/file-01',
      label: 'لینک فایل املاک',
    },
    {
      type: 'radio',
      name: 'status',
      control,
      placeholder: 'وضعیت تسک',
      options: renderSelectOptions(TASK_STATUS),
      labelKey: 'value',
      valueKey: 'optionId',
      label: 'وضعیت تسک',
    },
  ]

  const [show, setShow] = useState(false)
  const [description, setDescription] = useState('')

  useEffect(() => {
    setShow(true)
  }, [])

  const updateTaskMutate: UseMutationResult<
    ResponseType<ITask[]>,
    Error,
    ITask
  > = useAddTask()
  const queryClient = useQueryClient()

  const onSubmit = (data: any) => {
    const body: ITask | any = {
      title: data?.title,
      description: description || '',
      adviserId: data?.adviserId,
      link: data?.link || '',
      status: data?.status,
    }
    updateTaskMutate.mutate(body, {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.Tasks.tasks] })
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.Notifications.notification],
        })
        onClose()
        MyToast('success', res.message)
      },
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${
        show ? 'opacity-100' : 'opacity-0'
      } relative flex h-auto w-full flex-col items-center justify-start gap-2 rounded-xl bg-white px-5 py-7 shadow-xl transition-opacity duration-200 ease-in-out`}
    >
      <p className='font-semibold text-primary-600'>ساخت تسک جدید</p>
      <FormContainer errors={errors}>
        <FormInputs className='w-full' inputs={Inputs} control={control} />

        <TextArea
          className='h-20 max-h-24 w-full bg-neutral-50'
          label='توضیحات'
          labelClassName='font-semibold'
          name='description'
          placeholder='متن خود را وارد کنید ...'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormContainer>

      <div className='mt-4 flex h-12 w-full items-center justify-between gap-2'>
        <Button
          loading={updateTaskMutate.isLoading}
          type='submit'
          className='flex h-full w-[70%] items-center justify-center gap-1 rounded-lg bg-primary-600 text-xl font-medium text-neutral-50'
          dir='rtl'
        >
          <Plus color='var(--secondary-50)' size={28} />
          <p>ساخت تسک جدید</p>
        </Button>
        <Button
          onClick={onClose}
          className='h-full w-[30%] rounded-lg border-[1px] border-neutral-700 bg-transparent text-lg font-medium text-primary-600'
        >
          انصراف
        </Button>
      </div>
    </form>
  )
}

export default TaskBoxModal
