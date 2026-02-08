export type Role = 'adviser' | 'admin' | 'guest'

export interface IUser {
  phone: string
  email: string
  role: Role
  fullname: string
  id?: number
}
