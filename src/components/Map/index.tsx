/* eslint-disable @typescript-eslint/no-explicit-any */
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'

import L from 'leaflet'
import React from 'react'
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet'

import MarkIcon from '../../assets/Marker.svg'
import { MyToast } from '../ui/Toast/MyToast'

const customIcon = L.icon({
  iconUrl: MarkIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const ChangeMapView = ({ center }: { center: [number, number] }) => {
  const map = useMap()
  map.setView(center, map.getZoom())
  return null
}

const MapClickHandler = ({
  setLocation,
}: {
  setLocation: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | null>
  >
}) => {
  useMapEvents({
    async click(e: { latlng: { lat: any; lng: any } }) {
      const { lat, lng } = e.latlng

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        )
        const data = await response.json()

        if (data && data.address) {
          setLocation({ lat, lng })
        } else {
          setLocation({ lat, lng })
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        MyToast('error', 'خطار در نشان دادن موقعیت مکانی')
        setLocation({ lat, lng })
      }
    },
  })
  return null
}

interface MapWithSearchProps {
  location: { lat: number; lng: number } | null
  setLocation: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | null>
  >
}

const MapWithSearch = ({ location, setLocation }: MapWithSearchProps) => {
  return (
    <div className='z-0 flex flex-col justify-between overflow-hidden'>
      <MapContainer
        zoomControl={false}
        center={[
          location ? location.lat : 34.094,
          location ? location.lng : 49.69809,
        ]}
        zoom={13}
        className='h-72 w-full rounded-lg'
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {location && (
          <>
            <ChangeMapView center={[location.lat, location.lng]} />
            <Marker
              position={[location.lat, location.lng]}
              icon={customIcon}
            ></Marker>
          </>
        )}
        <MapClickHandler setLocation={setLocation} /> {/* Handling map click */}
      </MapContainer>
    </div>
  )
}

export default MapWithSearch
