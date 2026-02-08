import { useMutation } from '@tanstack/react-query'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { ResponseType } from '@/types'
import { AddFormRequest } from '@/types/Forms'

export const useAddForm = () => {
  return useMutation<
    ResponseType<[]>,
    Error,
    AddFormRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >((body: AddFormRequest): Promise<ResponseType<[]>> => {
    return fetcher.post(API_URL.Forms.make_form, { ...body })
  })
}
