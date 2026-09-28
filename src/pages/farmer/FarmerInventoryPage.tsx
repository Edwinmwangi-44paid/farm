import { Link } from "react-router-dom"
import { Boxes, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react"
import { useProducts } from "@/hooks/useProducts"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

export function FarmerInventoryPage() {
  const { data: productsData, isLoading } = useProducts({ limit: 50 })

  const items = productsData?.items || []
  const lowStockItems = items.filter((i) => i.availableQuantity < 50)
  const outOfStockItems = items.filter((i) => i.availableQuantity === 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-display">
          Inventory & Harvest Stocks
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Track harvest storage capacity, stock depletion rates, and restock triggers
        </p>
      </div>

      {/* Stock Health Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#ede8de] shadow-sm">
          <span className="text-xs text-slate-400 block font-medium">Total Tracked Produce</span>
          <span className="text-2xl font-extrabold text-slate-900 font-display mt-1 block">
            {items.length} Varieties
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold">Active crops in season</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#ede8de] shadow-sm">
          <span className="text-xs text-slate-400 block font-medium">Low Stock Notice</span>
          <span className="text-2xl font-extrabold text-amber-600 font-display mt-1 block">
            {lowStockItems.length} Crops
          </span>
          <span className="text-[11px] text-amber-800 font-semibold">Under 50 units remaining</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#ede8de] shadow-sm">
          <span className="text-xs text-slate-400 block font-medium">Out of Stock</span>
          <span className="text-2xl font-extrabold text-red-600 font-display mt-1 block">
            {outOfStockItems.length} Crops
          </span>
          <span className="text-[11px] text-red-700 font-semibold">Listing currently paused</span>
        </div>
      </div>

      {/* Inventory Breakdown List */}
      <div className="rounded-3xl border border-[#ede8de] bg-white overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#ede8de] bg-[#fbfaf8] flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Harvest Stock Records</h3>
          <Link to="/farmer/products">
            <Button variant="outline" size="sm" className="text-xs">
              Manage Listings
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {items.map((prod) => (
            <div key={prod.id} className="p-4 flex items-center justify-between hover:bg-[#fbfaf8]">
              <div className="flex items-center gap-3">
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="h-10 w-10 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{prod.name}</h4>
                  <span className="text-slate-400 block text-[11px]">
                    {prod.category.name} • Harvested {prod.harvestDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="font-bold text-slate-900 block text-sm">
                    {prod.availableQuantity} {prod.unit}s
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      prod.availableQuantity > 50
                        ? "bg-emerald-100 text-emerald-800"
                        : prod.availableQuantity > 0
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {prod.availableQuantity > 50
                      ? "Healthy Stock"
                      : prod.availableQuantity > 0
                      ? "Low Stock"
                      : "Depleted"}
                  </span>
                </div>

                <Link to={`/farmer/products/edit/${prod.id}`}>
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    Update Qty
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
