import { useMutation } from '@tanstack/react-query'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { ResponseType } from '@/types'
import { DeleteFileImageRequest, DeleteFileVideoRequest } from '@/types/Files'

export const useDeleteFileImageMutation = () => {
  return useMutation<
    ResponseType<object>,
    Error,
    DeleteFileImageRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >((body: DeleteFileImageRequest): Promise<ResponseType<object>> => {
    return fetcher.delete(`${API_URL.uploader.image}/${body.id}`, {
      data: {
        images: body.images,
      },
    })
  })
}

export const useDeleteFileVideoMutation = () => {
  return useMutation<
    ResponseType<object>,
    Error,
    DeleteFileVideoRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >((body: DeleteFileVideoRequest): Promise<ResponseType<object>> => {
    return fetcher.delete(`${API_URL.uploader.video}/${body.id}`, {
      data: {
        videos: body.videos,
      },
    })
  })
}
