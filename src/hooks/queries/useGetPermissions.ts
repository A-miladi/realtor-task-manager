import { useQuery } from '@tanstack/react-query'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { QueryKeys } from '@/constants/keys'
import { HookApiOptions, ResponseType } from '@/types'
import { PermissionsData } from '@/types/Files'
import { renderQueryKey } from '@/utils'

export const useGetPermissions = (
  options?: HookApiOptions<PermissionsData[]>
  //   filters?: Filters
) => {
  //   const queryParams = filteringMethod(filters)
  const filesData = useQuery<ResponseType<PermissionsData[]>, Error>({
    queryKey: renderQueryKey([QueryKeys.Permissions.permissions]),
    queryFn: () => fetcher.get(`${API_URL.Permissions.permissions}`),
    staleTime: Infinity,
    ...options,
  })

  return { ...filesData }
}
