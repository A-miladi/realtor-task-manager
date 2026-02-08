import { IconProps } from '@/types'

const Email: React.FC<IconProps> = ({
  size = 16,
  color = '#fff',
  className,
}) => {
  return (
    <svg
      width={size}
      height={(size * 18) / 16}
      viewBox='0 0 14 11'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 2.83331L6.26 6.33998C6.47911 6.48617 6.7366 6.56418 7 6.56418C7.2634 6.56418 7.52089 6.48617 7.74 6.33998L13 2.83331M2.33333 10.1666H11.6667C12.0203 10.1666 12.3594 10.0262 12.6095 9.77612C12.8595 9.52607 13 9.18694 13 8.83331V2.16665C13 1.81302 12.8595 1.47389 12.6095 1.22384C12.3594 0.973789 12.0203 0.833313 11.6667 0.833313H2.33333C1.97971 0.833313 1.64057 0.973789 1.39052 1.22384C1.14048 1.47389 1 1.81302 1 2.16665V8.83331C1 9.18694 1.14048 9.52607 1.39052 9.77612C1.64057 10.0262 1.97971 10.1666 2.33333 10.1666Z'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Email
