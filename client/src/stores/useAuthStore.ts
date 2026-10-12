import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { User, UserRole } from "@/types"
import { MOCK_USERS } from "@/services/mock/users"

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  logout: () => void
  switchRole: (role: UserRole) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Default to demo customer for immediate review readiness
      user: MOCK_USERS[0],
      token: "mock-jwt-token-active",
      isAuthenticated: true,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token, isAuthenticated: !!token }),

      logout: () => {
        localStorage.removeItem("fm_auth_token")
        localStorage.removeItem("fm_current_user")
        set({ user: null, token: null, isAuthenticated: false })
      },

      switchRole: (role: UserRole) => {
        if (role === "farmer") {
          set({
            user: MOCK_USERS[1], // Samuel Gitau (Green Valley Farm)
            token: "mock-jwt-token-farmer",
            isAuthenticated: true,
          })
        } else {
          set({
            user: MOCK_USERS[0], // Amina Hassan (Customer)
            token: "mock-jwt-token-customer",
            isAuthenticated: true,
          })
        }
      },
    }),
    {
      name: "farm-market-auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
