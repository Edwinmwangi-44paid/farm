import * as React from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Sprout, ShoppingCart, UserCheck, ShieldCheck, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { authService } from "@/services/api/auth"
import { useAuthStore } from "@/stores/useAuthStore"
import { toast } from "@/components/ui/toast"
import { UserRole } from "@/types"

export function RegisterPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialRole = searchParams.get("role") === "farmer" ? "farmer" : "customer"

  const { setUser, setToken } = useAuthStore()

  const [role, setRole] = React.useState<UserRole>(initialRole)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [farmName, setFarmName] = React.useState("")
  const [location, setLocation] = React.useState("Kiambu")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { user, token } = await authService.register({
        name,
        email,
        phone,
        role,
        farmName: role === "farmer" ? farmName : undefined,
        location: role === "farmer" ? location : undefined,
        password,
      })

      setUser(user)
      setToken(token)
      toast.success("Account created successfully!", `Welcome to Farm Market, ${user.name}`)

      if (user.role === "farmer") {
        navigate("/farmer/dashboard")
      } else {
        navigate("/account")
      }
    } catch {
      toast.error("Registration error", "Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 max-w-lg">
      <div className="rounded-3xl border border-[#ede8de] bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-[#1b4332] text-white flex items-center justify-center mx-auto shadow-sm">
            <Sprout className="h-6 w-6 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display">
            Join Farm Market Kenya
          </h1>
          <p className="text-xs text-slate-500">
            Create an account to purchase produce or list your farm harvests
          </p>
        </div>

        {/* Role Toggle Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Select Account Type:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("customer")}
              className={`p-3.5 rounded-2xl border flex flex-col items-center text-center transition-all ${
                role === "customer"
                  ? "border-[#1b4332] bg-emerald-50 text-[#1b4332] ring-2 ring-[#1b4332]/20 font-bold"
                  : "border-slate-200 text-slate-600 hover:bg-[#f4f1ea]"
              }`}
            >
              <ShoppingCart className="h-5 w-5 mb-1 text-[#1b4332]" />
              <span className="text-sm">Produce Buyer</span>
              <span className="text-[10px] text-slate-400 font-normal">
                Home, restaurant or retailer
              </span>
            </button>

            <button
              type="button"
              onClick={() => setRole("farmer")}
              className={`p-3.5 rounded-2xl border flex flex-col items-center text-center transition-all ${
                role === "farmer"
                  ? "border-[#1b4332] bg-emerald-50 text-[#1b4332] ring-2 ring-[#1b4332]/20 font-bold"
                  : "border-slate-200 text-slate-600 hover:bg-[#f4f1ea]"
              }`}
            >
              <Sprout className="h-5 w-5 mb-1 text-[#d97706]" />
              <span className="text-sm">Farmer / Producer</span>
              <span className="text-[10px] text-slate-400 font-normal">
                Sell harvests directly
              </span>
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Your Full Name
            </label>
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. David Mwangi"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Email Address
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Phone (M-Pesa)
              </label>
              <Input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254 7XX XXX XXX"
              />
            </div>
          </div>

          {/* Conditional Farmer Fields */}
          {role === "farmer" && (
            <div className="p-4 rounded-2xl bg-[#fbfaf8] border border-emerald-200 space-y-3">
              <span className="text-xs font-bold text-[#1b4332] block">
                Farmer Storefront Details
              </span>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Farm Name
                </label>
                <Input
                  required
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  placeholder="e.g. Aberdare Mountain Farm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Farm Location (County)
                </label>
                <Select value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="Kiambu">Kiambu</option>
                  <option value="Nakuru">Nakuru</option>
                  <option value="Nyeri">Nyeri</option>
                  <option value="Murang'a">Murang'a</option>
                  <option value="Machakos">Machakos</option>
                  <option value="Meru">Meru</option>
                  <option value="Nairobi">Nairobi</option>
                </Select>
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Create Password
            </label>
            <Input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
            />
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            isLoading={isLoading}
            className="w-full font-bold bg-[#1b4332] hover:bg-[#143427] text-white"
          >
            Create {role === "farmer" ? "Farmer Store" : "Customer Account"}
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          <span>Already have an account? </span>
          <Link to="/login" className="font-bold text-[#1b4332] hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  )
}
