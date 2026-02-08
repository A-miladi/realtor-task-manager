import { useMutation } from '@tanstack/react-query'
import { useShallow } from 'zustand/react/shallow'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { UseUserStore } from '@/store/user'
import { ResponseType } from '@/types'
import { INotification } from '@/types/Forms'

export const useSeenNotification = () => {
  const [userData] = UseUserStore(useShallow((state) => [state.user]))
  return useMutation<ResponseType<INotification>, Error, unknown, unknown>(
    (): Promise<ResponseType<INotification>> => {
      return fetcher.post(
        `${API_URL.Notification.PostNotification}/${userData?.id}`,
        {}
      )
    }
  )
}
