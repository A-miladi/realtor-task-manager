/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { ResponseType } from '@/types'
import {
  DeleteCommentRequest,
  EditTaskRequest,
  IComment,
  IEditTask,
} from '@/types/Task'

export const useTaskComment = () => {
  return useMutation<ResponseType<IComment>, Error, IComment, any>(
    (body: IComment): Promise<ResponseType<IComment>> => {
      return fetcher.patch(API_URL.Task.commentTask, { ...body })
    }
  )
}
export const useDeleteComment = () => {
  return useMutation<ResponseType<IComment>, Error, any, any>(
    (body: DeleteCommentRequest): Promise<ResponseType<IComment>> => {
      return fetcher.delete(
        `${API_URL.Task.deleteTask}/${body.taskId}/${body.id}`
      )
    }
  )
}
export const useEditTask = () => {
  return useMutation<ResponseType<object>, Error, EditTaskRequest>(
    (body: EditTaskRequest): Promise<ResponseType<object>> => {
      return fetcher.put(API_URL.Task.editTask, { ...body })
    }
  )
}
export const useDeleteTask = () => {
  return useMutation<ResponseType<object>, Error, any, any>(
    (id: number | string): Promise<ResponseType<IEditTask>> => {
      return fetcher.delete(`${API_URL.Task.task}/${id}`)
    }
  )
}
