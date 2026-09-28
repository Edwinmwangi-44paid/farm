import * as React from "react"
import { Package, Clock, CheckCircle2, ChevronRight, MapPin } from "lucide-react"
import { useFarmerOrders, useUpdateOrderStatus } from "@/hooks/useOrders"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { formatCurrency, formatDate } from "@/lib/utils"
import { toast } from "@/components/ui/toast"
import { OrderStatus } from "@/types"

export function FarmerOrdersPage() {
  const { data: orders, isLoading, refetch } = useFarmerOrders()
  const updateStatusMutation = useUpdateOrderStatus()

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ orderId, status: newStatus })
      toast.success("Order Updated", `Status updated to ${newStatus.replace("_", " ")}`)
      refetch()
    } catch {
      toast.error("Error", "Failed to update order status.")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-display">
          Customer Orders Fulfillment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Manage packing, harvest scheduling, and dispatch handoffs
        </p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="p-8 text-center text-slate-400 bg-white rounded-3xl border">
            Loading orders...
          </div>
        ) : !orders || orders.length === 0 ? (
          <div className="p-8 text-center text-slate-400 bg-white rounded-3xl border">
            No received customer orders at this moment.
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl border border-[#ede8de] bg-white p-5 sm:p-6 shadow-sm space-y-4"
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f4f1ea]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-base">
                      Order #{order.orderNumber}
                    </span>
                    <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full capitalize">
                      {order.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Customer: <strong>{order.customerName}</strong> ({order.customerPhone}) • Placed on {formatDate(order.createdAt)}
                  </p>
                </div>

                {/* Status Updater Select */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                    Update Status:
                  </span>
                  <div className="w-48">
                    <Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className="text-xs font-semibold"
                    >
                      <option value="order_placed">Order Placed</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing (Harvesting)</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#fbfaf8] border border-slate-200 p-3 text-xs space-y-2">
                  <span className="font-bold text-slate-700 block">Harvest Items Ordered:</span>
                  {order.items.map((i) => (
                    <div key={i.id} className="flex justify-between items-center py-1">
                      <span className="text-slate-800">
                        {i.quantity} {i.unit} of <strong>{i.productName}</strong>
                      </span>
                      <span className="font-semibold text-slate-900">{formatCurrency(i.totalPrice)}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                    <span>Order Total:</span>
                    <span className="text-[#1b4332]">{formatCurrency(order.total)}</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#fbfaf8] border border-slate-200 p-3 text-xs space-y-1.5">
                  <span className="font-bold text-slate-700 block">Dispatch Destination:</span>
                  <div className="flex items-start gap-1.5 text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-800">{order.deliveryAddress.fullName}</p>
                      <p>{order.deliveryAddress.street}, {order.deliveryAddress.building}</p>
                      <p>{order.deliveryAddress.town}, {order.deliveryAddress.county}</p>
                      <p>Phone: {order.deliveryAddress.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
