import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu } from "lucide-react";
import { useCart } from "../../stores/useCart";

export function Navbar() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-green-800">FarmMarket</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-green-700 transition-colors">Home</Link>
          <Link to="/marketplace" className="hover:text-green-700 transition-colors">Marketplace</Link>
          <Link to="/categories" className="hover:text-green-700 transition-colors">Categories</Link>
          <Link to="/farmers" className="hover:text-green-700 transition-colors">Farmers</Link>
          <Link to="/how-it-works" className="hover:text-green-700 transition-colors">How It Works</Link>
        </nav>

        {/* Search, Cart, Auth */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-9 pr-4 py-2 w-64 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all"
            />
          </div>
          <Link to="/cart" className="relative p-2 text-gray-700 hover:text-green-700 transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-green-600 text-[10px] font-bold text-white flex items-center justify-center">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>
          <div className="flex items-center gap-2 pl-2 border-l">
            <Link to="/login" className="text-sm font-medium hover:text-green-700 px-3 py-2">Log in</Link>
            <Link to="/register" className="text-sm font-medium bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition-colors">Sign up</Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-gray-700">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
