/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { ResponseType } from '@/types'
import { IUser } from '@/types/User'

export const useCreateUser = () => {
  return useMutation<ResponseType<IUser>, Error, IUser, any>(
    (body: IUser): Promise<ResponseType<IUser>> => {
      return fetcher.post(API_URL.Setting.addUsers, { ...body })
    }
  )
}
export const useEditUser = () => {
  return useMutation<ResponseType<IUser>, Error, IUser, any>(
    (body: IUser): Promise<ResponseType<IUser>> => {
      return fetcher.put(API_URL.Setting.editUsers, { ...body })
    }
  )
}
export const useDeleteUser = () => {
  return useMutation<ResponseType<object>, Error, any, any>(
    (id: number | string): Promise<ResponseType<IUser>> => {
      return fetcher.delete(`${API_URL.Setting.deleteUsers}/${id}`)
    }
  )
}
