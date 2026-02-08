/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Control, FieldErrors, FieldValues } from 'react-hook-form'

export interface IFormContainer {
  errors?: FieldErrors
  children: React.ReactNode
  data?: any
  setData?: (name: any, value: any) => void
}

export interface FieldsProps {
  errors: FieldErrors<FieldValues>

  control: Control<FieldValues, any>
}

export type TGridProps = {
  colSpan?: string // Use Tailwind's col-span classes (e.g., 'col-span-12', 'md:col-span-6')
  flexBasis?: string
}

export interface IInput {
  type: string
  name: string
  label?: string | JSX.Element
  placeholder?: string
  gridProps?: TGridProps
  rules?: any
  customView?: React.ReactNode
  className?: string
  control?: any
  defaultValue?: any
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  valueKey?: string | boolean
  labelKey?: string | boolean
  options?: any[]
  noInputArrow?: boolean
  multiline?: boolean
  readOnly?: boolean
  visible?: boolean
  isLtr?: boolean
  formatType?: ('year' | 'month' | 'day')[]
  helperText?: string | React.ReactNode
  maxRows?: number
  minRows?: number
  labelClassName?: string
  addCommas?: boolean
}

export interface IFormInputs {
  inputs: IInput[]
  children?: React.ReactNode
  gridProps?: TGridProps
  spacing?: number
  showDotsInLabel?: boolean
  className?: string
  boxClassName?: string
  control?: any
  showDeleteIcon?: boolean // New prop
  handleDelete?: (name: string) => void // New prop
  labelClassName?: string
}

export interface IRenderInputs {
  input: IInput
  className?: string
  gridProps?: TGridProps
  showDotsInLabel?: boolean
  showDeleteIcon?: boolean // New prop
  handleDelete?: (name: string) => void // New prop
}

export interface PropsInput {
  input: IInput
}

export type FormsType = {
  name: string
  type: string
  label: string
  inputId?: string
  isRequire: boolean
  placeholder: string
}

export type SectionData = {
  SectionTitle: string
  forms: FormsType[]
}

export interface IFormData {
  id: number
  section: SectionData[]
}

export interface AddFormRequest {
  sections: SectionData[]
}

export interface NotificationItem {
  content: string
  taskId: number
  title: string
}

export interface INotification {
  id: number
  notifications: NotificationItem[]
  unreadCount: number
  userId: number
}
