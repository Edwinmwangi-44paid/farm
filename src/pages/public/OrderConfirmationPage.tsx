import { useParams, Link } from "react-router-dom"
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Download,
  Calendar,
  MapPin,
} from "lucide-react"
import { useOrder } from "@/hooks/useOrders"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatDate } from "@/lib/utils"

export function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>()
  const { data: order, isLoading } = useOrder(id || "")

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center animate-pulse space-y-4">
        <div className="h-16 w-16 bg-[#ede8de] rounded-full mx-auto" />
        <div className="h-6 w-48 bg-[#ede8de] rounded mx-auto" />
      </div>
    )
  }

  const orderNum = order?.orderNumber || "FM-100234"
  const total = order?.total || 2450

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-3xl space-y-8">
      {/* Success Banner */}
      <div className="text-center space-y-3">
        <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="h-10 w-10 text-emerald-700" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#d97706]">
          Order Confirmed
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          Thank you for supporting local farmers!
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Your order <strong>#{orderNum}</strong> has been routed to the grower. Harvest and dispatch preparation is underway.
        </p>
      </div>

      {/* Order Progress Indicator Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#ede8de] shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#f4f1ea]">
          <div>
            <span className="text-xs text-slate-400 block">Order Number</span>
            <span className="text-base font-bold text-slate-900">#{orderNum}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Total Amount</span>
            <span className="text-base font-bold text-[#1b4332]">{formatCurrency(total)}</span>
          </div>
        </div>

        {/* 5-Stage Stepper Tracker */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Fulfillment Timeline
          </h4>
          <div className="grid grid-cols-5 gap-1 text-center">
            {["Placed", "Confirmed", "Harvesting", "On Road", "Delivered"].map((st, i) => (
              <div key={st} className="flex flex-col items-center">
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    i <= 1 ? "bg-[#1b4332] text-white" : "bg-[#f4f1ea] text-slate-400"
                  }`}
                >
                  {i < 1 ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`text-[10px] mt-1 font-semibold ${i <= 1 ? "text-slate-800" : "text-slate-400"}`}>
                  {st}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#fbfaf8] border border-[#ede8de] text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
              <Calendar className="h-3.5 w-3.5" />
              <span>Estimated Delivery Window</span>
            </div>
            <p className="font-bold text-slate-800">
              Tomorrow afternoon (1:00 PM - 5:00 PM)
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
              <MapPin className="h-3.5 w-3.5" />
              <span>Delivery Address</span>
            </div>
            <p className="font-bold text-slate-800">
              {order?.deliveryAddress ? `${order.deliveryAddress.street}, ${order.deliveryAddress.town}` : "Valley View Court, Kilimani, Nairobi"}
            </p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link to="/account/orders" className="w-full sm:w-1/2">
            <Button variant="default" className="w-full gap-2">
              <Package className="h-4 w-4" />
              <span>Track in Account Orders</span>
            </Button>
          </Link>

          <Link to="/marketplace" className="w-full sm:w-1/2">
            <Button variant="secondary" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
