import * as React from "react"
import { Bell, Shield, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"

export function CustomerSettingsPage() {
  const [smsAlerts, setSmsAlerts] = React.useState(true)
  const [emailAlerts, setEmailAlerts] = React.useState(true)
  const [harvestDigest, setHarvestDigest] = React.useState(false)

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Preferences Saved", "Your notification settings have been updated.")
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-display">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Control notification alerts, order updates, and security credentials
        </p>
      </div>

      {/* Notification Preferences */}
      <div className="rounded-3xl border border-[#ede8de] bg-white p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#f4f1ea]">
          <Bell className="h-5 w-5 text-[#1b4332]" />
          <h2 className="text-base font-bold text-slate-900">Notification Preferences</h2>
        </div>

        <form onSubmit={handleSaveNotifications} className="space-y-4 text-xs">
          <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-[#fbfaf8]">
            <div>
              <span className="font-bold text-slate-800 block text-sm">SMS Delivery Alerts</span>
              <span className="text-slate-400">Receive dispatch and rider tracking texts via Safaricom</span>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="h-4 w-4 rounded text-[#1b4332] focus:ring-[#1b4332]"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-[#fbfaf8]">
            <div>
              <span className="font-bold text-slate-800 block text-sm">Order Confirmation Emails</span>
              <span className="text-slate-400">Receive digital receipts and invoice breakdowns</span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="h-4 w-4 rounded text-[#1b4332] focus:ring-[#1b4332]"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-[#fbfaf8]">
            <div>
              <span className="font-bold text-slate-800 block text-sm">Weekly Seasonal Harvest Digest</span>
              <span className="text-slate-400">Get notified when new seasonal crops peak in harvest</span>
            </div>
            <input
              type="checkbox"
              checked={harvestDigest}
              onChange={(e) => setHarvestDigest(e.target.checked)}
              className="h-4 w-4 rounded text-[#1b4332] focus:ring-[#1b4332]"
            />
          </label>

          <Button type="submit" variant="default" size="sm">
            Save Preferences
          </Button>
        </form>
      </div>

      {/* Security & Password */}
      <div className="rounded-3xl border border-[#ede8de] bg-white p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#f4f1ea]">
          <Lock className="h-5 w-5 text-[#1b4332]" />
          <h2 className="text-base font-bold text-slate-900">Change Password</h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            toast.success("Security Updated", "Your password has been changed.")
          }}
          className="space-y-3"
        >
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Current Password
            </label>
            <Input type="password" required placeholder="••••••••" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              New Password
            </label>
            <Input type="password" required placeholder="••••••••" />
          </div>
          <Button type="submit" variant="outline" size="sm">
            Update Password
          </Button>
        </form>
      </div>
    </div>
  )
}
