import {
  UseMutationResult,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useShallow } from 'zustand/react/shallow'

import { FormContainer, FormInputs } from '@/components/Form'
import Edit from '@/components/icons/Edit'
import Trash from '@/components/icons/Trash'
import X from '@/components/icons/X'
import Button from '@/components/ui/Button'
import IconButton from '@/components/ui/IconButton'
import Loader from '@/components/ui/Loader'
import TextArea from '@/components/ui/TextArea'
import { MyToast } from '@/components/ui/Toast/MyToast'
import { QueryKeys } from '@/constants/keys'
import { TASK_STATUS } from '@/constants/optionValues'
import { ROLE } from '@/constants/role'
import { useDeleteTask, useEditTask } from '@/hooks/mutations/useTask'
import { useGetTaskById } from '@/hooks/queries/useGetTask'
import { UseAllUsersStore } from '@/store/allUsers'
import { UseUserStore } from '@/store/user'
import { ResponseType } from '@/types'
import { IInput } from '@/types/Forms'
import { CommentType, EditTaskRequest, IEditTask } from '@/types/Task'
import { renderSelectOptions } from '@/utils'

import Comments from './Comments'

interface TaskCardModalProps {
  onClose: () => void
  taskId?: number | string
  taskData?: IEditTask | undefined
  taskStatus?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isIEditTask(data: any): data is IEditTask {
  return data && 'adviserId' in data
}

const TaskCardModal: FC<TaskCardModalProps> = ({ onClose, taskId }) => {
  const queryClient = useQueryClient()
  const {
    data,
    isLoading,
    isError,
  }: UseQueryResult<ResponseType<IEditTask>, Error> = useGetTaskById(taskId)

  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm({})

  useEffect(() => {
    if (data?.data) {
      reset({
        status: data.data.status,
        title: data.data.title,
        link: data.data.link,
        adviserId: String(data.data.adviserId),
      })

      setDescription(data.data.description || '')
    }
  }, [data, reset])

  const editTaskMutate: UseMutationResult<
    ResponseType<object>,
    Error,
    EditTaskRequest
  > = useEditTask()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditTask = (formData: any) => {
    const body: EditTaskRequest = {
      title: formData.title,
      adviserId: formData.adviserId || '',
      link: formData.link,
      status: formData.status,
      description: description,
      id: String(taskId),
    }
    editTaskMutate.mutate(body, {
      onSuccess: (res) => {
        queryClient.invalidateQueries([QueryKeys.Tasks.tasks])
        queryClient.invalidateQueries([QueryKeys.Tasks.taskId])
        queryClient.invalidateQueries([QueryKeys.Notifications.notification])

        onClose()
        MyToast('success', res.message)
      },
    })
  }

  const deleteUserMutate: UseMutationResult<
    ResponseType<object>,
    Error
  > = useDeleteTask()
  const handleDeleteTask = () => {
    deleteUserMutate.mutate(taskData?.id, {
      onSuccess: (res) => {
        MyToast('success', res.message)
        onClose()
        queryClient.invalidateQueries({ queryKey: [QueryKeys.Tasks.tasks] })
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.Notifications.notification],
        })
      },
    })
  }
  const [description, setDescription] = useState('')
  const [show, setShow] = useState(false)
  const [messages, setMessages] = useState<CommentType[]>([])

  useEffect(() => {
    setShow(true)
    if (data?.data) {
      const Data = data.data
      if (isIEditTask(Data)) {
        setMessages(Data.comments || [])
      }
    }
  }, [data])

  const [users] = UseAllUsersStore(useShallow((state) => [state.users]))

  const adviserOptions = users?.map((user) => ({
    optionId: user.id,
    label: user.fullname,
  }))
  const [user] = UseUserStore(useShallow((state) => [state.user]))

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

  if (isLoading)
    return (
      <div className='absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-black opacity-40'>
        <Loader />
      </div>
    )
  if (isError || !data)
    return (
      <div
        onClick={onClose}
        className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-40 font-semibold text-neutral-50'
      >
        <div className='flex h-20 w-40 items-center justify-center rounded-md bg-white text-black'>
          فایل یافت نشد
        </div>
      </div>
    )

  const taskData = data?.data
  let task: IEditTask | null = null

  if (isIEditTask(taskData)) {
    task = taskData
  }
  return (
    <div
      className={`${
        show ? 'opacity-100' : 'opacity-0'
      } flex w-full flex-col bg-white transition-opacity duration-200 ease-in-out max-md:relative md:h-full md:rounded-2xl md:shadow-lg`}
    >
      <div className='flex w-full items-center justify-between border-b border-neutral-400 px-5 py-2'>
        <p className='text-xl font-semibold'>{task ? task.title : 'Form'}</p>
        <button onClick={onClose}>
          <IconButton
            className='bg-transparent'
            icon={<X color='var(--neutral-900)' />}
          />
        </button>
      </div>
      <div className='flex h-full w-full overflow-hidden max-md:flex-col'>
        <form
          onSubmit={handleSubmit(handleEditTask)}
          className='relative flex h-1/2 w-full flex-col items-center justify-evenly overflow-hidden border-b border-neutral-400 bg-white px-5 max-md:py-3 md:h-full md:w-1/2 md:items-start md:justify-between md:rounded-br-2xl md:border-l-[1px] md:pb-2 md:pt-5'
        >
          <div className='flex w-full flex-col items-center justify-start gap-4'>
            <FormContainer errors={errors}>
              <FormInputs
                className='w-full'
                inputs={Inputs}
                control={control}
              />
            </FormContainer>
            <TextArea
              className='max-h-24 min-h-fit w-full bg-neutral-50'
              label='توضیحات'
              labelClassName='font-semibold'
              placeholder='متن خود را وارد کنید ...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='flex w-full items-center justify-between gap-2 max-md:mt-2 md:h-16'>
            <Button
              loading={editTaskMutate.isLoading}
              type='submit'
              className='flex w-1/2 items-center justify-center gap-1 border-[1px] border-primary-500 bg-transparent text-primary-500 max-md:h-8 max-md:text-xs'
            >
              <Edit />
              <p>ویرایش تسک</p>
            </Button>
            {user?.role === ROLE.admin && (
              <Button
                type='button'
                onClick={handleDeleteTask}
                className='flex w-1/2 items-center justify-center gap-1 border-[1px] border-primary-500 bg-transparent text-primary-500 max-md:h-8 max-md:text-xs'
                loading={deleteUserMutate.isLoading}
              >
                <Trash />
                <p>حذف تسک</p>
              </Button>
            )}
          </div>
        </form>
        <div></div>
        <Comments
          taskId={taskId}
          adviserId={data.data.adviserId}
          messages={messages}
        />
      </div>
    </div>
  )
}

export default TaskCardModal
