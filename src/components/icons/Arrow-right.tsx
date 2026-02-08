import { IconProps } from '@/types'

const ArrowRight: React.FC<IconProps> = ({ size = 32, className, color }) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.0009 27.56C12.2543 27.56 12.5076 27.4667 12.7076 27.2667L21.4009 18.5734C22.8143 17.16 22.8143 14.84 21.4009 13.4267L12.7076 4.73336C12.3209 4.34669 11.6809 4.34669 11.2943 4.73336C10.9076 5.12003 10.9076 5.76003 11.2943 6.14669L19.9876 14.84C20.6276 15.48 20.6276 16.52 19.9876 17.16L11.2943 25.8534C10.9076 26.24 10.9076 26.88 11.2943 27.2667C11.4943 27.4534 11.7476 27.56 12.0009 27.56Z'
        fill={color}
      />
    </svg>
  )
}

export default ArrowRight
