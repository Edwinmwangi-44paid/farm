import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Sprout, Lock, Mail, ArrowRight, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authService } from "@/services/api/auth"
import { useAuthStore } from "@/stores/useAuthStore"
import { toast } from "@/components/ui/toast"

export function LoginPage() {
  const navigate = useNavigate()
  const { setUser, setToken } = useAuthStore()

  const [email, setEmail] = React.useState("customer@farmmarket.co.ke")
  const [password, setPassword] = React.useState("password123")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { user, token } = await authService.login({ email, password })
      setUser(user)
      setToken(token)
      toast.success("Welcome back!", `Signed in as ${user.name}`)

      if (user.role === "farmer") {
        navigate("/farmer/dashboard")
      } else {
        navigate("/account")
      }
    } catch {
      toast.error("Login Failed", "Please check your email and password.")
    } finally {
      setIsLoading(false)
    }
  }

  const fillQuickDemo = (role: "customer" | "farmer") => {
    if (role === "farmer") {
      setEmail("farmer@greenvalley.co.ke")
      setPassword("farmpass123")
    } else {
      setEmail("customer@farmmarket.co.ke")
      setPassword("customerpass123")
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 max-w-md">
      <div className="rounded-3xl border border-[#ede8de] bg-white p-6 sm:p-8 shadow-sm space-y-6">
        {/* Brand Logo & Heading */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-[#1b4332] text-white flex items-center justify-center mx-auto shadow-sm">
            <Sprout className="h-6 w-6 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-500">
            Sign in to access your Farm Market orders and account
          </p>
        </div>

        {/* Quick Demo Credentials Autofill */}
        <div className="bg-[#f4f1ea] p-3 rounded-2xl border border-[#ded7ca] text-xs space-y-2">
          <span className="font-bold text-[#1b4332] block text-[11px] uppercase tracking-wider">
            Quick Demo Autofill:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fillQuickDemo("customer")}
              className="text-xs h-8 bg-white"
            >
              Demo Customer
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fillQuickDemo("farmer")}
              className="text-xs h-8 bg-white text-[#1b4332]"
            >
              Demo Farmer
            </Button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="pl-9"
              />
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700">Password</label>
              <Link
                to="/forgot-password"
                className="text-xs text-[#1b4332] hover:underline font-medium"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-9"
              />
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            isLoading={isLoading}
            className="w-full font-bold bg-[#1b4332] hover:bg-[#143427] text-white"
          >
            Sign In
          </Button>
        </form>

        {/* Sign Up Redirect */}
        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          <span>Don't have an account? </span>
          <Link to="/register" className="font-bold text-[#1b4332] hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  )
}
