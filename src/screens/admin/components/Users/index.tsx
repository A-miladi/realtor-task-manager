import { useState } from 'react'

import Button from '@/components/ui/Button'

import AddUser from './UsersList/Add-User'
import UsersList from './UsersList/Users-List'

export type ActiveComponentType = 'usersList' | 'addUser'

function Users() {
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponentType>('usersList')

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center md:gap-5'>
      <div className='flex h-16 w-[90%] items-center justify-center gap-2'>
        <Button
          className='w-1/4 bg-primary-600 font-semibold max-md:w-1/2 max-md:text-xs'
          onClick={() => setActiveComponent('usersList')}
        >
          لیست کاربران
        </Button>

        <Button
          className='w-1/4 bg-primary-600 font-semibold max-md:w-1/2 max-md:text-xs'
          onClick={() => setActiveComponent('addUser')}
        >
          افزودن کاربر جدید
        </Button>
      </div>

      {activeComponent === 'usersList' && <UsersList />}
      {activeComponent === 'addUser' && (
        <AddUser setActiveComponent={setActiveComponent} />
      )}
    </div>
  )
}

export default Users
