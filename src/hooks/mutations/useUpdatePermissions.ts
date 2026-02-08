import { useMutation } from '@tanstack/react-query'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { ResponseType } from '@/types'
import { PermissionsData } from '@/types/Files'

export const useUpdatePermissions = () => {
  return useMutation<
    ResponseType<PermissionsData>,
    Error,
    PermissionsData,
    any
  >((body: PermissionsData): Promise<ResponseType<PermissionsData>> => {
    return fetcher.put(`${API_URL.Permissions.update}`, {
      ...body,
    })
  })
}
