/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { IInput } from '@/types/Forms'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const renderQueryKey = (queryKeys: any[]): any[] => {
  const newQueryKeys: any[] = queryKeys

  queryKeys.forEach((item, i) => {
    if (
      !item ||
      item === '' ||
      (typeof item === 'object' && Object.keys(item).length === 0)
    ) {
      newQueryKeys.splice(i, 1)
    }
  })

  return newQueryKeys
}

export const filteringMethod = (filterItems: any) => {
  if (!filterItems) {
    return ''
  }
  let queryParams = ''
  const hasLength = Object.keys(filterItems).length !== 0
  // if empty
  if (!hasLength) {
    return ''
  }
  if (hasLength) {
    queryParams += '?'
  }

  Object.keys(filterItems).forEach((item, i) => {
    if (!filterItems[item]) {
      return
    }
    if (i !== 0) {
      queryParams += '&'
    }

    queryParams = `${queryParams + item}=${filterItems[item]}`
  })

  return queryParams === '?' ? '' : queryParams
}

// render select options for given array
export const renderSelectOptions = (options: any[], isBooleanMode = false) => {
  if (!options || options.length === 0) {
    return []
  }
  return options.map((option) => ({
    id: isBooleanMode ? option.optionId : option.optionId.toString(),
    title: option.label,
  }))
}

// Function to transform backend form data to IInput array
export const transformFormDataToInputs = (
  formData: any[],
  control: any,
  allOptional: boolean = false
): IInput[] => {
  return formData.map((field) => {
    const input: IInput = {
      type: field.type,
      name: field.inputId ? field.inputId : field.name,
      control: control,
      label: field.label,
      rules: allOptional
        ? {}
        : field.isRequire
          ? { required: 'این فیلد الزامی است' }
          : {},
      placeholder: field.placeholder || '',
    }

    // Handle special cases for 'select' and 'radio' types
    if (field.type === 'radio' || field.type === 'select') {
      input.options = renderSelectOptions(field.Options || [])
      input.valueKey = 'optionId'
      input.labelKey = 'label'
    }

    return input
  })
}

export const generateRandomId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}
