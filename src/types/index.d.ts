import { ButtonHTMLAttributes, ReactNode } from 'react'

import { USER_BADGE } from '@/constants'
export interface CheckboxProps {
  label?: string
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  value?: string
  checked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}
export interface ChipsProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>
  icon?: ReactNode
  textClassName?: string
  text?: string
  dir?: 'ltr' | 'rtl'
  className?: string
}
export type RadioButtonProps = {
  label: string
  color?: string
  dir?: 'ltr' | 'rtl'
  className?: string
  value?: string
  disabled?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  size?: 'small' | 'medium' | 'large'
}
export type Slider = {
  image?: string
  Title?: string
  description?: string
  mortgage?: string
  rent?: string
}
export type Cards = {
  image?: string
  Title?: string
  description?: string
  mortgage?: string
  rent?: string
  id: number
}

export interface DropdownOption {
  value: string
}

export interface DropdownProps {
  label: string
  secondLabel?: string
  inputDefaultValue: string
  options: DropdownOption[]
  onChange: (selectedValue: string) => void
  disabled?: boolean
  ButtonClassName?: string
  OpenBoxClassName?: string
  SearchInputClassName?: string
  searchable?: boolean
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  className?: string
  variant?: 'contained' | 'outlined'
  color?: 'primary' | 'secondary'
  size?: 'sm' | 'lg'
  loading?: boolean
}

export type CommentProps = {
  id?: number
  date?: string
  name?: string
  comment?: string
  likeCount: number
  replyCount: number
  src: string
  badge?: (typeof USER_BADGE)[keyof typeof USER_BADGE]
}
export interface UserScoreProps {
  commentsNumber: number
  likesNumber: number
  picsNumber: number
  title: string
  description: string
  badge: string
  counter: number
}

export interface UserScoreMedalProps {
  badge: 'bronze' | 'silver' | 'gold'
}

export interface UserInfoProps {
  userImg: string
  userName: string
  phone: string
  email: string
}

export interface RecommendationIcon {
  id: number
  img: string
  title: string
}

export interface Activity {
  id: number
  title: string
}

export interface UserCommentProps {
  selectedButton: string
  setSelectedButton: React.Dispatch<React.SetStateAction<string>>
  selectedRecommendation: string
  setSelectedRecommendation: React.Dispatch<React.SetStateAction<string>>
}

export interface IconProps {
  size?: number
  color?: string
  className?: string
}

export interface ResponseType<T> {
  data: T
  statusCode: number
  message: string
}

export interface ResponseWithPaginationType<T> {
  data: T
  statusCode: number
  message: string
  page: number
  totalFiles: number
  totalPages: number
}

export interface UseBaseQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> extends ContextOptions,
    QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UseQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> extends UseBaseQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryFnData,
    TQueryKey
  > {}

export type HookApiListOptions<T> =
  | Omit<
      UseQueryOptions<
        InfiniteResponseType<T>,
        Error,
        InfiniteResponseType<T>,
        QueryKey
      >
    >
  | undefined

export type HookApiOptions<T> =
  | Omit<
      UseQueryOptions<ResponseType<T>, Error, ResponseType<T>, QueryKey>,
      'queryKey'
    >
  | undefined

export type UseQueryResult<
  TData = unknown,
  TError = unknown,
> = UseBaseQueryResult<TData, TError>
