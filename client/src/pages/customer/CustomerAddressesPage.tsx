import * as React from "react"
import { MapPin, Plus, Check, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Dialog } from "@/components/ui/dialog"
import { Address } from "@/types"
import { MOCK_ADDRESSES } from "@/services/mock/users"
import { toast } from "@/components/ui/toast"

export function CustomerAddressesPage() {
  const [addresses, setAddresses] = React.useState<Address[]>([...MOCK_ADDRESSES])
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  // New Address state
  const [fullName, setFullName] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [county, setCounty] = React.useState("Nairobi")
  const [town, setTown] = React.useState("")
  const [street, setStreet] = React.useState("")
  const [building, setBuilding] = React.useState("")
  const [deliveryNotes, setDeliveryNotes] = React.useState("")

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault()
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      userId: "user-cust-1",
      fullName,
      phone,
      county,
      town,
      street,
      building,
      isDefault: addresses.length === 0,
      deliveryNotes,
    }

    setAddresses([...addresses, newAddr])
    setIsModalOpen(false)
    toast.success("Address Saved", "Your delivery location has been updated.")

    // Reset
    setFullName("")
    setPhone("")
    setTown("")
    setStreet("")
    setBuilding("")
    setDeliveryNotes("")
  }

  const setDefaultAddress = (id: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    )
    toast.info("Default Address Set", "Your primary delivery address was changed.")
  }

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id))
    toast.info("Address Deleted", "Location removed from your address book.")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display">
            Saved Delivery Addresses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage your residential and office delivery locations
          </p>
        </div>

        <Button
          variant="default"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="gap-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>Add Address</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-5 rounded-3xl border bg-white shadow-sm space-y-3 relative transition-all ${
              addr.isDefault
                ? "border-[#1b4332] ring-2 ring-[#1b4332]/10"
                : "border-[#ede8de]"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#1b4332]" />
                <h3 className="font-bold text-slate-900 text-sm">{addr.fullName}</h3>
              </div>

              {addr.isDefault && (
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  DEFAULT
                </span>
              )}
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <p>{addr.street}, {addr.building}</p>
              <p>{addr.town}, {addr.county}</p>
              <p>Phone: {addr.phone}</p>
              {addr.deliveryNotes && (
                <p className="text-slate-400 italic pt-1">"{addr.deliveryNotes}"</p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              {!addr.isDefault ? (
                <button
                  onClick={() => setDefaultAddress(addr.id)}
                  className="text-xs font-semibold text-[#1b4332] hover:underline"
                >
                  Set as Default
                </button>
              ) : (
                <span className="text-xs text-emerald-700 font-semibold">Primary Address</span>
              )}

              <button
                onClick={() => deleteAddress(addr.id)}
                className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                aria-label="Delete address"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Delivery Address"
        description="Provide your residence or workplace location for courier dispatch."
      >
        <form onSubmit={handleAddAddress} className="space-y-3 pt-2">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Contact Name
            </label>
            <Input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Amina Hassan"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Phone Number
              </label>
              <Input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254 7XX XXX XXX"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                County
              </label>
              <Select value={county} onChange={(e) => setCounty(e.target.value)}>
                <option value="Nairobi">Nairobi</option>
                <option value="Kiambu">Kiambu</option>
                <option value="Nakuru">Nakuru</option>
                <option value="Nyeri">Nyeri</option>
                <option value="Machakos">Machakos</option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Town / Estate
              </label>
              <Input
                required
                value={town}
                onChange={(e) => setTown(e.target.value)}
                placeholder="e.g. Kilimani"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Street / Road
              </label>
              <Input
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="e.g. Argwings Kodhek"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Building / House No.
            </label>
            <Input
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              placeholder="e.g. Valley View Court, Apt 4B"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Instructions
            </label>
            <Input
              value={deliveryNotes}
              onChange={(e) => setDeliveryNotes(e.target.value)}
              placeholder="e.g. Call at gate"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Save Address
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}
