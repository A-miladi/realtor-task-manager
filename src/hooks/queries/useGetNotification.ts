import { useQuery } from '@tanstack/react-query'
import { useShallow } from 'zustand/react/shallow'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { QueryKeys } from '@/constants/keys'
import { UseUserStore } from '@/store/user'
import { HookApiOptions, ResponseType } from '@/types'
import { INotification } from '@/types/Forms'
import { renderQueryKey } from '@/utils'

export const useGetNotification = (
  options?: HookApiOptions<INotification[]>
) => {
  const [user] = UseUserStore(useShallow((state) => [state.user]))
  const NotificationData = useQuery<ResponseType<INotification[] | []>, Error>({
    queryKey: renderQueryKey([QueryKeys.Notifications.notification, user?.id]),
    queryFn: () =>
      fetcher.get(`${API_URL.Notification.Notifications}/${user?.id}`),
    staleTime: Infinity,
    enabled: !!user?.id,
    ...options,
  })

  return { ...NotificationData?.data }
}
