import { IconProps } from '@/types'

const Load: React.FC<IconProps> = ({
  size = 16,
  color = '#fff',
  className,
}) => {
  return (
    <svg
      width={size}
      height={(size * 18) / 16}
      viewBox='0 0 13 14'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M11.4463 8.99999H8.50033H11.4463Z' fill='#0C1425' />
      <path
        d='M1.16699 1.66666V4.99999H1.55499M1.55499 4.99999C1.99756 3.90541 2.79078 2.9886 3.81034 2.39323C4.82991 1.79787 6.01819 1.5576 7.18897 1.71009C8.35975 1.86257 9.44685 2.39919 10.2799 3.23584C11.113 4.0725 11.6449 5.1619 11.7923 6.33333M1.55499 4.99999H4.50033M11.8337 12.3333V8.99999H11.4463M11.4463 8.99999C11.0031 10.0939 10.2097 11.01 9.19021 11.6049C8.17075 12.1997 6.98282 12.4397 5.81239 12.2872C4.64197 12.1348 3.55512 11.5986 2.72201 10.7625C1.88891 9.92638 1.35656 8.83762 1.20833 7.66666M11.4463 8.99999H8.50033'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Load
