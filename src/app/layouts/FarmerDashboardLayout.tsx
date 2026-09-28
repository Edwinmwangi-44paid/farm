import { Link, Outlet, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  Boxes,
  BarChart3,
  Store,
  ArrowLeft,
  ExternalLink,
} from "lucide-react"
import { Header } from "@/components/navigation/Header"
import { Footer } from "@/components/navigation/Footer"
import { ToastContainer } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/useAuthStore"
import { cn } from "@/lib/utils"

export function FarmerDashboardLayout() {
  const location = useLocation()
  const { user } = useAuthStore()

  const navItems = [
    { name: "Overview", href: "/farmer/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/farmer/products", icon: Package },
    { name: "Add Product", href: "/farmer/products/new", icon: PlusCircle },
    { name: "Customer Orders", href: "/farmer/orders", icon: ShoppingBag },
    { name: "Inventory Alerts", href: "/farmer/inventory", icon: Boxes },
    { name: "Sales Analytics", href: "/farmer/analytics", icon: BarChart3 },
    { name: "Farm Storefront", href: "/farmer/profile", icon: Store },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfaf8]">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 py-8 flex-1">
        {/* Top Control Bar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#ede8de] shadow-sm">
          <div className="flex items-center gap-3">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#1b4332] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Public Store</span>
            </Link>

            <span className="text-slate-300">|</span>

            <div>
              <span className="text-xs bg-[#1b4332] text-white px-2.5 py-1 rounded-full font-bold">
                Farmer Portal
              </span>
              <span className="ml-2 font-bold text-slate-800 text-sm">
                Green Valley Farm (Kiambu)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/farm/green-valley-farm" target="_blank">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <span>View Public Storefront</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </Link>

            <Link to="/farmer/products/new">
              <Button variant="default" size="sm" className="gap-1.5 text-xs">
                <PlusCircle className="h-4 w-4" />
                <span>Add Product</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Farmer Sidebar Navigation */}
          <aside className="lg:col-span-3">
            <div className="rounded-2xl border border-[#ede8de] bg-white p-5 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-5 border-b border-[#f4f1ea]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Samuel Gitau"
                  className="h-12 w-12 rounded-xl object-cover border border-slate-200"
                />
                <div className="overflow-hidden">
                  <h3 className="font-bold text-slate-900 truncate">Samuel Gitau</h3>
                  <p className="text-xs text-emerald-700 font-semibold truncate">
                    Green Valley Farm
                  </p>
                  <span className="text-[10px] text-slate-400">Kiambu, Kenya</span>
                </div>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href

                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors",
                        isActive
                          ? "bg-[#1b4332] text-white shadow-sm"
                          : "text-slate-600 hover:bg-[#f4f1ea] hover:text-[#1b4332]"
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main Farmer Content */}
          <main className="lg:col-span-9">
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  )
}
