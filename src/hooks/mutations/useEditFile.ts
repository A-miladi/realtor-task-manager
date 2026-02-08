import { useMutation } from '@tanstack/react-query'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { ResponseType } from '@/types'
import { AddFileResponse, EditFileRequest } from '@/types/Files'

export const useEditFile = () => {
  return useMutation<
    ResponseType<AddFileResponse>,
    Error,
    EditFileRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >((editFileForm: EditFileRequest): Promise<ResponseType<AddFileResponse>> => {
    return fetcher.put(`${API_URL.Files.files}/${editFileForm.id}`, {
      ...editFileForm.body,
    })
  })
}
