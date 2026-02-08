import React, { Suspense, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Footer } from './components/Footer'
import { Menu } from './components/Navbar/Menu'
import LoadingScreen from './components/ui/LoadingScreen'
import { PageUrls } from './constants/pageUrls'
import { AMLAK_TOKEN, USER_INFO } from './constants/sessionLocalStorage'
import bg from '@/assets/images/bgMain1.jpg'
interface PrivateRoutesProps {
  page: React.ReactElement
}

const PrivateRoutes = ({ page }: PrivateRoutesProps) => {
  const [, setIsAdmin] = useState(false)

  const navigate = useNavigate()

  const token = localStorage.getItem(AMLAK_TOKEN)
  const userData = localStorage.getItem(USER_INFO)

  useEffect(() => {
    if (!token || !userData) {
      navigate(PageUrls.Authentication.auth)
    }
  }, [token, userData, navigate])
  useEffect(() => {
    if (location.pathname.includes('admin')) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }, [location.pathname])

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className={'relative'}>
        <Menu />
        <img
          src={bg}
          alt=''
          className='fixed -z-10 h-screen w-full max-md:object-cover'
        />
        {page}
        <Footer />
      </div>
    </Suspense>
  )
}

export default PrivateRoutes
