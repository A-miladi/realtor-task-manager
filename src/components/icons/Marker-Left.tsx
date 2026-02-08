import { IconProps } from '@/types'

const MarkerLeft: React.FC<IconProps> = ({ size = 22, className, color }) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox='0 0 24 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10 19.5L3 12.5M3 12.5L10 5.5M3 12.5H21'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default MarkerLeft
