import { IconProps } from '@/types'

interface ArrowIconProps extends IconProps {
  direction?: 'right' | 'left' | 'up' | 'down'
}

const ArrowIcon: React.FC<ArrowIconProps> = ({
  size = 6,
  color = 'var(--primary-600)',
  direction = 'left',
  className,
}) => {
  const rotations = {
    right: 'rotate(180deg)',
    left: 'rotate(0deg)',
    up: 'rotate(-90deg)',
    down: 'rotate(90deg)',
  }

  const transform = rotations[direction] || rotations.right

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 6 11'
      fill={color}
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      style={{ transform }}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.70703 0.793031C5.8945 0.980558 5.99982 1.23487 5.99982 1.50003C5.99982 1.76519 5.8945 2.0195 5.70703 2.20703L2.41403 5.50003L5.70703 8.79303C5.88919 8.98163 5.98998 9.23423 5.9877 9.49643C5.98543 9.75863 5.88026 10.0094 5.69485 10.1948C5.50944 10.3803 5.25863 10.4854 4.99643 10.4877C4.73423 10.49 4.48163 10.3892 4.29303 10.207L0.293031 6.20703C0.10556 6.0195 0.000244141 5.76519 0.000244141 5.50003C0.000244141 5.23487 0.10556 4.98056 0.293031 4.79303L4.29303 0.793031C4.48056 0.60556 4.73487 0.500244 5.00003 0.500244C5.26519 0.500244 5.5195 0.60556 5.70703 0.793031Z'
        fill={color}
      />
    </svg>
  )
}

export default ArrowIcon
