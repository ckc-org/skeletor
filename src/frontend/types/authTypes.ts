export interface UserT {
  id: string
  email: string
  password: string
  roles: string[]
}

export type UserWithoutPasswordT = Omit<UserT, "password">
