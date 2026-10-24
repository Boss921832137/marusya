import { apiClient } from './apiClient'
import type { RegisterData, User } from '../types/user'

export async function login(email: string, password: string): Promise<void> {
  await apiClient.post('/auth/login', { email, password })
}

export async function getProfile(): Promise<User> {
  const response = await apiClient.get<User>('/profile')
  return response.data
}

export async function register(registerData: RegisterData): Promise<void> {
  await apiClient.post('/user', registerData)
}

export async function logout(): Promise<void> {
  await apiClient.get('/auth/logout')
}
