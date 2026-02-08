import { IconProps } from '@/types'

const Plus: React.FC<IconProps> = ({
  size = 24,
  color = '#fff',
  className,
}) => {
  return (
    <svg
      width={size}
      height={(size * 18) / 16}
      viewBox='0 0 24 24'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 12H6H12Z' fill='white' />
      <path
        d='M12 6V12M12 12V18M12 12H18M12 12H6'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Plus
