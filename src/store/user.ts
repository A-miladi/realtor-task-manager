import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { USER_INFO } from '@/constants/sessionLocalStorage'
import { IUser } from '@/types/User'

interface UserState {
  user: IUser | null
}

interface Actions {
  setUser: (user: IUser | null) => void
  reset: () => void
}

const initialState: UserState = {
  user: null,
}

export const UseUserStore = create<UserState & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,

      setUser: (user: IUser | null) =>
        set((state) => {
          state.user = user
        }),

      reset: () => {
        set(() => initialState)
      },
    })),
    {
      name: USER_INFO,
    }
  )
)
