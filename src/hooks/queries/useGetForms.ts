import { useQuery } from '@tanstack/react-query'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { QueryKeys } from '@/constants/keys'
import { HookApiOptions, ResponseType } from '@/types'
import { IFormData } from '@/types/Forms'
import { renderQueryKey } from '@/utils'

export const useGetForms = (options?: HookApiOptions<IFormData[]>) => {
  const formsData = useQuery<ResponseType<IFormData[]>, Error>({
    queryKey: renderQueryKey([QueryKeys.Forms.forms]),
    queryFn: () => fetcher.get(API_URL.Forms.forms),
    staleTime: Infinity,
    ...options,
  })

  return { ...formsData }
}
