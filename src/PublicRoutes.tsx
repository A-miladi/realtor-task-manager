import React, { Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import LoadingScreen from './components/ui/LoadingScreen'
import { PageUrls } from './constants/pageUrls'
import { AMLAK_TOKEN, USER_INFO } from './constants/sessionLocalStorage'

interface PublicRoutesProps {
  page: React.ReactElement
}

const PublicRoutes = ({ page }: PublicRoutesProps) => {
  const token = localStorage.getItem(AMLAK_TOKEN)
  const userData = localStorage.getItem(USER_INFO)

  const navigate = useNavigate()

  useEffect(() => {
    if (token || userData) {
      navigate(PageUrls.main.home)
    }
  }, [token, userData, navigate])
  return <Suspense fallback={<LoadingScreen />}>{page}</Suspense>
}

export default PublicRoutes
