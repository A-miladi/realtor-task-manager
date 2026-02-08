import toast, { ToastOptions, ToastType } from 'react-hot-toast'

import CloseIcon from '@/components/icons/CloseIcon'

const CLOSE_STYLE = ''

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MyToast = (type: ToastType, text: any, options?: ToastOptions) => {
  switch (type) {
    case 'success':
      return toast.success(
        (t) => (
          <div className='flex items-center justify-between'>
            <p className='w-full text-right text-sm font-normal leading-tight text-success-500'>
              {text}
            </p>

            <button className={CLOSE_STYLE} onClick={() => toast.dismiss(t.id)}>
              <CloseIcon
                className='fill-success-500'
                color='var(--success-500)'
              />
            </button>
          </div>
        ),
        {
          ...options,
        }
      )

    case 'blank':
      return toast(text, { ...options })

    case 'error':
      return toast.error(
        (t) => (
          <div className='flex items-center justify-between'>
            <p className='text-right text-sm font-medium leading-tight text-error-600'>
              {text}
            </p>
            <button onClick={() => toast.dismiss(t.id)} className={CLOSE_STYLE}>
              <CloseIcon className='fill-error-600' />
            </button>
          </div>
        ),
        {
          ...options,
        }
      )

    default:
      return
  }
}
