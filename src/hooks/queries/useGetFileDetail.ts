import { useQuery } from '@tanstack/react-query'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { QueryKeys } from '@/constants/keys'
import { HookApiOptions, ResponseType } from '@/types'
import { FileData } from '@/types/Files'
import { renderQueryKey } from '@/utils'

export const useGetFileDetail = (
  id?: string,
  options?: HookApiOptions<FileData>
) => {
  const fileData = useQuery<ResponseType<FileData>, Error>({
    queryKey: renderQueryKey([QueryKeys.Files.files, id]),
    queryFn: () => fetcher.get(`${API_URL.Files.files}/${id}`),
    staleTime: Infinity,
    ...options,
  })

  return { ...fileData }
}
