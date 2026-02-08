import { useQuery } from '@tanstack/react-query'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { QueryKeys } from '@/constants/keys'
import { ResponseWithPaginationType } from '@/types'
import { FileData } from '@/types/Files'
import { filteringMethod, renderQueryKey } from '@/utils'

export interface Filters {
  page: number
  limit: number
  adviserName?: string
  MinArea?: number
  MaxArea?: number
  MinPrice?: number
  MaxPrice?: number
  street?: string
  alley?: string
  region?: string
  usage?: string
  propertyType?: string
  dealType?: string
  minRentPrice?: number
  maxRentPrice?: number
  minMortgagePrice?: number
  maxMortgagePrice?: number
}

export const useGetAllFiles = (
  // options?: HookApiOptions<FileData[]>,
  filters?: Filters
) => {
  const queryParams = filteringMethod(filters)

  const filesData = useQuery<ResponseWithPaginationType<FileData[]>, Error>({
    queryKey: renderQueryKey([QueryKeys.Files.files, filters]),
    queryFn: () => fetcher.get(`${API_URL.Files.files}${queryParams}`),
    staleTime: Infinity,
  })

  return { ...filesData }
}
