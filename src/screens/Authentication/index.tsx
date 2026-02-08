import { UseMutationResult } from '@tanstack/react-query'
import { useState } from 'react'

import AuthBg from '@/assets/images/AuthImage.png'
import Email from '@/components/icons/Email'
import Phone from '@/components/icons/Phone'
import Button from '@/components/ui/Button'
import TextInput from '@/components/ui/TextInput'
import { MyToast } from '@/components/ui/Toast/MyToast'
import { useSendOtp } from '@/hooks/mutations/useSendOtp'
import { ResponseType } from '@/types'
import { LoginRequest, LoginResponse } from '@/types/Login'

import ValidateOtp from './ValidateOtp'

const LoginPage: React.FC = () => {
  const sendOtpMutation: UseMutationResult<
    ResponseType<LoginResponse>,
    Error,
    LoginRequest
  > = useSendOtp()

  const [tabIndex, setTabIndex] = useState<0 | 1>(0)
  const [isOtp, setIsOtp] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleEmailLogin = () => {
    sendOtpMutation.mutate(
      {
        type: 'email',
        email: inputValue,
      },
      {
        onSuccess: (res) => {
          setIsOtp(true)
          MyToast('success', res.message)
        },
      }
    )
  }
  const handlePhoneLogin = () => {
    sendOtpMutation.mutate(
      {
        type: 'otp',
        phone: inputValue,
      },
      {
        onSuccess: (res) => {
          setIsOtp(true)
          MyToast('success', res.message)
        },
      }
    )
  }

  return (
    <div className='flex overflow-hidden'>
      <div
        style={{
          backgroundImage: `url(${AuthBg})`,
        }}
        className='absolute top-0 h-3/4 w-full flex-col justify-end bg-cover bg-center bg-no-repeat md:static md:flex md:h-screen md:w-2/3'
      />
      <div className='absolute flex h-screen w-full items-end justify-center md:static md:w-1/3 md:items-center md:bg-neutral-50'>
        <div className='flex h-auto w-full flex-col items-center justify-center gap-6 rounded-tl-xl rounded-tr-xl bg-neutral-50 pb-20 shadow-xl md:w-full md:gap-6 md:shadow-none'>
          <p className='mt-10 w-5/6 text-center text-3xl font-bold md:w-5/6 md:text-right'>
            املاک
          </p>
          {!isOtp ? (
            <>
              <p className='w-5/6 text-right text-xl font-medium md:w-5/6'>
                ورود به پلتفرم
              </p>
              <div className='flex w-5/6 flex-col gap-4 md:w-5/6'>
                <div className='mb-5 flex h-10 w-full items-center justify-center'>
                  <Button
                    onClick={() => setTabIndex(1)}
                    className={`flex w-1/2 items-center justify-center gap-1 rounded-none border-b-2 bg-transparent text-sm font-medium text-neutral-600 ${tabIndex === 1 && 'border-primary-900 text-primary-900'}`}
                  >
                    ورود با ایمیل{' '}
                    <Email
                      color={
                        tabIndex === 1
                          ? 'var(--primary-900)'
                          : 'var(--neutral-500)'
                      }
                    />
                  </Button>
                  <Button
                    onClick={() => setTabIndex(0)}
                    className={`flex w-1/2 items-center justify-center gap-1 rounded-none border-b-2 bg-transparent text-sm font-medium text-neutral-600 ${tabIndex === 0 && 'border-primary-900 text-primary-900'}`}
                  >
                    ورود با موبایل
                    <Phone
                      color={
                        tabIndex === 0
                          ? 'var(--primary-900)'
                          : 'var(--neutral-500)'
                      }
                    />
                  </Button>
                </div>
                <TextInput
                  className='no-arrows h-11 w-full border border-primary-400 px-3'
                  dir='ltr'
                  label={
                    tabIndex === 0 ? 'ورود با شماره موبایل' : 'ورود با ایمیل'
                  }
                  placeholder={
                    tabIndex === 0 ? '09123131122' : 'example@gmail.com'
                  }
                  type={tabIndex === 0 ? 'tel' : 'email'}
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                />
              </div>
              <Button
                className='mt-1 w-5/6'
                color='primary'
                variant='contained'
                onClick={tabIndex === 0 ? handlePhoneLogin : handleEmailLogin}
                loading={sendOtpMutation.isLoading}
              >
                ورود
              </Button>
            </>
          ) : (
            <ValidateOtp
              sendTo={inputValue}
              isPhone={tabIndex === 0}
              changePhone={() => {
                setIsOtp(false)
                setInputValue('')
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
