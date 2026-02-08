/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import Download from '@/components/icons/Download'
import Button from '@/components/ui/Button'
import TextInput from '@/components/ui/TextInput'
import { MyToast } from '@/components/ui/Toast/MyToast'
import { QueryKeys } from '@/constants/keys'
import { useAddLogoImageMutation } from '@/hooks/mutations/useAddLogo'
import { useUpdateSettings } from '@/hooks/mutations/useUpdateSettings'
import { UseSettingStore } from '@/store/setting'
import { ResponseType } from '@/types'
import { LogoUploaderRequest } from '@/types/Files'
import { ISetting } from '@/types/Setting'

import FileUpload from '../ChooseFile'

const Settings = () => {
  const [logo, setLogo] = useState<File | null>(null)
  const queryClient = useQueryClient()
  const logoImageMutation: UseMutationResult<
    ResponseType<object>,
    Error,
    LogoUploaderRequest
  > = useAddLogoImageMutation()
  const handleFileSelect = (file: File) => {
    setLogo(file)
  }
  const updateSettingsMutate: UseMutationResult<
    ResponseType<ISetting>,
    Error,
    ISetting
  > = useUpdateSettings()

  const [settings, setSetting] = UseSettingStore(
    useShallow((state) => [state.setting, state.setSetting])
  )

  const [primary, setPrimary] = useState(
    Object.entries(settings?.colors?.primary || {}).reverse()
  )
  const [secondary, setSecondary] = useState(
    Object.entries(settings?.colors?.secondary || {}).reverse()
  )
  const [error, setError] = useState(
    Object.entries(settings?.colors?.error || {}).reverse()
  )
  const [warning, setWarning] = useState(
    Object.entries(settings?.colors?.warning || {}).reverse()
  )
  const [success, setSuccess] = useState(
    Object.entries(settings?.colors?.success || {}).reverse()
  )
  const [neutral, setNeutral] = useState(
    Object.entries(settings?.colors?.neutral || {}).reverse()
  )
  const [appName, setAppName] = useState(settings?.appName)

  const handleChangeColor = (
    colorType: string,
    idx: number,
    newValue: string
  ) => {
    const updateColor = (
      prevColors: Array<[string, any]>
    ): Array<[string, any]> =>
      prevColors.map((color, i) => (i === idx ? [color[0], newValue] : color))

    switch (colorType) {
      case 'primary':
        setPrimary((prev) => updateColor(prev))
        break
      case 'secondary':
        setSecondary((prev) => updateColor(prev))
        break
      case 'neutral':
        setNeutral((prev) => updateColor(prev))
        break
      case 'success':
        setSuccess((prev) => updateColor(prev))
        break
      case 'warning':
        setWarning((prev) => updateColor(prev))
        break
      case 'error':
        setError((prev) => updateColor(prev))
        break
      default:
        break
    }
  }

  const handleUpdateSetting = () => {
    const body: any = {
      logo: settings?.logo,
      appName: appName,
      colors: {
        primary: Object.fromEntries(primary),
        secondary: Object.fromEntries(secondary),
        neutral: Object.fromEntries(neutral),
        success: Object.fromEntries(success),
        warning: Object.fromEntries(warning),
        error: Object.fromEntries(error),
      },
    }
    updateSettingsMutate.mutate(body, {
      onSuccess: (res) => {
        if (logo) {
          logoImageMutation.mutateAsync(
            {
              file: logo,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.Setting.setting])
                setSetting(res.data)
                MyToast('success', res.message)
              },
            }
          )
        } else {
          queryClient.invalidateQueries([QueryKeys.Setting.setting])
          setSetting(res.data)
          MyToast('success', res.message)
        }
      },
    })
  }

  return (
    <div
      className='flex h-screen w-full flex-col items-center justify-center gap-10 px-2 pb-10 pt-16 md:gap-5 md:px-10 md:py-14'
      dir='rtl'
    >
      <div className='flex h-full w-full flex-col items-center justify-between gap-3'>
        <div className='relative flex h-20 w-full items-end justify-between'>
          <TextInput
            className='h-10 w-full border-[1px] border-neutral-700 px-2'
            parent='md:w-1/5 w-1/2'
            label='نام املاک'
            placeholder='نام املاک را وارد کنید ...'
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
          />
          <div className='ml-4 flex h-16 items-center justify-end gap-1 md:w-1/5'>
            <FileUpload
              label={<Download color='var(--neutral-400)' />}
              onFileSelect={handleFileSelect}
            />
          </div>
        </div>

        {/* Colors */}
        <div className='no-scrollbar flex h-full w-full flex-col items-start justify-start overflow-y-auto md:h-5/6'>
          <div
            className='mt-2 flex w-full flex-wrap items-center justify-center gap-1 pl-1'
            dir='ltr'
          >
            {/* Primary Colors */}
            <div className='flex w-full flex-col items-center justify-start rounded-md border-[1px] px-0.5 py-3 md:w-[33%]'>
              <p className='text-primary-600'>Primary</p>
              <div className='mt-2 flex h-full w-full flex-col gap-2 overflow-auto'>
                {primary.map((i, idx) => (
                  <div
                    key={idx}
                    className='flex items-center justify-around px-1'
                  >
                    <p style={{ color: i[1] }} className='w-1/3 text-center'>
                      {i[0]}
                    </p>
                    <TextInput
                      onChange={(e) =>
                        handleChangeColor('primary', idx, e.target.value)
                      }
                      value={i[1]}
                      parent='w-1/3'
                      className='h-8 w-full border bg-transparent'
                    />

                    <div className='flex w-1/3 items-center justify-center'>
                      <div
                        style={{ backgroundColor: i[1] }}
                        className='h-10 w-10 rounded-full'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Colors */}
            <div className='flex w-full flex-col items-center justify-start rounded-md border-[1px] px-0.5 py-3 md:w-[33%]'>
              <p className='text-secondary-600'>Secondary</p>
              <div className='mt-2 flex h-full w-full flex-col gap-2 overflow-auto'>
                {secondary.map((i, idx) => (
                  <div
                    key={idx}
                    className='flex items-center justify-around px-1'
                  >
                    <p style={{ color: i[1] }} className='w-1/3 text-center'>
                      {i[0]}
                    </p>
                    <TextInput
                      onChange={(e) =>
                        handleChangeColor('secondary', idx, e.target.value)
                      }
                      value={i[1]}
                      parent='w-1/3'
                      className='h-8 w-full border bg-transparent'
                    />

                    <div className='flex w-1/3 items-center justify-center'>
                      <div
                        style={{ backgroundColor: i[1] }}
                        className='h-10 w-10 rounded-full'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Neutral Colors */}
            <div className='flex w-full flex-col items-center justify-start rounded-md border-[1px] px-0.5 py-3 md:w-[33%]'>
              <p className='text-neutral-600'>Neutral</p>
              <div className='mt-2 flex h-full w-full flex-col gap-2 overflow-auto'>
                {neutral.map((i, idx) => (
                  <div
                    key={idx}
                    className='flex items-center justify-around px-1'
                  >
                    <p style={{ color: i[1] }} className='w-1/3 text-center'>
                      {i[0]}
                    </p>
                    <TextInput
                      onChange={(e) =>
                        handleChangeColor('neutral', idx, e.target.value)
                      }
                      value={i[1]}
                      parent='w-1/3'
                      className='h-8 w-full border bg-transparent'
                    />

                    <div className='flex w-1/3 items-center justify-center'>
                      <div
                        style={{ backgroundColor: i[1] }}
                        className='h-10 w-10 rounded-full'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Colors */}
            <div className='flex w-full flex-col items-center justify-start rounded-md border-[1px] px-0.5 py-3 md:w-[33%]'>
              <p className='text-success-600'>Success</p>
              <div className='mt-2 flex h-full w-full flex-col gap-2 overflow-auto'>
                {success.map((i, idx) => (
                  <div
                    key={idx}
                    className='flex items-center justify-around px-1'
                  >
                    <p style={{ color: i[1] }} className='w-1/3 text-center'>
                      {i[0]}
                    </p>
                    <TextInput
                      onChange={(e) =>
                        handleChangeColor('success', idx, e.target.value)
                      }
                      value={i[1]}
                      parent='w-1/3'
                      className='h-8 w-full border bg-transparent'
                    />

                    <div className='flex w-1/3 items-center justify-center'>
                      <div
                        style={{ backgroundColor: i[1] }}
                        className='h-10 w-10 rounded-full'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Colors */}
            <div className='flex w-full flex-col items-center justify-start rounded-md border-[1px] px-0.5 py-3 md:w-[33%]'>
              <p className='text-warning-600'>Warning</p>
              <div className='mt-2 flex h-full w-full flex-col gap-2 overflow-auto'>
                {warning.map((i, idx) => (
                  <div
                    key={idx}
                    className='flex items-center justify-around px-1'
                  >
                    <p style={{ color: i[1] }} className='w-1/3 text-center'>
                      {i[0]}
                    </p>
                    <TextInput
                      onChange={(e) =>
                        handleChangeColor('warning', idx, e.target.value)
                      }
                      value={i[1]}
                      parent='w-1/3'
                      className='h-8 w-full border bg-transparent'
                    />

                    <div className='flex w-1/3 items-center justify-center'>
                      <div
                        style={{ backgroundColor: i[1] }}
                        className='h-10 w-10 rounded-full'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Colors */}
            <div className='flex w-full flex-col items-center justify-start rounded-md border-[1px] px-0.5 py-3 md:w-[33%]'>
              <p className='text-error-600'>Error</p>
              <div className='mt-2 flex h-full w-full flex-col gap-2 overflow-auto'>
                {error.map((i, idx) => (
                  <div
                    key={idx}
                    className='flex items-center justify-around px-1'
                  >
                    <p style={{ color: i[1] }} className='w-1/3 text-center'>
                      {i[0]}
                    </p>
                    <TextInput
                      onChange={(e) =>
                        handleChangeColor('error', idx, e.target.value)
                      }
                      value={i[1]}
                      parent='w-1/3'
                      className='h-8 w-full border bg-transparent'
                    />

                    <div className='flex w-1/3 items-center justify-center'>
                      <div
                        style={{ backgroundColor: i[1] }}
                        className='h-10 w-10 rounded-full'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={handleUpdateSetting}
          className='mt-2 h-12 w-1/3 rounded-lg bg-primary-600 text-xl max-md:w-full md:-mb-7'
          loading={
            updateSettingsMutate.isLoading || logoImageMutation.isLoading
          }
        >
          ثبت
        </Button>
      </div>
    </div>
  )
}

export default Settings
