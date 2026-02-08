/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

import { MyToast } from '@/components/ui/Toast/MyToast'
import { PageUrls } from '@/constants/pageUrls'
import { AMLAK_TOKEN } from '@/constants/sessionLocalStorage'

export const MEDIA_URL = 'https://misan-amlak-api.liara.run/'

// api config **WITHOUT** token
export const AxiosInstance = axios.create({
  baseURL: 'https://misan-amlak-api.liara.run/v1',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// api config **WITH** token
export const AxiosInstanceWithToken = axios.create({
  baseURL: 'https://misan-amlak-api.liara.run/v1',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem(AMLAK_TOKEN)}`,
  },
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const onError = (
  error: Error & {
    response: {
      data: { errors: any; message: string }
      statusCode: number
    }
  }
) => {
  const e = error
  const msg = e.response.data.message

  MyToast('error', msg ?? 'خطا  ')
  if (e.response.statusCode === 401 || e.response.statusCode === 404) {
    window.location.href = PageUrls.Authentication.auth
    localStorage.clear()
  }

  throw error
}

// for server api (ssr, ...)
const serverFetcher = {
  get: <T>(url: string, configs?: AxiosRequestConfig<any> | undefined) =>
    AxiosInstance.get<T>(url, configs).then(responseBody),
}

// without token (for auth)
const normalFetcher = {
  get: <T>(url: string, configs?: AxiosRequestConfig<any> | undefined) =>
    AxiosInstance.get<T>(url, configs)
      .then(responseBody)
      .catch((e) => onError(e)),
  post: <T>(
    url: string,
    body: {},
    configs?: AxiosRequestConfig<any> | undefined
  ) => {
    return AxiosInstance.post<T>(url, body, configs)
      .then(responseBody)
      .catch((e) => onError(e))
  },
  put: <T>(
    url: string,
    body: {},
    configs?: AxiosRequestConfig<any> | undefined
  ) =>
    AxiosInstance.put<T>(url, body, configs)
      .then(responseBody)
      .catch((e) => onError(e)),
  patch: <T>(
    url: string,
    body: {},
    configs?: AxiosRequestConfig<any> | undefined
  ) =>
    AxiosInstance.patch<T>(url, body, configs)
      .then(responseBody)
      .catch((e) => onError(e)),
  delete: <T>(url: string, configs?: AxiosRequestConfig<any> | undefined) =>
    AxiosInstance.delete<T>(url, configs)
      .then(responseBody)
      .catch((e) => onError(e)),
}

const AuthorizationConfig = () => {
  const token = localStorage.getItem(AMLAK_TOKEN)

  AxiosInstanceWithToken.defaults.headers.Authorization = `Bearer ${token}`
}

// with token
const fetcher = {
  get: <T>(url: string, configs?: AxiosRequestConfig<any> | undefined) => {
    AuthorizationConfig()
    return AxiosInstanceWithToken.get<T>(url, configs)
      .then(responseBody)
      .catch((e) => onError(e))
  },
  post: <T>(
    url: string,
    body: {},
    configs?: AxiosRequestConfig<any> | undefined
  ) => {
    AuthorizationConfig()
    return AxiosInstanceWithToken.post<T>(url, body, configs)
      .then(responseBody)
      .catch((e) => onError(e))
  },
  put: <T>(
    url: string,
    body: {},
    configs?: AxiosRequestConfig<any> | undefined
  ) => {
    AuthorizationConfig()
    return AxiosInstanceWithToken.put<T>(url, body, configs)
      .then(responseBody)
      .catch((e) => onError(e))
  },
  patch: <T>(
    url: string,
    body: {},
    configs?: AxiosRequestConfig<any> | undefined
  ) => {
    AuthorizationConfig()

    return AxiosInstanceWithToken.patch<T>(url, body, configs)
      .then(responseBody)
      .catch((e) => onError(e))
  },
  delete: <T>(url: string, configs?: AxiosRequestConfig<any> | undefined) => {
    AuthorizationConfig()
    return AxiosInstanceWithToken.delete<T>(url, configs)
      .then(responseBody)
      .catch((e) => onError(e))
  },
}

export { fetcher, normalFetcher, serverFetcher }
