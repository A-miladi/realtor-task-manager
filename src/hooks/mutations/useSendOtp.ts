import { useMutation } from '@tanstack/react-query'

import { normalFetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { ResponseType } from '@/types'
import { LoginRequest, LoginResponse } from '@/types/Login'

export const useSendOtp = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<ResponseType<LoginResponse>, Error, LoginRequest, any>(
    (body: LoginRequest): Promise<ResponseType<LoginResponse>> => {
      return normalFetcher.post(API_URL.Auth.SendOtp, { ...body })
    }
  )
}
