import { Link, Outlet, useLocation } from "react-router-dom"
import {
  User as UserIcon,
  Package,
  Heart,
  MapPin,
  Settings,
  ArrowLeft,
  LayoutDashboard,
  LogOut,
} from "lucide-react"
import { Header } from "@/components/navigation/Header"
import { Footer } from "@/components/navigation/Footer"
import { ToastContainer } from "@/components/ui/toast"
import { useAuthStore } from "@/stores/useAuthStore"
import { cn } from "@/lib/utils"

export function CustomerDashboardLayout() {
  const location = useLocation()
  const { user, logout } = useAuthStore()

  const navItems = [
    { name: "Overview", href: "/account", icon: LayoutDashboard, exact: true },
    { name: "My Orders", href: "/account/orders", icon: Package },
    { name: "Favorite Produce", href: "/account/favorites", icon: Heart },
    { name: "Saved Addresses", href: "/account/addresses", icon: MapPin },
    { name: "My Profile", href: "/account/profile", icon: UserIcon },
    { name: "Settings", href: "/account/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfaf8]">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 py-8 flex-1">
        {/* Breadcrumb / Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#1b4332] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Marketplace</span>
          </Link>

          <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">
            Customer Account
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="rounded-2xl border border-[#ede8de] bg-white p-5 shadow-sm space-y-6">
              {/* Customer Profile Snippet */}
              <div className="flex items-center gap-3 pb-5 border-b border-[#f4f1ea]">
                <div className="h-12 w-12 rounded-full bg-[#1b4332] text-white flex items-center justify-center font-bold text-sm">
                  {user?.name?.slice(0, 2).toUpperCase() || "CU"}
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-slate-900 truncate">{user?.name || "Customer"}</h3>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = item.exact
                    ? location.pathname === item.href
                    : location.pathname.startsWith(item.href)

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

                <button
                  onClick={() => logout()}
                  className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors mt-4"
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  <span>Log Out</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Dashboard Content */}
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
