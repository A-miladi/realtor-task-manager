import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { PageUrls } from '@/constants/pageUrls'
import { useGetNotification } from '@/hooks/queries/useGetNotification'
import { NotificationItem } from '@/types/Forms'

import ArrowLeft from '../icons/Arrow-left'
import X from '../icons/X'
import Button from '../ui/Button'
import Chips from '../ui/Chips'
interface Notification {
  onClose?: () => void
}
const Notification: FC<Notification> = ({ onClose }) => {
  const { data } = useGetNotification()
  const navigate = useNavigate()

  return (
    <div className='absolute left-0 top-0 -z-10 flex w-full flex-col gap-4 border border-primary-600 bg-white p-4 shadow-xl max-md:h-screen max-md:pt-10 md:left-28 md:top-12 md:z-50 md:min-h-16 md:w-1/4 md:items-center md:justify-center md:rounded-lg md:border md:bg-neutral-50'>
      <div className='flex h-12 w-full items-center justify-between border-b border-primary-600 text-primary-600 max-md:pb-2'>
        <Button onClick={onClose} className='bg-transparent p-0'>
          <X size={25} />
        </Button>
        اعلان ها
      </div>
      <div className='no-scrollbar flex w-full flex-wrap gap-2 overflow-y-auto md:max-h-48'>
        {data
          ? data[0]?.notifications?.map((i: NotificationItem, idx: number) => (
              <Chips
                onClick={() => {
                  onClose?.()
                  navigate(`${PageUrls.main.tasks}/${i.taskId}`)
                }}
                key={idx}
                className='h-10 w-full cursor-pointer justify-between rounded bg-primary-600 max-md:pr-4'
                icon={<ArrowLeft color='var(--neutral-50)' size={22} />}
                text={i.title}
                textClassName='text-xs text-neutral-100'
              />
            ))
          : null}
      </div>
    </div>
  )
}

export default Notification
