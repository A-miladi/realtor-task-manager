// ThemeProvider.tsx
import { UseQueryResult } from '@tanstack/react-query'
import { ReactNode, Suspense, useEffect, useState } from 'react'

import LoadingScreen from '@/components/ui/LoadingScreen'
import { useSettingInfo } from '@/hooks/queries/useSettingInfo'
import { ResponseType } from '@/types'
import { ColorShades, ISetting, ThemeColors } from '@/types/Setting'

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeColors, setThemeColors] = useState<ThemeColors | undefined>()

  const {
    data: settings,
    isLoading,
    isFetching,
  }: UseQueryResult<ResponseType<ISetting>, Error> = useSettingInfo({})

  // Update theme colors based on fetched settings
  useEffect(() => {
    if (settings?.data.colors) {
      setThemeColors(settings.data.colors)
    }
  }, [settings])

  // Apply theme colors to the document
  useEffect(() => {
    if (themeColors) {
      Object.keys(themeColors).forEach((colorCategory) => {
        const shades = themeColors[colorCategory as keyof ThemeColors]
        Object.keys(shades).forEach((shade) => {
          const shadeKey = shade as unknown as keyof ColorShades
          document.documentElement.style.setProperty(
            `--${colorCategory}-${shadeKey}`,
            shades[shadeKey]
          )
        })
      })
    }
  }, [themeColors])

  if (isLoading || isFetching) return <LoadingScreen />

  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
}

export default ThemeProvider
