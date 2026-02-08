import { useQuery } from '@tanstack/react-query'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { QueryKeys } from '@/constants/keys'
import { HookApiOptions, ResponseType } from '@/types'
import { IEditTask, ITask } from '@/types/Task'
import { renderQueryKey } from '@/utils'

export const useGetAllTask = () => {
  const taskData = useQuery<ResponseType<ITask[]>, Error>({
    queryKey: renderQueryKey([QueryKeys.Tasks.tasks]),
    queryFn: () => fetcher.get(API_URL.Task.task),
    staleTime: Infinity,
  })

  return { ...taskData }
}

export const useGetTaskById = (
  id?: number | string,
  options?: HookApiOptions<IEditTask>
) => {
  const TaskDataById = useQuery<ResponseType<IEditTask>, Error>({
    queryKey: renderQueryKey([QueryKeys.Tasks.taskId, id]),
    queryFn: () => fetcher.get(`${API_URL.Task.task}/${id}`),
    staleTime: Infinity,
    ...options,
  })

  return { ...TaskDataById }
}
