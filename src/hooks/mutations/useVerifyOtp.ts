import { useMutation } from '@tanstack/react-query'

import { normalFetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { ResponseType } from '@/types'
import { VerifyOtpRequest, VerifyOtpResponse } from '@/types/Login'

export const useVerifyPhoneOtp = () => {
  return useMutation<
    ResponseType<VerifyOtpResponse[]>,
    Error,
    VerifyOtpRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >((body: VerifyOtpRequest): Promise<ResponseType<VerifyOtpResponse[]>> => {
    return normalFetcher.post(API_URL.Auth.VerifyPhoneOTP, { ...body })
  })
}

export const useVerifyEmailOtp = () => {
  return useMutation<
    ResponseType<VerifyOtpResponse[]>,
    Error,
    VerifyOtpRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >((body: VerifyOtpRequest): Promise<ResponseType<VerifyOtpResponse[]>> => {
    return normalFetcher.post(API_URL.Auth.VerifyEmailOTP, { ...body })
  })
}
