import { UseMutationResult } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'

import Load from '@/components/icons/Load'
import Button from '@/components/ui/Button'
import TextInput from '@/components/ui/TextInput'
import { MyToast } from '@/components/ui/Toast/MyToast'
import { PageUrls } from '@/constants/pageUrls'
import { AMLAK_TOKEN } from '@/constants/sessionLocalStorage'
import { useSendOtp } from '@/hooks/mutations/useSendOtp'
import {
  useVerifyEmailOtp,
  useVerifyPhoneOtp,
} from '@/hooks/mutations/useVerifyOtp'
import useTimer from '@/hooks/useTimer'
import { UseUserStore } from '@/store/user'
import { ResponseType } from '@/types'
import {
  LoginRequest,
  LoginResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from '@/types/Login'

interface ValidateProps {
  sendTo: string
  isPhone: boolean
  changePhone?: () => void
}
const ValidateOtp: FC<ValidateProps> = ({ sendTo, isPhone, changePhone }) => {
  const [code, setCode] = useState('')
  const navigate = useNavigate()

  const [setUser] = UseUserStore(useShallow((state) => [state.setUser]))

  const { seconds, timerEnded, restart } = useTimer({ initialSeconds: 120 })

  const verifyPhoneOtpMutation: UseMutationResult<
    ResponseType<VerifyOtpResponse[]>,
    Error,
    VerifyOtpRequest
  > = useVerifyPhoneOtp()

  const verifyEmailOtpMutation: UseMutationResult<
    ResponseType<VerifyOtpResponse[]>,
    Error,
    VerifyOtpRequest
  > = useVerifyEmailOtp()

  const handleValidatePhoneOtp = () => {
    verifyPhoneOtpMutation.mutate(
      {
        code: code,
        type: 'otp',
        phone: sendTo,
      },
      {
        onSuccess: (res) => {
          localStorage.setItem(AMLAK_TOKEN, res.data[0].token)
          MyToast('success', res.message)
          setUser(res.data[0])
          navigate(PageUrls.main.home)
        },
      }
    )
  }

  const handleValidateEmailOtp = () => {
    verifyEmailOtpMutation.mutate(
      {
        code,
        type: 'otp',
        email: sendTo,
      },
      {
        onSuccess: (res) => {
          localStorage.setItem(AMLAK_TOKEN, res.data[0].token)
          MyToast('success', res.message)
          setUser(res.data[0])
          navigate(PageUrls.main.home)
        },
      }
    )
  }

  const sendOtpMutation: UseMutationResult<
    ResponseType<LoginResponse>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    LoginRequest
  > = useSendOtp()

  const reFetchOtp = () => {
    restart()

    if (isPhone) {
      sendOtpMutation.mutate(
        {
          type: 'otp',
          phone: sendTo,
        },
        {
          onSuccess: (res) => {
            MyToast('success', res.message)
          },
        }
      )
    } else {
      sendOtpMutation.mutate(
        {
          type: isPhone ? 'otp' : 'email',
          email: sendTo,
        },
        {
          onSuccess: (res) => {
            MyToast('success', res.message)
          },
        }
      )
    }
  }

  return (
    <div className='flex w-full flex-col items-center gap-6'>
      <p className='w-5/6 text-right text-xl font-medium md:w-5/6'>
        کد تایید را وارد کنید
      </p>
      <div className='flex w-5/6 flex-col gap-6 md:w-5/6'>
        <TextInput
          className='no-arrows h-11 w-full border border-primary-400 px-2'
          label={
            isPhone
              ? `کد پیامک شده به شماره  ${sendTo} را وارد کنید  `
              : `  را وارد کنید ${sendTo} کد ارسال شده به `
          }
          placeholder='کد تایید ۵ رقمی'
          type='number'
          onChange={(e) => setCode(e.target.value)}
        />
        <div className='flex h-8 w-full items-center justify-center gap-3'>
          <Button
            onClick={() => {}}
            className={`flex h-8 w-[60%] items-center justify-center rounded-lg bg-neutral-300 text-2xs text-neutral-50 ${timerEnded && 'border-[1px] border-primary-700 bg-transparent text-primary-700'}`}
          >
            <p onChange={() => {}} className={`${timerEnded && 'hidden'}`}>
              درخواست مجدد کد {Math.floor(seconds / 60)}:
              {seconds % 60 < 10 && <span>0</span>}
              {seconds % 60}
            </p>
            <p
              onClick={reFetchOtp}
              className={`flex gap-2 ${!timerEnded && 'hidden'}`}
            >
              <Load color='var(--neutral-900)' /> درخواست مجدد کد{' '}
            </p>
          </Button>
          <Button
            onClick={changePhone}
            className='flex h-8 w-[40%] items-center justify-center rounded-lg border-[1px] border-primary-700 bg-transparent text-2xs text-primary-700'
          >
            {isPhone ? 'تغییر شماره موبایل' : 'تغییر ایمیل'}
          </Button>
        </div>
        <Button
          className='mt-1 w-full'
          color='primary'
          variant='contained'
          onClick={isPhone ? handleValidatePhoneOtp : handleValidateEmailOtp}
          loading={
            isPhone
              ? verifyPhoneOtpMutation.isLoading
              : verifyEmailOtpMutation.isLoading
          }
        >
          تایید
        </Button>
      </div>
    </div>
  )
}

export default ValidateOtp
