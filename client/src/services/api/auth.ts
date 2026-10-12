import { apiClient } from "./client"
import { Address, User, UserRole } from "@/types"
import { MOCK_ADDRESSES, MOCK_USERS } from "@/services/mock/users"

interface LoginCredentials {
  email: string
  password?: string
}

interface RegisterData {
  name: string
  email: string
  phone: string
  role: UserRole
  farmName?: string
  location?: string
  password?: string
}

export const authService = {
  /**
   * Log in user
   */
  async login({ email }: LoginCredentials): Promise<{ user: User; token: string }> {
    return apiClient.mockExec(() => {
      // Find matching user or default to customer
      let user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (!user) {
        user = {
          id: `user-${Date.now()}`,
          email,
          name: email.split("@")[0].replace(/[._]/g, " "),
          phone: "+254 700 000 000",
          role: email.includes("farmer") ? "farmer" : "customer",
          createdAt: new Date().toISOString(),
        }
      }

      const token = `fake-jwt-token-${user.id}`
      apiClient.setToken(token)
      localStorage.setItem("fm_current_user", JSON.stringify(user))

      return { user, token }
    })
  },

  /**
   * Register new account
   */
  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    return apiClient.mockExec(() => {
      const user: User = {
        id: `user-${Date.now()}`,
        email: data.email,
        name: data.name,
        phone: data.phone,
        role: data.role,
        farmId: data.role === "farmer" ? `farmer-${Date.now()}` : undefined,
        createdAt: new Date().toISOString(),
      }

      const token = `fake-jwt-token-${user.id}`
      apiClient.setToken(token)
      localStorage.setItem("fm_current_user", JSON.stringify(user))

      return { user, token }
    })
  },

  /**
   * Log out
   */
  async logout(): Promise<void> {
    return apiClient.mockExec(() => {
      apiClient.setToken(null)
      localStorage.removeItem("fm_current_user")
    })
  },

  /**
   * Get currently active session user
   */
  async getCurrentUser(): Promise<User | null> {
    return apiClient.mockExec(() => {
      const stored = localStorage.getItem("fm_current_user")
      if (stored) {
        try {
          return JSON.parse(stored) as User
        } catch {
          return null
        }
      }
      // Default to demo customer for immediate high-end UX
      return MOCK_USERS[0]
    })
  },

  /**
   * Get addresses for current user
   */
  async getUserAddresses(_userId: string): Promise<Address[]> {
    return apiClient.mockExec(() => {
      return [...MOCK_ADDRESSES]
    })
  },
}
