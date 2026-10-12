import { Link } from "react-router-dom"
import {
  TrendingUp,
  Package,
  ShoppingBag,
  AlertTriangle,
  ArrowUpRight,
  PlusCircle,
  Clock,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardSkeleton } from "@/components/common/Skeletons"
import { useFarmerStats } from "@/hooks/useFarmers"
import { useCustomerOrders } from "@/hooks/useOrders"
import { formatCurrency, formatDate } from "@/lib/utils"

export function FarmerDashboardPage() {
  const { data: stats, isLoading } = useFarmerStats()
  const { data: orders } = useCustomerOrders()

  if (isLoading || !stats) {
    return <DashboardSkeleton />
  }

  // Monthly sales max for bar calculation
  const maxSales = Math.max(...stats.monthlySales.map((m) => m.sales))

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#ede8de] shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#d97706]">
            Grower Operations Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-0.5">
            Farm Overview & Performance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time harvest orders, revenue trajectory, and inventory monitoring
          </p>
        </div>

        <Link to="/farmer/products/new">
          <Button variant="default" className="gap-2 shrink-0 font-bold">
            <PlusCircle className="h-4 w-4" />
            <span>List New Crop</span>
          </Button>
        </Link>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <div className="p-5 rounded-2xl bg-white border border-[#ede8de] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Sales</span>
            <span className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              +{stats.salesChangePercentage}%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {formatCurrency(stats.totalSales)}
          </div>
          <p className="text-[11px] text-slate-500">Net revenue this agricultural quarter</p>
        </div>

        {/* Orders */}
        <div className="p-5 rounded-2xl bg-white border border-[#ede8de] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Orders</span>
            <ShoppingBag className="h-4 w-4 text-[#1b4332]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {stats.totalOrders}
          </div>
          <p className="text-[11px] text-slate-500">Fulfilled farm harvest requests</p>
        </div>

        {/* Products */}
        <div className="p-5 rounded-2xl bg-white border border-[#ede8de] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Products</span>
            <Package className="h-4 w-4 text-emerald-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {stats.totalProducts}
          </div>
          <p className="text-[11px] text-slate-500">Active produce listings online</p>
        </div>

        {/* Pending Orders */}
        <div className="p-5 rounded-2xl bg-white border border-[#ede8de] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Orders</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-display">
            {stats.pendingOrders}
          </div>
          <p className="text-[11px] text-slate-500">Awaiting harvest & packing dispatch</p>
        </div>
      </div>

      {/* Grid: Sales Trend Chart & Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sales Chart */}
        <div className="lg:col-span-8 rounded-3xl border border-[#ede8de] bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Sales Revenue Trend (KES)</h3>
              <p className="text-xs text-slate-500">Monthly direct sales through Farm Market</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              Year 2026
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-6 pb-2">
            <div className="flex items-end justify-between gap-4 h-56 px-2">
              {stats.monthlySales.map((item) => {
                const heightPercentage = Math.round((item.sales / maxSales) * 100)
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      {Math.round(item.sales / 1000)}k
                    </div>
                    <div className="w-full bg-[#f4f1ea] rounded-t-xl h-44 flex items-end overflow-hidden">
                      <div
                        style={{ height: `${heightPercentage}%` }}
                        className="w-full bg-[#1b4332] group-hover:bg-[#2d6a4f] transition-all rounded-t-lg"
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-600">{item.month}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Inventory Alerts Sidebar */}
        <div className="lg:col-span-4 rounded-3xl border border-[#ede8de] bg-white p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-base">Inventory Alerts</h3>
            </div>
            <Link
              to="/farmer/inventory"
              className="text-xs font-bold text-[#1b4332] hover:underline"
            >
              All →
            </Link>
          </div>

          <div className="space-y-3">
            {stats.inventoryAlerts.map((alert) => (
              <div
                key={alert.productId}
                className="p-3.5 rounded-2xl border border-amber-200 bg-amber-50/50 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {alert.productName}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full">
                    {alert.status}
                  </span>
                </div>
                <div className="text-xs text-slate-600">
                  Remaining: <strong>{alert.currentStock} {alert.unit}</strong>
                </div>
                <Link
                  to={`/farmer/products`}
                  className="text-[11px] font-bold text-[#1b4332] hover:underline inline-block pt-1"
                >
                  Update Inventory Quantity →
                </Link>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-[#fbfaf8] border border-slate-200 text-xs text-slate-500">
            Automated alerts trigger when stock falls below 15% of regular weekly harvest volume.
          </div>
        </div>
      </div>

      {/* Popular Products & Recent Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Popular Products */}
        <div className="lg:col-span-6 rounded-3xl border border-[#ede8de] bg-white p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Top Selling Produce</h3>
            <Link to="/farmer/products" className="text-xs font-bold text-[#1b4332] hover:underline">
              Manage Catalog →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {stats.topProducts.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{p.name}</h4>
                  <span className="text-slate-400">Sold: {p.quantitySold} units</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#1b4332] text-sm block">
                    {formatCurrency(p.revenue)}
                  </span>
                  <span className="text-slate-400 text-[11px]">{p.stock} in stock</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders Table Snippet */}
        <div className="lg:col-span-6 rounded-3xl border border-[#ede8de] bg-white p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Recent Orders Received</h3>
            <Link to="/farmer/orders" className="text-xs font-bold text-[#1b4332] hover:underline">
              Fulfill Orders →
            </Link>
          </div>

          <div className="space-y-3">
            {orders?.slice(0, 3).map((ord) => (
              <div
                key={ord.id}
                className="p-3.5 rounded-2xl bg-[#fbfaf8] border border-[#ede8de] flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">#{ord.orderNumber}</span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full capitalize">
                      {ord.status.replace("_", " ")}
                    </span>
                  </div>
                  <span className="text-slate-500 mt-1 block">
                    {ord.customerName} • {ord.items.length} items
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-bold text-[#1b4332] text-sm block">
                    {formatCurrency(ord.total)}
                  </span>
                  <span className="text-[10px] text-slate-400">{formatDate(ord.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
