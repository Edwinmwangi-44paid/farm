import { Link } from "react-router-dom"
import {
  Package,
  Heart,
  MapPin,
  Clock,
  ArrowRight,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCustomerOrders } from "@/hooks/useOrders"
import { useFavoritesStore } from "@/stores/useFavoritesStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { formatCurrency, formatDate } from "@/lib/utils"

export function CustomerDashboardPage() {
  const { user } = useAuthStore()
  const { data: orders, isLoading } = useCustomerOrders(user?.id)
  const { productIds } = useFavoritesStore()

  const recentOrder = orders && orders.length > 0 ? orders[0] : null

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-white border border-[#ede8de] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#d97706]">
            Customer Account
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-0.5">
            Jambo, {user?.name || "Customer"}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your farm-direct produce, view past orders, and manage your delivery addresses.
          </p>
        </div>

        <Link to="/marketplace">
          <Button variant="default" className="gap-2 shrink-0 font-bold">
            <ShoppingBag className="h-4 w-4" />
            <span>Browse Fresh Crops</span>
          </Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#ede8de] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Orders</span>
            <Package className="h-4 w-4 text-[#1b4332]" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-display">
            {orders ? orders.length : 0}
          </div>
          <p className="text-[11px] text-slate-500">Delivered straight to you</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#ede8de] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Saved Produce</span>
            <Heart className="h-4 w-4 text-rose-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-display">
            {productIds.length}
          </div>
          <p className="text-[11px] text-slate-500">In your favorite list</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#ede8de] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Default Delivery</span>
            <MapPin className="h-4 w-4 text-emerald-700" />
          </div>
          <div className="text-sm font-bold text-slate-900 truncate">
            Kilimani, Nairobi
          </div>
          <p className="text-[11px] text-slate-500">Valley View Court</p>
        </div>
      </div>

      {/* Recent Active Order Preview */}
      {recentOrder && (
        <div className="rounded-3xl bg-white border border-[#ede8de] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#f4f1ea]">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#1b4332]" />
              <h3 className="font-bold text-slate-900 text-sm">Most Recent Harvest Order</h3>
            </div>
            <Link
              to={`/account/orders`}
              className="text-xs font-bold text-[#1b4332] hover:underline"
            >
              All Orders →
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">#{recentOrder.orderNumber}</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full capitalize">
                  {recentOrder.status.replace("_", " ")}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Placed on {formatDate(recentOrder.createdAt)} • {recentOrder.items.length} items
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-[#1b4332]">
                {formatCurrency(recentOrder.total)}
              </span>

              <Link to="/account/orders">
                <Button variant="outline" size="sm" className="text-xs gap-1">
                  <span>Track Status</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
