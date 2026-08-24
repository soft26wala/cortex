// store/session.store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User { id: string; name: string; email: string; role: string }

interface SessionState {
  token:           string | null
  refreshToken:    string | null
  user:            User | null
  currentClientId: string | null
  setAuth:         (token: string, refresh: string, user: User, clientId?: string) => void
  setClientId:     (id: string) => void
  logout:          () => void
}

const DEFAULT_USER: User = {
  id: 'usr_demo_1',
  name: 'Anmol Singh',
  email: 'anmol@cortexwebsolutions.com',
  role: 'Super Admin',
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      token:           'demo-dev-token',
      refreshToken:    'demo-dev-refresh',
      user:            DEFAULT_USER,
      currentClientId: 'client_demo_1',
      setAuth: (token, refreshToken, user, clientId) =>
        set({ token, refreshToken, user, currentClientId: clientId ?? 'client_demo_1' }),
      setClientId: (currentClientId) => set({ currentClientId }),
      logout: () => set({ token: null, refreshToken: null, user: null, currentClientId: null }),
    }),
    { name: 'session-store' }
  )
)