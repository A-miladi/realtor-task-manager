import { Link, useLocation } from 'react-router-dom'

import { PageUrls } from '@/constants/pageUrls'

import AddFile from '../icons/Add-FileIcon'
import Adviser from '../icons/adviserIcon'
import Files from '../icons/FilesIcon'
import Home from '../icons/HomeIcon'
import Tasks from '../icons/TasksIcons'
import { UseUserStore } from '@/store/user'
import { useShallow } from 'zustand/react/shallow'
import { ROLE } from '@/constants/role'

export function Footer() {
  const location = useLocation()
  const [userData] = UseUserStore(useShallow((state) => [state.user]))
  const adminRole = userData?.role === ROLE.admin
  const isActive = (path: string) => location.pathname === path

  return (
    <div className='rtl shadowTop fixed bottom-0 z-10 flex h-16 w-full items-center justify-center rounded-t-2xl border-t-2 bg-white bg-opacity-30 p-5 backdrop-blur-md'>
      <div className='flex items-center justify-center gap-8 md:gap-12'>
        <Link
          to={PageUrls.main.tasks}
          className='flex w-1/2 flex-col items-center justify-center text-[8px] md:text-xs'
        >
          <Tasks
            className={`${
              isActive(PageUrls.main.tasks) ? 'dropShadow h-10 w-9' : 'h-10 w-9'
            }`}
            color={
              isActive(PageUrls.main.tasks)
                ? 'var(--secondary-400)'
                : 'var(--primary-600)'
            }
          />
          <p className={`text-primary-600`}>تسک‌ها</p>
        </Link>

        <Link
          to={`${adminRole ? PageUrls.main.adviser : ''}`}
          className={`flex w-1/2 flex-col items-center justify-center text-[8px] md:text-xs ${adminRole ? 'cursor-pointer' : 'cursor-auto scale-90'}`}
        >
          <Adviser
            className={`${
              isActive(PageUrls.main.adviser)
                ? 'dropShadow h-10 w-9'
                : 'h-10 w-9'
            }`}
            color={`
              ${
                isActive(PageUrls.main.adviser)
                  ? 'var(--secondary-400)'
                  : `${adminRole ? 'var(--primary-600)' : 'var(--primary-400)'}`
              }
             
            `}
          />
          <p
            className={`${adminRole ? 'text-primary-600' : 'text-primary-400'}`}
          >
            مشاورین
          </p>
        </Link>

        <Link
          to={PageUrls.main.home}
          className='flex w-16 items-center justify-center md:w-24'
        >
          <div className='absolute bottom-9 flex h-14 w-14 items-center justify-center rounded-[50%] bg-black pt-1 shadow-lg shadow-[rgba(1,1,1,0.4)]'>
            <Home
              className='mb-2 h-10 w-10'
              color={
                isActive(PageUrls.main.home)
                  ? 'var(--secondary-300)'
                  : 'var(--neutral-50)'
              }
            />
          </div>
          <p
            className={`mt-8 text-sm md:text-lg ${
              isActive(PageUrls.main.home)
                ? 'font-semibold text-secondary-400'
                : 'font-normal text-neutral-900'
            }`}
          >
            خانه
          </p>
        </Link>

        <Link
          to={PageUrls.main.files}
          className='flex w-1/2 flex-col items-center justify-center text-[8px] md:text-xs'
        >
          <Files
            className={`${
              isActive(PageUrls.main.files) ? 'dropShadow h-10 w-9' : 'h-10 w-9'
            }`}
            color={
              isActive(PageUrls.main.files)
                ? 'var(--secondary-400)'
                : 'var(--primary-600)'
            }
          />
          <p className={`text-primary-600`}>فایل‌ها</p>
        </Link>

        <Link
          to={PageUrls.main.addFile}
          className='flex w-1/2 flex-col items-center justify-center text-[8px] md:text-xs'
        >
          <AddFile
            className={`${
              isActive(PageUrls.main.addFile)
                ? 'dropShadow h-10 w-9'
                : 'h-10 w-9'
            }`}
            color={
              isActive(PageUrls.main.addFile)
                ? 'var(--secondary-400)'
                : 'var(--primary-600)'
            }
          />
          <p className={`text-primary-600`}>ایجاد فایل</p>
        </Link>
      </div>
    </div>
  )
}
