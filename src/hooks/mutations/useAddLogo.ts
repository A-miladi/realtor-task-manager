import { useMutation } from '@tanstack/react-query'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { ResponseType } from '@/types'
import { LogoUploaderRequest } from '@/types/Files'

export const useAddLogoImageMutation = () => {
  return useMutation<
    ResponseType<object>,
    Error,
    LogoUploaderRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >((body: LogoUploaderRequest): Promise<ResponseType<object>> => {
    const formData = new FormData()
    if (body.file) {
      if (Array.isArray(body.file)) {
        body.file.forEach((file, index) => {
          formData.append(`file${index}`, file)
        })
      } else {
        formData.append('file', body.file)
      }
    }

    return fetcher.post(`${API_URL.uploader.logo}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  })
}
