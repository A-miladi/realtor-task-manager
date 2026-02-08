import { Toaster } from 'react-hot-toast'

import AlertIcon from '@/components/icons/AlertIcon'
import CheckIcon from '@/components/icons/CheckIcon'

const TOAST_COLORS = {
  success: '#0E9F6E',
  error: '#F05252',
}

const Toast = () => {
  return (
    <Toaster
      position='top-center'
      // containerStyle={{
      //   bottom: 58,
      // }}
      toastOptions={{
        duration: 5000,
        style: {
          paddingLeft: 0,
          marginBottom: '10px',
          direction: 'rtl',
        },
        error: {
          style: {
            border: `1px solid ${TOAST_COLORS.error}`,
            width: '100%',
          },
          icon: (
            <div className='flex h-8 min-w-8 items-center justify-center rounded-lg bg-error-500 bg-opacity-20'>
              <AlertIcon className='stroke-error-600' />
            </div>
          ),
        },
        success: {
          style: {
            border: `1px solid ${TOAST_COLORS.success}`,
          },
          icon: (
            <div className='bg-success flex h-8 min-w-8 items-center justify-center rounded-lg bg-opacity-40'>
              <CheckIcon className='fill-success-600' />
            </div>
          ),
        },
      }}
    />
  )
}

export default Toast
