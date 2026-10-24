export interface User {
  name: string
  surname: string
  email: string
  favorites: string[]
}

export interface RegisterData {
  email: string
  password: string
  name: string
  surname: string
}
