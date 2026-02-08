import { useMutation } from '@tanstack/react-query'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { ResponseType } from '@/types'
import { AddFileRequest, AddFileResponse } from '@/types/Files'

export const useAddFile = () => {
  return useMutation<
    ResponseType<AddFileResponse>,
    Error,
    AddFileRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >((body: AddFileRequest): Promise<ResponseType<AddFileResponse>> => {
    return fetcher.post(API_URL.Files.add, { ...body })
  })
}
