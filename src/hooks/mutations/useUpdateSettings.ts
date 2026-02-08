import { useMutation } from '@tanstack/react-query'

import { fetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { ResponseType } from '@/types'
import { ISetting } from '@/types/Setting'

export const useUpdateSettings = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<ResponseType<ISetting>, Error, ISetting, any>(
    (body: ISetting): Promise<ResponseType<ISetting>> => {
      return fetcher.put(API_URL.Setting.settingAdd, { ...body })
    }
  )
}
