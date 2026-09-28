import * as React from "react"
import { Package, Truck, CheckCircle2, Clock, MapPin, ChevronDown, ChevronUp } from "lucide-react"
import { useCustomerOrders } from "@/hooks/useOrders"
import { EmptyState } from "@/components/common/EmptyState"
import { TableSkeleton } from "@/components/common/Skeletons"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatDate } from "@/lib/utils"
import { OrderStatus } from "@/types"

const ORDER_STAGES: { key: OrderStatus; label: string }[] = [
  { key: "order_placed", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "processing", label: "Processing" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
]

function getStageIndex(status: OrderStatus): number {
  switch (status) {
    case "order_placed":
      return 0
    case "confirmed":
      return 1
    case "processing":
      return 2
    case "out_for_delivery":
      return 3
    case "delivered":
      return 4
    default:
      return 0
  }
}

export function CustomerOrdersPage() {
  const { data: orders, isLoading } = useCustomerOrders()
  const [expandedOrderId, setExpandedOrderId] = React.useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id)
  }

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-3xl border border-[#ede8de]">
        <TableSkeleton rows={3} cols={4} />
      </div>
    )
  }

  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No orders yet"
        description="When you purchase fresh produce directly from farmers, your order progress and receipt will appear here."
      />
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-display">
          My Farm Orders
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Track fulfillment from harvest to your doorstep
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const currentStage = getStageIndex(order.status)
          const isExpanded = expandedOrderId === order.id

          return (
            <div
              key={order.id}
              className="rounded-3xl border border-[#ede8de] bg-white p-5 sm:p-6 shadow-sm space-y-6 transition-all"
            >
              {/* Order Header Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f4f1ea]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-slate-900">
                      Order #{order.orderNumber}
                    </span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full capitalize">
                      {order.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Placed on {formatDate(order.createdAt)} • Payment: {order.paymentMethod.toUpperCase()}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-medium">Total</span>
                    <span className="text-base sm:text-lg font-extrabold text-[#1b4332]">
                      {formatCurrency(order.total)}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleExpand(order.id)}
                    className="text-xs h-9 gap-1"
                  >
                    <span>{isExpanded ? "Hide" : "Details"}</span>
                    {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </Button>
                </div>
              </div>

              {/* Visual 5-Stage Order Progress Indicator */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Delivery Progress Indicator:
                </span>

                <div className="grid grid-cols-5 gap-1 text-center py-2">
                  {ORDER_STAGES.map((stage, idx) => {
                    const isPassed = currentStage >= idx
                    const isCurrent = currentStage === idx

                    return (
                      <div key={stage.key} className="flex flex-col items-center">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCurrent
                              ? "bg-[#1b4332] text-white ring-4 ring-emerald-100 shadow-sm"
                              : isPassed
                              ? "bg-emerald-600 text-white"
                              : "bg-[#f4f1ea] text-slate-400 border border-slate-200"
                          }`}
                        >
                          {isPassed ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                        </div>
                        <span
                          className={`text-[10px] sm:text-xs mt-1.5 font-semibold leading-tight ${
                            isCurrent
                              ? "text-slate-900 font-bold"
                              : isPassed
                              ? "text-emerald-700"
                              : "text-slate-400"
                          }`}
                        >
                          {stage.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Collapsible Order Itemized Breakdown */}
              {isExpanded && (
                <div className="pt-4 border-t border-[#f4f1ea] space-y-4 animate-fade-in text-xs">
                  <h4 className="font-bold text-slate-900">Itemized Produce Breakdown</h4>

                  <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-[#fbfaf8] p-3 space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between pt-2 first:pt-0">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">{item.productName}</span>
                            <span className="text-slate-500">
                              {item.quantity} {item.unit} • {item.farmerName}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-bold text-slate-900 block">
                            {formatCurrency(item.totalPrice)}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {formatCurrency(item.unitPrice)} / {item.unit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Location & Notes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-white rounded-xl border border-slate-200">
                    <div>
                      <span className="text-slate-400 block font-medium">Delivery Address</span>
                      <p className="font-semibold text-slate-800">
                        {order.deliveryAddress.street}, {order.deliveryAddress.town}, {order.deliveryAddress.county}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Payment Verification</span>
                      <p className="font-semibold text-slate-800">
                        Receipt: {order.mpesaReceiptNumber || "CONFIRMED"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
