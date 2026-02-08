import { IconProps } from '@/types'

const Phone: React.FC<IconProps> = ({
  size = 16,
  color = '#fff',
  className,
}) => {
  return (
    <svg
      width={size}
      height={(size * 18) / 16}
      viewBox='0 0 9 13'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.5 10.5H4.50667M1.83333 12.5H7.16667C7.52029 12.5 7.85943 12.3595 8.10948 12.1095C8.35952 11.8594 8.5 11.5203 8.5 11.1667V1.83333C8.5 1.47971 8.35952 1.14057 8.10948 0.890524C7.85943 0.640476 7.52029 0.5 7.16667 0.5H1.83333C1.47971 0.5 1.14057 0.640476 0.890524 0.890524C0.640476 1.14057 0.5 1.47971 0.5 1.83333V11.1667C0.5 11.5203 0.640476 11.8594 0.890524 12.1095C1.14057 12.3595 1.47971 12.5 1.83333 12.5Z'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Phone
