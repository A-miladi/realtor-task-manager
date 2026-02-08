import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import MarkerLeft from '@/components/icons/Marker-Left'
import Plus from '@/components/icons/Plus'
import User from '@/components/icons/User'
import X from '@/components/icons/X'
import Button from '@/components/ui/Button'
import Chips from '@/components/ui/Chips'
import Loader from '@/components/ui/Loader'
import Modal from '@/components/ui/Modal'
import { PageUrls } from '@/constants/pageUrls'
import { useGetAllTask } from '@/hooks/queries/useGetTask'
import { ResponseType, UseQueryResult } from '@/types'
import { IEditTask, ITask, Task_Status } from '@/types/Task'

import TaskBox from './taskBox'
import TaskBoxModal from './taskBox/taskBoxModal'
import TaskCard from './taskCard'
import TaskCardModal from './taskCard/taskCardModal'

function Tasks() {
  const {
    data,
    isLoading,
    isError,
  }: UseQueryResult<ResponseType<ITask[]>, Error> = useGetAllTask()

  const navigate = useNavigate()

  const [activeChipIndex, setActiveChipIndex] = useState<number | null>(null)
  const [selectedTaskId, setSelectedTaskId] = useState<number | string>()
  const [showAdviser, setShowAdviser] = useState(false)
  const [showTask, setShowTask] = useState(false)
  const [showTaskBoxModal, setShowTaskBoxModal] = useState(false)
  const [showTaskCardModal, setShowTaskCardModal] = useState(false)
  const [selectedChip, setSelectedChip] = useState<string>('')
  // const [userData] = UseUserStore(useShallow((state) => [state.user]))
  const { id } = useParams()
  // const isAdmin = userData?.role === ROLE.admin
  const renderTaskStatus = (status?: Task_Status) =>
    tasks.filter((task: IEditTask) => task.status === status)
  const [status, setStatus] = useState<Task_Status>()
  useEffect(() => {
    if (data?.data.status) {
      setStatus(data?.data.status)
    }
  }, [data])
  const statusHandler = (task: Task_Status) => {
    setStatus(task)
    setShowTask(true)
  }

  const handleChipClick = (index: number, adviser: string) => {
    setActiveChipIndex(index === activeChipIndex ? null : index)
    setSelectedChip(index === activeChipIndex ? '' : adviser)
    setShowAdviser(false)
  }

  const tasks = data?.data && Array.isArray(data.data) ? data.data : []

  const renderChips = () => {
    const uniqueAdvisers = Array.from(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new Set(tasks.map((task: any) => task.adviserName))
    )
    return uniqueAdvisers.map((adviserName, idx) => (
      <Chips
        key={idx}
        textClassName='text-xs'
        className={`h-10 w-[48%] cursor-pointer px-1 md:w-32 ${activeChipIndex === idx ? 'border border-neutral-400 bg-primary-600 text-neutral-50' : 'border border-primary-600 bg-neutral-100'}`}
        text={String(adviserName)}
        onClick={() => handleChipClick(idx, String(adviserName))}
      />
    ))
  }

  const renderTaskCards = (status?: string) =>
    tasks
      .filter(
        (task: IEditTask) =>
          (!selectedChip || task.adviserName === selectedChip) &&
          task.status === status
      )

      .map((task: IEditTask, idx: number) => {
        return (
          <TaskCard
            key={task.id}
            title={task.title}
            adviser={task.adviserName}
            count={idx + 1}
            onClick={() => {
              setSelectedTaskId(task.id)
              setShowTaskCardModal(true)
            }}
          />
        )
      })

  const toggleTaskModal = () => setShowTaskBoxModal(!showTaskBoxModal)
  const statusLabel = {
    TODO: 'انجام نشده',
    IN_PROGRESS: 'درحال انجام',
    COMPLETED: 'انجام شده',
  }
  useEffect(() => {
    if (!id) return
    setSelectedTaskId(id)
    setShowTaskCardModal(true)
  }, [id])

  if (isLoading) return <Loader />
  if (isError) {
    return (
      <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center text-white'>
        تسک یافت نشد
      </div>
    )
  }

  const toggleTaskCardModal = () => {
    setShowTaskCardModal(false)
    if (id) {
      navigate(PageUrls.main.tasks)
    }
  }

  return (
    <div
      className='relative flex h-screen w-full flex-col items-center justify-start gap-2 overflow-hidden pt-16 text-primary-600 backdrop-blur-2xl md:pt-16'
      dir='rtl'
    >
      <header className='flex w-[95%] items-center justify-start border-b max-md:flex-col md:h-20'>
        <Button
          onClick={toggleTaskModal}
          className='flex h-10 w-1/5 items-center justify-center gap-1 border border-neutral-500 bg-primary-600 max-md:w-full md:h-12'
        >
          <Plus size={24} />
          <p className='font-medium'> ساخت تسک جدید</p>
        </Button>

        <div className='flex w-full items-start justify-start max-md:flex-col md:w-5/6 md:items-center md:gap-2'>
          <p className='w-32 text-center text-sm font-semibold text-neutral-50 max-md:hidden'>
            انتخاب مشاور :
          </p>
          <Button
            onClick={() => setShowAdviser(true)}
            className='my-4 flex w-full items-start justify-center gap-1 border border-neutral-700 bg-neutral-200 py-2 md:hidden'
          >
            <User color='var(--primary-600)' size={16} />
            <p className='text-primary-600 md:w-32'>انتخاب مشاور</p>
          </Button>
          {selectedChip && (
            <div className='mb-2 flex h-8 w-1/3 items-center justify-center rounded-md border border-neutral-500 bg-primary-600 text-xs text-neutral-50 md:hidden'>
              {selectedChip}
            </div>
          )}
          <div className='no-scrollbar flex h-14 max-w-full flex-col flex-wrap items-center justify-center gap-2 overflow-x-auto max-md:hidden'>
            {renderChips()}
          </div>
          {showAdviser && (
            <div className='absolute left-0 top-0 flex h-full w-full flex-col items-center gap-2 bg-white pt-12 md:hidden'>
              <div className='flex h-14 w-[90%] items-center justify-between border-b border-neutral-400'>
                <p className='font-medium'>انتخاب مشاور</p>
                <button onClick={() => setShowAdviser(false)}>
                  <X size={20} color='var(--primary-600)' />
                </button>
              </div>
              <div className='flex w-[90%] flex-wrap items-start justify-start gap-2 md:justify-start'>
                {renderChips()}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className='flex w-full flex-col gap-4 px-2 pt-3 md:hidden'>
        {renderTaskStatus('TODO') && (
          <Button
            onClick={() => statusHandler('TODO')}
            className='flex h-10 w-full items-center justify-center gap-1 rounded-lg bg-neutral-500 text-xl font-medium text-neutral-50 hover:bg-neutral-600 hover:text-neutral-50 max-md:text-xs'
            dir='rtl'
            type='button'
          >
            <p>انجام نشده</p>
          </Button>
        )}
        {renderTaskStatus('IN_PROGRESS') && (
          <Button
            onClick={() => statusHandler('IN_PROGRESS')}
            className='flex h-10 w-full items-center justify-center gap-1 rounded-lg bg-secondary-700 text-xl font-medium text-neutral-50 hover:bg-secondary-600 hover:text-neutral-50 max-md:text-xs'
            dir='rtl'
            type='button'
          >
            <p>درحال انجام</p>
          </Button>
        )}
        {renderTaskStatus('COMPLETED') && (
          <Button
            onClick={() => statusHandler('COMPLETED')}
            className='flex h-10 w-full items-center justify-center gap-1 rounded-lg bg-success-800 text-xl font-medium text-neutral-50 hover:bg-success-600 hover:text-neutral-50 max-md:text-xs'
            dir='rtl'
            type='button'
          >
            <p>انجام شده</p>
          </Button>
        )}

        {showTask && (
          <div className='absolute left-0 top-0 flex h-full w-full items-start justify-start bg-white pt-16'>
            <div className='flex h-5/6 w-full flex-col px-4'>
              <div className='mb-2 flex h-16 w-full items-center justify-between border-b'>
                <p className='pr-1'>{status && statusLabel[status]}</p>
                <button onClick={() => setShowTask(false)}>
                  <MarkerLeft size={24} color='var(--primary-600)' />
                </button>
              </div>
              <div className='no-scrollbar flex w-full flex-wrap gap-2 overflow-y-scroll'>
                {renderTaskCards(status)}
              </div>
            </div>
          </div>
        )}
      </main>

      <section className='flex h-4/6 w-full items-center justify-around max-md:hidden'>
        <TaskBox
          className='bg-neutral-600'
          text='انجام نشده'
          onClick={toggleTaskModal}
        >
          <div className='no-scrollbar flex w-[93%] flex-wrap gap-2 overflow-y-auto pb-4'>
            {renderTaskCards('TODO')}
          </div>
        </TaskBox>
        <TaskBox
          className='bg-secondary-800'
          text='درحال انجام'
          onClick={toggleTaskModal}
        >
          <div className='no-scrollbar flex w-[93%] flex-wrap gap-2 overflow-y-auto pb-4'>
            {renderTaskCards('IN_PROGRESS')}
          </div>
        </TaskBox>
        <TaskBox
          className='bg-success-800'
          text='انجام شده'
          onClick={toggleTaskModal}
        >
          <div className='no-scrollbar flex w-[93%] flex-wrap gap-2 overflow-y-auto pb-4'>
            {renderTaskCards('COMPLETED')}
          </div>
        </TaskBox>
      </section>

      {/* TaskBox Modal */}
      <Modal
        showModal={showTaskBoxModal}
        setShowModal={setShowTaskBoxModal}
        className='z-50 flex h-screen w-full items-start justify-center p-5'
        ModalBgClassName='bg-black bg-opacity-40 z-50'
      >
        <div className='mt-12 h-[85%] w-full md:w-[440px]'>
          <TaskBoxModal onClose={toggleTaskModal} />
        </div>
      </Modal>

      {/* TaskCard Modal */}
      <Modal
        showModal={showTaskCardModal}
        setShowModal={setShowTaskCardModal}
        className='z-50 flex h-screen w-full items-start justify-center md:p-5'
        ModalBgClassName='bg-black bg-opacity-40 z-50'
      >
        <div className='h-full w-full max-md:bg-white max-md:pt-12 md:mt-[55px] md:h-[80%] md:w-3/4'>
          <TaskCardModal
            taskId={selectedTaskId}
            onClose={toggleTaskCardModal}
            taskStatus={
              tasks.find((task: IEditTask) => task.id === selectedTaskId)
                ?.status
            }
          />
        </div>
      </Modal>
    </div>
  )
}

export default Tasks
