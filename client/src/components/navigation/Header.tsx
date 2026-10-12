import * as React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  Sprout,
  User as UserIcon,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Package,
  Layers,
  ArrowRight,
} from "lucide-react"
import { useCartStore } from "@/stores/useCartStore"
import { useFavoritesStore } from "@/stores/useFavoritesStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { formatCurrency, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MOCK_CATEGORIES } from "@/services/mock/categories"

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { getItemCount, getSubtotal } = useCartStore()
  const { productIds } = useFavoritesStore()
  const { user, isAuthenticated, logout, switchRole } = useAuthStore()

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [categoriesOpen, setCategoriesOpen] = React.useState(false)
  const [userMenuOpen, setUserMenuOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchModalOpen, setSearchModalOpen] = React.useState(false)

  const cartCount = getItemCount()
  const cartSubtotal = getSubtotal()
  const favoritesCount = productIds.length

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchModalOpen(false)
      setMobileMenuOpen(false)
    }
  }

  // Close menus on route change
  React.useEffect(() => {
    setMobileMenuOpen(false)
    setCategoriesOpen(false)
    setUserMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-[#1b4332] text-[#d8f3dc] text-xs py-1.5 px-4 font-medium">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Farm-direct fresh harvests from Kiambu, Nakuru, Nyeri & Murang'a</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px]">
            <span>Free delivery on orders over KES 3,500</span>
            <span className="text-emerald-300">|</span>
            {/* Quick Demo Persona Switcher */}
            <div className="flex items-center gap-1.5 bg-black/20 px-2 py-0.5 rounded-full">
              <span className="text-white/70">Role:</span>
              <button
                onClick={() => switchRole(user?.role === "farmer" ? "customer" : "farmer")}
                className="underline hover:text-white font-semibold transition-colors"
                title="Click to toggle between Customer and Farmer demo views"
              >
                {user?.role === "farmer" ? "👨‍🌾 Farmer View" : "🛒 Customer View"} (Switch)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b border-[#ede8de] bg-[#fbfaf8]/95 backdrop-blur-md transition-all">
        <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4 sm:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1b4332] text-white shadow-sm transition-transform group-hover:scale-105">
              <Sprout className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-display">
                Farm<span className="text-[#1b4332]">Market</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-[#d97706] -mt-1">
                Kenya
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <Link
              to="/marketplace"
              className={cn(
                "transition-colors hover:text-[#1b4332]",
                location.pathname === "/marketplace" && "text-[#1b4332] font-bold"
              )}
            >
              Marketplace
            </Link>

            {/* Categories Flyout */}
            <div className="relative">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                onMouseEnter={() => setCategoriesOpen(true)}
                className="flex items-center gap-1 transition-colors hover:text-[#1b4332] py-2"
              >
                <span>Categories</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", categoriesOpen && "rotate-180")} />
              </button>

              {categoriesOpen && (
                <div
                  onMouseLeave={() => setCategoriesOpen(false)}
                  className="absolute left-0 top-full w-80 rounded-2xl bg-white p-3 shadow-xl border border-[#ede8de] animate-slide-down grid grid-cols-2 gap-1 z-50"
                >
                  {MOCK_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/marketplace?category=${cat.slug}`}
                      className="flex items-center gap-2.5 rounded-xl p-2 hover:bg-[#f4f1ea] transition-colors text-xs text-slate-700 hover:text-[#1b4332] font-medium"
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="h-8 w-8 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-semibold text-slate-900 leading-tight">{cat.name}</div>
                        <div className="text-[10px] text-slate-400">{cat.productCount} items</div>
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-2 pt-2 border-t border-slate-100 text-center">
                    <Link
                      to="/marketplace"
                      className="text-xs font-semibold text-[#1b4332] hover:underline"
                    >
                      Browse all produce →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/farmers"
              className={cn(
                "transition-colors hover:text-[#1b4332]",
                location.pathname === "/farmers" && "text-[#1b4332] font-bold"
              )}
            >
              Farmers
            </Link>

            <Link
              to="/how-it-works"
              className={cn(
                "transition-colors hover:text-[#1b4332]",
                location.pathname === "/how-it-works" && "text-[#1b4332] font-bold"
              )}
            >
              How It Works
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-2">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search tomatoes, avocados, eggs, farmers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-[#ded7ca] bg-white px-4 py-2 pl-10 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:border-transparent transition-all shadow-inner"
              />
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            </form>
          </div>

          {/* Right Action Icons (Favorites, Cart, Account) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Favorites Icon */}
            <Link
              to="/account/favorites"
              className="relative hidden sm:flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-[#f4f1ea] hover:text-[#1b4332] transition-colors"
              aria-label="Favorites"
            >
              <Heart className="h-5 w-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Cart Icon & Mini Summary */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 rounded-full border border-[#ede8de] bg-white px-3 py-1.5 shadow-sm hover:border-[#1b4332] hover:shadow transition-all group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-slate-700 group-hover:text-[#1b4332] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#1b4332] px-1 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-[10px] text-slate-400 font-medium leading-none">Basket</span>
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  {formatCurrency(cartSubtotal)}
                </span>
              </div>
            </Link>

            {/* User Account / Dropdown */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-full p-1 hover:bg-[#f4f1ea] transition-colors"
                  aria-label="User menu"
                >
                  <div className="h-9 w-9 rounded-full bg-[#1b4332] text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                    {user.name.slice(0, 2)}
                  </div>
                  <ChevronDown className="hidden sm:block h-3.5 w-3.5 text-slate-500" />
                </button>

                {userMenuOpen && (
                  <div
                    onMouseLeave={() => setUserMenuOpen(false)}
                    className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl border border-[#ede8de] animate-slide-down z-50"
                  >
                    <div className="p-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full capitalize">
                        {user.role} Account
                      </span>
                    </div>

                    <div className="py-1">
                      {user.role === "farmer" ? (
                        <>
                          <Link
                            to="/farmer/dashboard"
                            className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-[#f4f1ea] hover:text-[#1b4332]"
                          >
                            <LayoutDashboard className="h-4 w-4" />
                            <span>Farmer Dashboard</span>
                          </Link>
                          <Link
                            to="/farmer/products"
                            className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-[#f4f1ea] hover:text-[#1b4332]"
                          >
                            <Package className="h-4 w-4" />
                            <span>My Products</span>
                          </Link>
                          <Link
                            to="/farmer/orders"
                            className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-[#f4f1ea] hover:text-[#1b4332]"
                          >
                            <Layers className="h-4 w-4" />
                            <span>Farmer Orders</span>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/account"
                            className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-[#f4f1ea] hover:text-[#1b4332]"
                          >
                            <UserIcon className="h-4 w-4" />
                            <span>Customer Dashboard</span>
                          </Link>
                          <Link
                            to="/account/orders"
                            className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-[#f4f1ea] hover:text-[#1b4332]"
                          >
                            <Package className="h-4 w-4" />
                            <span>My Orders</span>
                          </Link>
                          <Link
                            to="/account/favorites"
                            className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-[#f4f1ea] hover:text-[#1b4332]"
                          >
                            <Heart className="h-4 w-4" />
                            <span>Saved Items</span>
                          </Link>
                        </>
                      )}

                      <button
                        onClick={() => logout()}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 mt-1"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Log out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#ede8de] bg-white px-4 pt-3 pb-6 space-y-4 animate-slide-down">
            {/* Search within mobile drawer */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search fresh harvest..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[#ded7ca] bg-[#fbfaf8] px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            </form>

            <nav className="flex flex-col space-y-2 text-base font-semibold text-slate-800">
              <Link
                to="/marketplace"
                className="rounded-lg p-2.5 hover:bg-[#f4f1ea] transition-colors"
              >
                Marketplace
              </Link>
              <Link
                to="/farmers"
                className="rounded-lg p-2.5 hover:bg-[#f4f1ea] transition-colors"
              >
                Farmers & Producers
              </Link>
              <Link
                to="/how-it-works"
                className="rounded-lg p-2.5 hover:bg-[#f4f1ea] transition-colors"
              >
                How It Works
              </Link>
              <Link
                to="/account/favorites"
                className="flex items-center justify-between rounded-lg p-2.5 hover:bg-[#f4f1ea] transition-colors"
              >
                <span>Saved Favorites</span>
                <span className="text-xs bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                  {favoritesCount}
                </span>
              </Link>
            </nav>

            {/* Role switch in mobile drawer */}
            <div className="rounded-xl bg-[#f4f1ea] p-3 text-xs text-slate-700 flex items-center justify-between">
              <div>
                <span className="font-bold">Active Role:</span> {user?.role || "guest"}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => switchRole(user?.role === "farmer" ? "customer" : "farmer")}
              >
                Switch Role
              </Button>
            </div>

            {/* Quick Authentication Buttons */}
            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <Link to="/login" className="w-full">
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button variant="default" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-100">
                <Link
                  to={user?.role === "farmer" ? "/farmer/dashboard" : "/account"}
                  className="block w-full"
                >
                  <Button variant="default" className="w-full justify-between">
                    <span>Go to {user?.role === "farmer" ? "Farmer" : "Customer"} Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Mobile Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-4 flex items-start justify-center pt-20">
          <div className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-2xl animate-slide-down">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Search Farm Market</h3>
              <button onClick={() => setSearchModalOpen(false)} className="p-1 text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="mt-3 flex gap-2">
              <input
                type="text"
                autoFocus
                placeholder="Tomatoes, avocados, eggs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
              />
              <Button type="submit" variant="default">
                Search
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
