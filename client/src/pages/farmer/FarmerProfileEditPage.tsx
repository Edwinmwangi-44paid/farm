import * as React from "react"
import { Store, MapPin, CheckCircle2, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { toast } from "@/components/ui/toast"

export function FarmerProfileEditPage() {
  const [farmName, setFarmName] = React.useState("Green Valley Farm")
  const [operatorName, setOperatorName] = React.useState("Samuel Gitau")
  const [location, setLocation] = React.useState("Kiambu, Kenya")
  const [tagline, setTagline] = React.useState(
    "Sustainable highland horticulture and fresh organic produce"
  )
  const [description, setDescription] = React.useState(
    "Green Valley Farm spans 25 acres in the fertile volcanic red soils of Kiambu. We specialize in pesticide-free greenhouse tomatoes, leafy greens, and organic free-range poultry using rainwater harvesting and drip irrigation."
  )
  const [phone, setPhone] = React.useState("+254 712 345 678")
  const [email, setEmail] = React.useState("info@greenvalleyfarm.co.ke")

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Farm Storefront Updated", "Your changes are now visible to buyers.")
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-display">
          Farm Storefront Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Customize your public farmer profile, practices, and contact details
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="rounded-3xl border border-[#ede8de] bg-white p-6 sm:p-8 shadow-sm space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Farm Name
            </label>
            <Input value={farmName} onChange={(e) => setFarmName(e.target.value)} required />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Primary Grower / Operator
            </label>
            <Input value={operatorName} onChange={(e) => setOperatorName(e.target.value)} required />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Storefront Tagline
          </label>
          <Input value={tagline} onChange={(e) => setTagline(e.target.value)} required />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Farm Bio & Story
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:ring-2 focus:ring-[#1b4332] focus:outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Location
            </label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Official Phone
            </label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Official Email
            </label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button type="submit" variant="default" className="font-bold bg-[#1b4332] hover:bg-[#143427]">
            Save Storefront Details
          </Button>
        </div>
      </form>
    </div>
  )
}
