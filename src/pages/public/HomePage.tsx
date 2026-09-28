import { Link } from "react-router-dom"
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Leaf,
  Users,
  Award,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/marketplace/ProductCard"
import { FarmerCard } from "@/components/marketplace/FarmerCard"
import { ProductCardSkeleton, FarmerCardSkeleton } from "@/components/common/Skeletons"
import { ErrorState } from "@/components/common/ErrorState"
import { useFeaturedProducts, useCategories } from "@/hooks/useProducts"
import { useFarmers } from "@/hooks/useFarmers"

export function HomePage() {
  const {
    data: featuredProducts,
    isLoading: isProductsLoading,
    isError: isProductsError,
    refetch: refetchProducts,
  } = useFeaturedProducts()

  const { data: categories, isLoading: isCategoriesLoading } = useCategories()
  const { data: farmers, isLoading: isFarmersLoading } = useFarmers()

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f4f1ea] via-[#fbfaf8] to-white pt-8 sm:pt-14 pb-16 lg:pb-24 border-b border-[#ede8de]">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-[#1b4332] shadow-sm backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-[#d97706]" />
                <span>Kenya's Premier Direct Agricultural Marketplace</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.12]">
                Fresh From the Farm.{" "}
                <span className="text-[#1b4332] block sm:inline">
                  Straight to You.
                </span>
              </h1>

              <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Discover fresh produce and farm products from trusted local farmers.
                Directly supporting growers across Kiambu, Nakuru, Nyeri, and beyond.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/marketplace" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-2 bg-[#1b4332] text-white shadow-md hover:bg-[#143427] text-base"
                  >
                    <span>Shop Fresh Produce</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Link to="/register" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto border border-[#ded7ca] text-[#1b4332] text-base font-semibold"
                  >
                    Sell Your Products
                  </Button>
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 border-t border-[#ede8de] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                    48h
                  </div>
                  <div className="text-xs text-slate-500">Harvest-to-Door</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                    100%
                  </div>
                  <div className="text-xs text-slate-500">Verified Farms</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                    KES 0
                  </div>
                  <div className="text-xs text-slate-500">Free delivery &gt;3.5k</div>
                </div>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Image */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[5/4]">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
                    alt="Kenyan Farmer displaying fresh harvest vegetables"
                    className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Floating Price Spotlight Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                        <Leaf className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Fresh Greenhouse Tomatoes
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Green Valley Farm • Kiambu
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#1b4332]">KES 180 / kg</div>
                      <div className="text-[10px] text-emerald-700 font-semibold">★ 4.8 (38)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Section */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#d97706]">
              Explore Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
              Fresh Produce by Category
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Find exactly what you need directly from specialized agricultural growers
            </p>
          </div>

          <Link
            to="/marketplace"
            className="text-xs sm:text-sm font-bold text-[#1b4332] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>View All Categories</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isCategoriesLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-36 rounded-2xl bg-[#ede8de] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
            {categories?.map((cat) => (
              <Link
                key={cat.id}
                to={`/marketplace?category=${cat.slug}`}
                className="group relative flex flex-col items-center text-center p-4 rounded-2xl border border-[#ede8de] bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#1b4332]/40 hover:-translate-y-1"
              >
                <div className="relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-2xl mb-3 shadow-inner bg-[#f4f1ea]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#1b4332] transition-colors leading-tight">
                  {cat.name}
                </h3>
                <span className="text-xs text-slate-400 mt-0.5 font-medium">
                  {cat.productCount} products
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 3. Featured Products */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#d97706]">
              Hand-Picked Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
              Featured Farm Produce
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Top quality, seasonal favorites harvested fresh across Kenyan farms
            </p>
          </div>

          <Link
            to="/marketplace"
            className="text-xs sm:text-sm font-bold text-[#1b4332] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>Browse Full Marketplace</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isProductsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : isProductsError ? (
          <ErrorState onRetry={() => refetchProducts()} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts?.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Quality Guarantee Banner */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-[#1b4332] text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
            <Leaf className="w-96 h-96" />
          </div>

          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
              The Farm Market Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
              Honest Agriculture. Transparent Origins.
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              Every vegetable, crate of eggs, and litre of milk on our platform can be traced directly to an inspected farm. No middlemen adulterations, no artificial ripening chemicals, and fair pricing for both growers and consumers.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link to="/how-it-works">
                <Button variant="secondary" className="font-semibold bg-white text-[#1b4332] hover:bg-emerald-50">
                  Read Our Standards
                </Button>
              </Link>
              <Link to="/farmers">
                <Button variant="outline" className="border-white/40 text-white bg-transparent hover:bg-white/10">
                  Meet the Growers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Farmers */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#d97706]">
              Meet The Producers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
              Featured Farms & Growers
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Dedicated Kenyan agriculturalists practicing sustainable and organic farming
            </p>
          </div>

          <Link
            to="/farmers"
            className="text-xs sm:text-sm font-bold text-[#1b4332] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>View All Farmers</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isFarmersLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <FarmerCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {farmers?.slice(0, 4).map((farmer) => (
              <FarmerCard key={farmer.id} farmer={farmer} />
            ))}
          </div>
        )}
      </section>

      {/* 6. How It Works Section */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#d97706]">
            Simple & Transparent
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
            How Farm Market Works
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Enjoying harvest-fresh produce is simple, fast, and completely reliable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-white border border-[#ede8de] shadow-sm space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-[#f4f1ea] text-[#1b4332] mx-auto flex items-center justify-center font-bold text-lg border border-[#e2dcd0]">
              1
            </div>
            <h3 className="font-bold text-slate-900">Choose Produce</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Explore crops and farm supplies from vetted farmers in your region.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#ede8de] shadow-sm space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-[#f4f1ea] text-[#1b4332] mx-auto flex items-center justify-center font-bold text-lg border border-[#e2dcd0]">
              2
            </div>
            <h3 className="font-bold text-slate-900">Farmers Harvest</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Orders are picked and sorted specifically for your request on harvest day.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#ede8de] shadow-sm space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-[#f4f1ea] text-[#1b4332] mx-auto flex items-center justify-center font-bold text-lg border border-[#e2dcd0]">
              3
            </div>
            <h3 className="font-bold text-slate-900">Direct Delivery</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dispatched with careful handling and temperature protection to your doorstep.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#ede8de] shadow-sm space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-[#f4f1ea] text-[#1b4332] mx-auto flex items-center justify-center font-bold text-lg border border-[#e2dcd0]">
              4
            </div>
            <h3 className="font-bold text-slate-900">Support Farmers</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Farmers receive fair, transparent prices directly via M-Pesa.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
