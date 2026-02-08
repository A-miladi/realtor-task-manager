import React, { Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'

import Button from './components/ui/Button'
import LoadingScreen from './components/ui/LoadingScreen'
import { PageUrls } from './constants/pageUrls'
import { ROLE } from './constants/role'
import { AMLAK_TOKEN } from './constants/sessionLocalStorage'
import SideBar from './screens/admin/components/sideBar'
import { UseUserStore } from './store/user'

interface PrivateRoutesProps {
  page: React.ReactElement
}

const PrivateAdminRoutes = ({ page }: PrivateRoutesProps) => {
  const navigate = useNavigate()
  const [userData] = UseUserStore(useShallow((state) => [state.user]))
  const token = localStorage.getItem(AMLAK_TOKEN)

  useEffect(() => {
    if (!token || !userData || userData?.role !== ROLE.admin) {
      navigate(PageUrls.Authentication.auth)
    }
  }, [token, userData])

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className='relative flex flex-row-reverse items-center justify-center'>
        <div className='h-screen w-1/4 bg-transparent max-md:hidden'></div>

        <SideBar className={`gap-3 bg-primary-600`}>
          <Button
            className='bg-neutral-200 font-bold text-primary-600'
            onClick={() => navigate(PageUrls.Admin.settings)}
          >
            تنظیمات
          </Button>
          <Button
            className='bg-neutral-200 font-bold text-primary-600'
            onClick={() => navigate(PageUrls.Admin.permissions)}
          >
            مدیریت دسترسی ها
          </Button>
          <Button
            className='bg-neutral-200 font-bold text-primary-600'
            onClick={() => navigate(PageUrls.Admin.adviser)}
          >
            مدیریت کاربران
          </Button>
          <Button
            className='bg-neutral-200 font-bold text-primary-600'
            onClick={() => navigate(PageUrls.main.home)}
          >
            صفحه اصلی
          </Button>
        </SideBar>
        {page}
      </div>
    </Suspense>
  )
}

export default PrivateAdminRoutes
