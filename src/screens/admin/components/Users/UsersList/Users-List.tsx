import { UseQueryResult } from '@tanstack/react-query'
import { useRef, useState } from 'react'

import LoadingScreen from '@/components/ui/LoadingScreen'
import Modal from '@/components/ui/Modal'
import { ROLE_TEXT } from '@/constants'
import { useUsers } from '@/hooks/queries/useUsers'
import useOutsideClick from '@/hooks/useOutSideClick'
import { ResponseType } from '@/types'
import { IUser } from '@/types/User'

import ListModal from './modal'

function UsersList() {
  const {
    data: users,
    isLoading,
    isFetching,
  }: UseQueryResult<ResponseType<IUser[]>, Error> = useUsers()

  const [showModal, setShowModal] = useState(false)
  const [activeUser, setActiveUser] = useState<number>(0)

  const openModal = (idx: number) => {
    setShowModal(true)
    setActiveUser(idx)
  }

  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, () => {
    if (showModal) setShowModal(false)
  })

  if (isLoading || isFetching) return <LoadingScreen />
  return (
    <div className='h-5/6 w-[95%]'>
      <table className='flex w-full flex-col' dir='rtl'>
        <thead className='flex h-14 w-full items-center justify-center'>
          <tr className='flex h-14 w-full items-center justify-between border-b-2 border-neutral-400'>
            <th className='flex h-10 w-1/4 items-center justify-center max-md:text-sm'>
              نام کاربر
            </th>
            <th className='flex h-10 w-1/4 items-center justify-center max-md:text-sm'>
              نوع کاربر
            </th>
            <th className='flex h-10 w-1/4 items-center justify-center max-md:text-sm'>
              تلفن
            </th>
            <th className='flex h-10 w-1/4 items-center justify-center max-md:text-sm'>
              ایمیل
            </th>
          </tr>
        </thead>
        <tbody className='flex flex-wrap overflow-y-auto'>
          {users?.data?.map((i: IUser, idx: number) => (
            <tr
              key={idx}
              className={`flex h-14 w-full cursor-pointer items-center justify-center max-md:gap-2 max-md:px-1 ${idx % 2 === 0 ? 'bg-primary-600 text-white' : 'bg-neutral-200'}`}
              onClick={() => openModal(idx)} // Open the modal when row is clicked
            >
              <td className='flex h-10 w-1/4 items-center justify-center max-md:text-xs'>
                {i?.fullname}
              </td>
              <td
                className={`flex h-10 w-1/4 items-center justify-center border-r-[1px] max-md:text-xs ${idx % 2 === 0 ? 'border-neutral-50' : 'border-primary-600'}`}
              >
                {ROLE_TEXT[i?.role as keyof typeof ROLE_TEXT]}
              </td>
              <td
                className={`flex h-10 w-1/4 items-center justify-center truncate border-x-[1px] max-md:text-xs ${idx % 2 === 0 ? 'border-neutral-50' : 'border-primary-600'}`}
              >
                <p className='w-full truncate text-center' dir='ltr'>
                  {i?.phone}
                </p>
              </td>
              <td className='flex h-10 w-1/4 items-center justify-center truncate max-md:text-xs'>
                <p className='w-full truncate text-center' dir='ltr'>
                  {i?.email}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        className='flex h-screen w-full items-center justify-center p-5 backdrop-blur-sm'
        ModalBgClassName='bg-black bg-opacity-30 z-50'
      >
        <div
          className='flex w-full items-center justify-center md:w-1/3'
          ref={ref}
        >
          <ListModal
            setShowModal={setShowModal}
            userData={users?.data[activeUser]}
          />
        </div>
      </Modal>
    </div>
  )
}

export default UsersList
