import { useMutation } from '@tanstack/react-query'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { ResponseType } from '@/types'
import { FileUploaderRequest } from '@/types/Files'

export const useAddFileImageMutation = () => {
  return useMutation<
    ResponseType<object>,
    Error,
    FileUploaderRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >((body: FileUploaderRequest): Promise<ResponseType<object>> => {
    const formData = new FormData()
    if (Array.isArray(body.file)) {
      body.file.forEach((file, index) => {
        formData.append(`file${index}`, file)
      })
    } else {
      formData.append('file', body.file)
    }

    return fetcher.post(`${API_URL.uploader.image}/${body.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  })
}
