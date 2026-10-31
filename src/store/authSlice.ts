import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../types/user'

interface AuthState {
  user: User | null
  isAuthModalOpen: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthModalOpen: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
    },
    openAuthModal(state) {
      state.isAuthModalOpen = true
    },
    closeAuthModal(state) {
      state.isAuthModalOpen = false
    },
  },
})

export const { setUser, clearUser, openAuthModal, closeAuthModal } = authSlice.actions
export const authReducer = authSlice.reducer
