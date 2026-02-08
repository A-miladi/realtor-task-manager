import { Link } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'

import AddFile from '@/components/icons/Add-FileIcon'
import Adviser from '@/components/icons/adviserIcon'
import Files from '@/components/icons/FilesIcon'
import Tasks from '@/components/icons/TasksIcons'
import { PageUrls } from '@/constants/pageUrls'
import { ROLE } from '@/constants/role'
import { UseUserStore } from '@/store/user'

const HomePage = () => {
  const [userData] = UseUserStore(useShallow((state) => [state.user]))
  const adminRole = userData?.role === ROLE.admin
  return (
    <section className='flex h-screen w-full items-start justify-center overflow-hidden max-md:pt-16 md:items-center'>
      <main className='no-scrollbar flex h-[90%] overflow-hidden pb-10 max-md:items-start'>
        <div className='no-scrollbar flex w-full flex-row flex-wrap items-center justify-center gap-5 overflow-y-auto p-2 md:gap-4'>
          <Link
            to={PageUrls.main.tasks}
            className='flex h-36 w-40 flex-col items-center justify-center gap-6 rounded-[20px] border border-primary-500 bg-white bg-opacity-40 shadow-md backdrop-blur-md md:h-48 md:w-48'
          >
            <Tasks color='var(--primary-500)' className='md:h-20 md:w-20' />
            <p className='text-2xl font-semibold text-primary-500 max-md:text-lg'>
              تسک ها
            </p>
          </Link>
          <Link
            to={`${adminRole ? PageUrls.main.adviser : ''}`}
            className={`flex h-36 w-40 flex-col items-center justify-center rounded-[20px] border border-primary-500 bg-white bg-opacity-40 shadow-md backdrop-blur-md md:h-48 md:w-48 ${adminRole ? 'cursor-pointer gap-6' : 'cursor-auto gap-0'}`}
          >
            <Adviser
              color={`${adminRole ? 'var(--primary-500)' : 'var(--primary-400)'} `}
              className={`md:h-20 md:w-20 ${adminRole ? 'scale-100' : 'scale-75'}`}
            />
            <p
              className={`text-2xl font-semibold max-md:text-lg ${adminRole ? 'text-primary-500' : 'scale-90 text-primary-400'}`}
            >
              مشاوران
            </p>
          </Link>
          <Link
            to={PageUrls.main.files}
            className='flex h-36 w-40 flex-col items-center justify-center gap-6 rounded-[20px] border border-primary-500 bg-white bg-opacity-40 shadow-md backdrop-blur-md md:h-48 md:w-48'
          >
            <Files color='var(--primary-500)' className='md:h-20 md:w-20' />
            <p className='text-2xl font-semibold text-primary-500 max-md:text-lg'>
              لیست فایل ها
            </p>
          </Link>
          <Link
            to={PageUrls.main.addFile}
            className='flex h-36 w-40 flex-col items-center justify-center gap-6 rounded-[20px] border border-primary-500 bg-white bg-opacity-40 shadow-md backdrop-blur-md md:h-48 md:w-48'
          >
            <AddFile color='var(--primary-500)' className='md:h-20 md:w-20' />
            <p className='text-2xl font-semibold text-primary-500 max-md:text-lg'>
              ایجاد فایل
            </p>
          </Link>
        </div>
      </main>
    </section>
  )
}

export default HomePage
