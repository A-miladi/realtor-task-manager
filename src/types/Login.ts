import { Role } from './User'

export type LoginType = 'email' | 'otp'

export interface LoginRequest {
  phone?: number | string
  email?: number | string
  type: LoginType
}

export interface LoginResponse {
  message: string
}

export interface VerifyOtpRequest extends LoginRequest {
  phone?: number | string
  email?: number | string
  code: string
}

export interface VerifyOtpResponse {
  message: string
  token: string
  role: Role
  phone: string
  email: string
  fullname: string
}
