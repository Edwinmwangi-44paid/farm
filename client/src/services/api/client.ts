import { delay } from "@/lib/utils"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1"
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== "false"
const MOCK_DELAY = Number(import.meta.env.VITE_MOCK_API_DELAY_MS) || 250

export interface ApiClientConfig {
  baseUrl: string
  useMock: boolean
  mockDelayMs: number
}

export const apiConfig: ApiClientConfig = {
  baseUrl: API_BASE_URL,
  useMock: USE_MOCK,
  mockDelayMs: MOCK_DELAY,
}

/**
 * Common HTTP client abstraction.
 * When real FastAPI backend is connected, this issues standard fetch requests.
 * Currently simulates real network timing and mock resolution.
 */
class ApiClient {
  private token: string | null = null

  constructor() {
    this.token = localStorage.getItem("fm_auth_token")
  }

  setToken(token: string | null) {
    this.token = token
    if (token) {
      localStorage.setItem("fm_auth_token", token)
    } else {
      localStorage.removeItem("fm_auth_token")
    }
  }

  getToken(): string | null {
    return this.token
  }

  /**
   * Helper to execute mock operations with network latency simulation
   */
  async mockExec<T>(callback: () => T | Promise<T>, delayMs: number = apiConfig.mockDelayMs): Promise<T> {
    await delay(delayMs)
    return callback()
  }

  /**
   * Real HTTP request method for future FastAPI endpoints
   */
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${apiConfig.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "An error occurred" }))
      throw new Error(errorData.detail || errorData.message || `Request failed with status ${response.status}`)
    }

    return response.json()
  }
}

export const apiClient = new ApiClient()
