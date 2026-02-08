import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { ALL_USERS } from '@/constants/sessionLocalStorage'
import { IUser } from '@/types/User'

interface UserState {
  users: IUser[] | null
}

interface Actions {
  setUsers: (user: IUser[] | null) => void
  reset: () => void
}

const initialState: UserState = {
  users: null,
}

export const UseAllUsersStore = create<UserState & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,

      setUsers: (user: IUser[] | null) =>
        set((state) => {
          state.users = user
        }),

      reset: () => {
        set(() => initialState)
      },
    })),
    {
      name: ALL_USERS,
    }
  )
)
