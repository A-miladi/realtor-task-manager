import { useQuery } from '@tanstack/react-query'
import { useShallow } from 'zustand/react/shallow'

import { normalFetcher } from '@/api'
import { API_URL } from '@/constants/api'
import { QueryKeys } from '@/constants/keys'
import { UseSettingStore } from '@/store/setting'
import { HookApiOptions, ResponseType } from '@/types'
import { ISetting } from '@/types/Setting'
import { renderQueryKey } from '@/utils'

export const useSettingInfo = (options?: HookApiOptions<ISetting>) => {
  const [setSetting] = UseSettingStore(
    useShallow((state) => [state.setSetting])
  )

  const settingInfo = useQuery<ResponseType<ISetting>, Error>({
    queryKey: renderQueryKey([QueryKeys.Setting.setting]),
    queryFn: () => normalFetcher.get(API_URL.Setting.setting),
    staleTime: Infinity,
    ...options,
  })

  if (settingInfo.isSuccess) {
    const setting = settingInfo.data
    setSetting(setting.data)
  }

  return { ...settingInfo }
}
