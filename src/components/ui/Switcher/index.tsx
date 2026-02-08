import { useState } from 'react'

interface ToggleSwitchProps {
  defaultOn?: boolean
  onToggle?: () => void
  label?: string
  disabled?: boolean
}

export default function ToggleSwitch({
  defaultOn = false,
  onToggle,
  label,
  disabled,
}: ToggleSwitchProps) {
  const [isOn, setIsOn] = useState(defaultOn)

  const handleToggle = () => {
    if (!disabled) setIsOn(!isOn)
    if (onToggle && !disabled) onToggle()
  }

  return (
    <div className='flex items-center space-x-3'>
      {label && <span>{label}</span>} {/* Render label if provided */}
      <div
        onClick={handleToggle}
        className={`relative inline-flex h-5 w-10 cursor-pointer items-center rounded-[40px] transition-colors duration-300 ease-in-out ${
          isOn ? 'bg-primary-600' : 'bg-neutral-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out ${
            isOn ? 'translate-x-[21px]' : 'translate-x-[3px]'
          }`}
        />
      </div>
    </div>
  )
}
