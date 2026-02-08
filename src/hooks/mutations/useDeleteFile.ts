/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { ResponseType } from '@/types'

export const useDeleteFile = () => {
  return useMutation<ResponseType<object>, Error, any, any>(
    (id: number | string): Promise<ResponseType<object>> => {
      return fetcher.delete(`${API_URL.Files.files}/${id}`)
    }
  )
}
