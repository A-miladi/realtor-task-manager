export interface AddFileRequest {
  adviserName: string
  dealType: string
  usage: string
  propertyType: string
  warehouse: boolean
  parking: boolean
  separatedoor: boolean
  terrace: boolean
  toilet: boolean
  burglaralarm: boolean
  centralantenna: boolean
  pool: boolean
  elevator: boolean
  Janitor: boolean
  Heater: string
  cooler: string
  isChange: boolean
  floor: string
  Cabinet: string
  price: number
  area: string
  region: string
  street: string
  alley: string
  zip_code: string
  lat: number
  lng: number
  lifespan: number
  floorcount: number
  countOfFloor: number
  unit: number
  countOfUnit: number
  mortgagePrice: bigint
  rentPrice: bigint
  description: string
  PropertyOwnerFirstName: string
  PropertyOwnerLastName: string
  PropertyOwnerPhone: string | number
}

export type EditFileRequest = {
  body: AddFileRequest
  id?: string
}

export interface AddFileResponse {
  id: number
  subId: string
  adviserName: string
  dealType: string
  usage: string
  propertyType: string
  values: {
    value: string
    inputId: string
    title: string
  }[]
  region: string
  street: string
  alley: string
  zip_code: string
  lat: string
  lng: string
  galleryImage: string[]
  galleryVideo: string[]
}

export type MediaItem = File

export interface FileUploaderRequest {
  id: number | string
  file: MediaItem | MediaItem[]
}

export type LogoUploaderRequest = {
  file: File | null
}

export interface DeleteFileImageRequest {
  id?: number | string
  images: string[]
}

export interface DeleteFileVideoRequest {
  id?: number | string
  videos: string[]
}

type FileMedia = string[]

export interface FileData {
  id: number
  adviserName: string
  dealType: string
  usage: string
  propertyType: string
  warehouse: boolean
  parking: boolean
  separatedoor: boolean
  terrace: boolean
  toilet: boolean
  burglaralarm: boolean
  centralantenna: boolean
  pool: boolean
  elevator: boolean
  Janitor: boolean
  Heater: string
  cooler: string
  isChange: boolean
  floor: string
  Cabinet: string
  price: string
  area: string
  region: string
  street: string
  alley: string
  zip_code: string
  lat: number
  lng: number
  lifespan: number
  floorcount: number
  countOfFloor: number
  unit: number
  mortgagePrice: string
  rentPrice: string
  countOfUnit: number
  galleryImage: FileMedia
  galleryVideo: FileMedia
  description: string
  PropertyOwnerFirstName: string
  PropertyOwnerLastName: string
  PropertyOwnerPhone: string | number
  created_at: string
  update_at: string
}

export interface PermissionsData {
  id?: boolean
  adviserName: boolean
  propertyFirstName: boolean
  propertyLastName: boolean
  propertyPhone: boolean
  dealType: boolean
  usage: boolean
  propertyType: boolean
  warehouse: boolean
  parking: boolean
  separatedoor: boolean
  terrace: boolean
  toilet: boolean
  burglaralarm: boolean
  centralantenna: boolean
  pool: boolean
  elevator: boolean
  Janitor: boolean
  Heater: boolean
  cooler: boolean
  isChange: boolean
  floor: boolean
  Cabinet: boolean
  price: boolean
  area: boolean
  region: boolean
  street: boolean
  alley: boolean
  zip_code: boolean
  lat: boolean
  lng: boolean
  lifespan: boolean
  floorcount: boolean
  countOfFloor: boolean
  unit: boolean
  mortgagePrice: boolean
  rentPrice: boolean
  countOfUnit: boolean
  galleryImage: boolean
  galleryVideo: boolean
  description: boolean
}

type FileDataKeys = keyof FileData

// Create a new type that omits the keys you don't want
export type PropertyDetailKeys = Exclude<
  FileDataKeys,
  | 'id'
  | 'region'
  | 'street'
  | 'alley'
  | 'zip_code'
  | 'lat'
  | 'lng'
  | 'galleryImage'
  | 'galleryVideo'
>

export interface AllFilesResponse {
  files: FileData[]
  filteredData?: FileData[]
}
