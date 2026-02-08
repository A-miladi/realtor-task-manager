import { useMutation } from '@tanstack/react-query'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { ResponseType } from '@/types'
import { ITask } from '@/types/Task'

export const useAddTask = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<ResponseType<[]>, Error, ITask, any>(
    (body: ITask): Promise<ResponseType<[]>> => {
      return fetcher.post(API_URL.Task.addTask, { ...body })
    }
  )
}
