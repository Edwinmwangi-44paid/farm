import * as React from "react"
import { User as UserIcon, Mail, Phone, ShieldCheck } from "lucide-react"
import { useAuthStore } from "@/stores/useAuthStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"

export function CustomerProfilePage() {
  const { user, setUser } = useAuthStore()

  const [name, setName] = React.useState(user?.name || "Amina Hassan")
  const [email, setEmail] = React.useState(user?.email || "customer@farmmarket.co.ke")
  const [phone, setPhone] = React.useState(user?.phone || "+254 712 998 877")

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      setUser({
        ...user,
        name,
        email,
        phone,
      })
    }
    toast.success("Profile Updated", "Your contact details have been saved.")
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-display">
          Personal Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Manage your contact credentials and marketplace account details
        </p>
      </div>

      <div className="rounded-3xl border border-[#ede8de] bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Full Name
            </label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Email Address
            </label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Phone Number (M-Pesa)
            </label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="default">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
