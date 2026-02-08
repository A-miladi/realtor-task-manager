import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { SETTING_INFO } from '@/constants/sessionLocalStorage'
import { ISetting } from '@/types/Setting'

interface SettingState {
  setting: ISetting | null
}

interface Actions {
  setSetting: (setting: ISetting | null) => void
  reset: () => void
}

const initialState: SettingState = {
  setting: null,
}

export const UseSettingStore = create<SettingState & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,

      setSetting: (setting: ISetting | null) =>
        set((state) => {
          state.setting = setting
        }),

      reset: () => {
        set(() => initialState)
      },
    })),
    {
      name: SETTING_INFO,
    }
  )
)
