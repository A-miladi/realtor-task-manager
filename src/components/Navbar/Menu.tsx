import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'

import { MEDIA_URL } from '@/api'
import { QueryKeys } from '@/constants/keys'
import { PageUrls } from '@/constants/pageUrls'
import { ROLE } from '@/constants/role'
import { useSeenNotification } from '@/hooks/mutations/useNotification'
import { useGetNotification } from '@/hooks/queries/useGetNotification'
import useOutsideClick from '@/hooks/useOutSideClick'
import { UseSettingStore } from '@/store/setting'
import { UseUserStore } from '@/store/user'
import { INotification } from '@/types/Forms'

import Alert from '../icons/Alert'
import Exit from '../icons/Exit'
import Key from '../icons/Key'
import Notification from '../Notification'
import Misan from '../icons/Misan'

export function Menu() {
  const ref = useRef(null)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutateAsync } = useSeenNotification()
  useOutsideClick(ref, () => {
    if (isNotification) setIsNotification(false)
  })
  const [settings] = UseSettingStore(useShallow((state) => [state.setting]))
  const [userData] = UseUserStore(useShallow((state) => [state.user]))
  const [isNotification, setIsNotification] = useState(false)
  const isAdmin = userData?.role === ROLE.admin
  const { data } = useGetNotification()
  const [notificationsData, setNotificationsData] = useState<INotification>()

  const handleLogout = () => {
    localStorage.clear()
    navigate(PageUrls.Authentication.auth)
  }
  useEffect(() => {
    if (data) {
      setNotificationsData(data[0])
    }
  }, [data])

  const handleSeenNotifications = async () => {
    try {
      if (notificationsData?.unreadCount) {
        await mutateAsync({})
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.Notifications.notification],
        })
      }
    } catch (error) {
      return error
    }
  }

  return (
    <div className='fixed top-0 z-20 flex h-12 w-full items-center justify-between rounded-b-2xl border-b-2 bg-white bg-opacity-40 px-5 py-3 shadow-xl backdrop-blur-md md:h-14 md:py-4'>
      <div className='rtl flex gap-6 md:gap-4'>
        <div
          onClick={handleLogout}
          className='flex cursor-pointer items-center justify-center gap-1'
        >
          <p className='hidden cursor-pointer font-semibold text-neutral-900 md:flex md:text-sm'>
            خروج
          </p>
          <Exit color='var(--neutral-900)' />
        </div>

        {isAdmin ? (
          <Link
            to={PageUrls.Admin.adviser}
            className='flex cursor-pointer items-center justify-center gap-1'
          >
            <p className='hidden font-semibold text-neutral-900 md:flex md:text-sm'>
              ورود به پنل ادمین
            </p>
            <Key color='var(--neutral-900)' />
          </Link>
        ) : null}
        <div
          onClick={() => {
            setIsNotification(true)
            handleSeenNotifications()
          }}
          className='relative flex cursor-pointer items-center justify-center gap-1 bg-transparent'
        >
          <p className='hidden font-semibold text-neutral-900 md:flex md:text-sm'>
            اعلان‌ها
          </p>
          <div className='relative'>
            {notificationsData && notificationsData?.unreadCount > 0 ? (
              <div className='absolute bottom-2 left-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white'>
                <p className='mt-auto'>{notificationsData?.unreadCount}</p>
              </div>
            ) : null}
            <Alert color='var(--neutral-900)' />
          </div>
        </div>
        <div ref={ref} className=''>
          {isNotification && (
            <Notification onClose={() => setIsNotification(false)} />
          )}
        </div>
      </div>
      <div>
        <div className='flex h-full w-full items-center gap-1'>
          <p className='text-xs font-semibold'>{settings?.appName}</p>
          {settings?.logo.includes('/uploader') ? (
            <img
              className='h-6 w-6 object-cover md:h-8 md:w-8'
              src={`${MEDIA_URL}${settings.logo}`}
              alt=''
            />
          ) : (
            <Misan size={24} />
          )}
        </div>
      </div>
    </div>
  )
}
