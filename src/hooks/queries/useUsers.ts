import { useQuery } from '@tanstack/react-query'
import { useShallow } from 'zustand/react/shallow'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { QueryKeys } from '@/constants/keys'
import { UseAllUsersStore } from '@/store/allUsers'
import { HookApiOptions, ResponseType } from '@/types'
import { IUser } from '@/types/User'
import { renderQueryKey } from '@/utils'

export const useUsers = (options?: HookApiOptions<IUser[]>) => {
  const [setUsers] = UseAllUsersStore(useShallow((state) => [state.setUsers]))

  const usersInfo = useQuery<ResponseType<IUser[]>, Error>({
    queryKey: renderQueryKey([QueryKeys.User.user]),
    queryFn: () => fetcher.get(API_URL.Setting.users),
    staleTime: Infinity,
    ...options,
  })

  if (usersInfo.isSuccess) {
    const usersData = usersInfo.data
    setUsers(usersData.data)
  }
  return { ...usersInfo }
}
