import { ISetting } from '@/types/Setting'

export const applyDynamicColors = (setting: ISetting) => {
  if (!setting || !setting.colors) return

  // Set CSS variables for colors
  document.documentElement.style.setProperty(
    '--bg-primary-600',
    setting.colors.primary[600]
  )
  document.documentElement.style.setProperty(
    '--color-secondary',
    setting.colors.secondary[500]
  )
  document.documentElement.style.setProperty(
    '--color-warning',
    setting.colors.warning[500]
  )
  document.documentElement.style.setProperty(
    '--color-error',
    setting.colors.error[500]
  )
  document.documentElement.style.setProperty(
    '--color-success',
    setting.colors.success[500]
  )
  document.documentElement.style.setProperty(
    '--color-neutral',
    setting.colors.neutral[900]
  )
}
