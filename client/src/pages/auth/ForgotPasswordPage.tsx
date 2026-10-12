import * as React from "react"
import { Link } from "react-router-dom"
import { Sprout, Mail, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 max-w-md">
      <div className="rounded-3xl border border-[#ede8de] bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-[#1b4332] text-white flex items-center justify-center mx-auto shadow-sm">
            <Sprout className="h-6 w-6 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display">
            Reset Password
          </h1>
          <p className="text-xs text-slate-500">
            Enter your account email to receive a password reset link
          </p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900">Check your inbox</h3>
            <p className="text-xs text-slate-500">
              We've sent a secure password reset link to <strong>{email}</strong>.
            </p>
            <Link to="/login">
              <Button variant="outline" className="mt-2 text-xs">
                Back to Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <Button type="submit" variant="default" className="w-full font-bold">
              Send Reset Link
            </Button>

            <div className="pt-2 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#1b4332]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
