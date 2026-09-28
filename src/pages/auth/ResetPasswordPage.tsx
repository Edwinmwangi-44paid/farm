import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Sprout, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Password mismatch", "Passwords do not match.")
      return
    }
    toast.success("Password Updated", "You can now log in with your new password.")
    navigate("/login")
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 max-w-md">
      <div className="rounded-3xl border border-[#ede8de] bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-[#1b4332] text-white flex items-center justify-center mx-auto shadow-sm">
            <Sprout className="h-6 w-6 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display">
            Set New Password
          </h1>
          <p className="text-xs text-slate-500">
            Please enter and confirm your new secure password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              New Password
            </label>
            <div className="relative">
              <Input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-9"
              />
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-9"
              />
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            </div>
          </div>

          <Button type="submit" variant="default" className="w-full font-bold">
            Update Password & Login
          </Button>
        </form>
      </div>
    </div>
  )
}
