import { Role } from './User'

export interface ColorShades {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

export interface ThemeColors {
  primary: ColorShades
  secondary: ColorShades
  neutral: ColorShades
  error: ColorShades
  warning: ColorShades
  success: ColorShades
}

export interface ISetting {
  id: number
  colors: ThemeColors
  logo: string
  appName: string
}

export interface IUsers {
  id: number
  phone: string
  email: string
  fullname: string
  role: Role
  created_at: string
  update_at: string
}
