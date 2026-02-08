import LoadingScreen from '@/components/ui/LoadingScreen'
import Spinner from '@/components/ui/Spinner'
import { ROLE } from '@/constants/role'
import { useUsers } from '@/hooks/queries/useUsers'
import { ResponseType, UseQueryResult } from '@/types'
import { IUsers } from '@/types/Setting'

function Adviser() {
  const {
    data: users,
    isLoading,
    isFetching,
  }: UseQueryResult<ResponseType<IUsers>, Error> = useUsers()

  if (isLoading || isFetching) {
    return <LoadingScreen />
  }

  return (
    <div
      className='flex h-screen w-full items-start justify-center overflow-hidden pt-12 backdrop-blur-2xl md:pt-14'
      dir='rtl'
    >
      <div className='flex max-h-[90%] w-[95%] flex-col items-center justify-start md:w-[90%]'>
        <div className='flex h-12 w-full items-center justify-start border-b py-4 text-neutral-50'>
          <p>لیست مشاوران</p>
        </div>
        <div className='mt-4 flex h-full w-full flex-col'>
          <div className='h-[90%] w-full'>
            {isLoading ? (
              <Spinner />
            ) : (
              <table
                className='flex w-full flex-col overflow-hidden rounded-t-lg border border-neutral-400'
                dir='rtl'
              >
                <thead className='flex h-10 w-full items-center justify-center'>
                  <tr className='flex h-10 w-full items-center justify-between border-b border-neutral-400 bg-primary-600 text-neutral-50'>
                    <th className='flex w-1/3 items-center justify-center pr-4 text-sm font-medium'>
                      نام کاربر
                    </th>
                    <th className='flex w-1/3 items-center justify-center pr-4 text-sm font-medium'>
                      نقش کاربر
                    </th>
                    <th className='flex w-1/3 items-center justify-center pr-4 text-sm font-medium'>
                      تلفن
                    </th>
                    <th className='flex w-1/3 items-center justify-center pr-4 text-sm font-medium'>
                      ایمیل
                    </th>
                  </tr>
                </thead>
                <tbody className='flex flex-wrap overflow-y-auto'>
                  {users?.data?.map((i: IUsers, idx: number) => (
                    <tr
                      key={idx}
                      className={`flex h-10 w-full items-center justify-center max-md:gap-2 max-md:px-1 ${idx % 2 === 0 ? 'bg-neutral-50 text-primary-600' : 'bg-neutral-100'}`}
                    >
                      <td className='flex h-10 w-1/3 items-center justify-center text-nowrap pr-4 text-sm max-md:text-xs'>
                        {i?.fullname}
                      </td>
                      <td className='flex h-10 w-1/3 items-center justify-center pr-4 text-sm max-md:text-xs'>
                        {i?.role === ROLE.admin ? 'ادمین' : 'مشاور'}
                      </td>

                      <td
                        className={`flex h-10 w-1/3 items-center justify-center truncate pr-4 max-md:text-xs`}
                      >
                        <p
                          className='w-full truncate text-center text-xs'
                          dir='ltr'
                        >
                          {i?.phone}
                        </p>
                      </td>
                      <td className='flex h-10 w-1/3 items-center justify-center truncate pr-4 max-md:text-xs'>
                        <p
                          className='w-20 truncate text-center text-xs md:w-full'
                          dir='ltr'
                        >
                          {i?.email}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adviser
