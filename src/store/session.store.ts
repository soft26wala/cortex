// store/session.store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User { id: string; name: string; email: string; role: string }

interface SessionState {
  token:           string | null
  refreshToken:    string | null
  user:            User | null
  currentClientId: string | null
  setAuth:         (token: string, refresh: string, user: User) => void
  setClientId:     (id: string) => void
  logout:          () => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      token:           null,
      refreshToken:    null,
      user:            null,
      currentClientId: null,
      setAuth: (token, refreshToken, user) => set({ token, refreshToken, user }),
      setClientId: (currentClientId) => set({ currentClientId }),
      logout: () => set({ token: null, refreshToken: null, user: null, currentClientId: null }),
    }),
    { name: 'session-store' }
  )
)