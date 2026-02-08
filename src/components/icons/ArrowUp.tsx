import { IconProps } from '@/types'

const ArrowUp: React.FC<IconProps> = ({ size = 17, className, color }) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox='0 0 18 9'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16.9195 8.79996C16.7295 8.79996 16.5395 8.72996 16.3895 8.57996L9.86953 2.05996C9.38953 1.57996 8.60953 1.57996 8.12953 2.05996L1.60953 8.57996C1.31953 8.86996 0.839531 8.86996 0.549531 8.57996C0.259531 8.28996 0.259531 7.80996 0.549531 7.51996L7.06953 0.999956C8.12953 -0.0600439 9.85953 -0.0600439 10.9295 0.999956L17.4495 7.51996C17.7395 7.80996 17.7395 8.28996 17.4495 8.57996C17.2995 8.71996 17.1095 8.79996 16.9195 8.79996Z'
        fill={color}
      />
    </svg>
  )
}

export default ArrowUp
