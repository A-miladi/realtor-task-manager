import { cn } from '@/utils'
import GoogleMapReact from 'google-map-react'
import { FC } from 'react'
interface map {
  className?: string
}
const Map: FC<map> = ({ className }) => {
  return (
    <div className={cn('flex h-[239px] w-full', className)}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyBI0OFn3NZvPi0HRct0ZeYIIvQEpe37K5Y',
        }}
        defaultCenter={{ lat: 59.95, lng: 30.33 }}
        defaultZoom={11}
      ></GoogleMapReact>
    </div>
  )
}

export default Map
