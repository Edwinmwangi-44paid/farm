import * as React from "react"
import { useSearchParams } from "react-router-dom"
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
} from "lucide-react"
import { ProductCard } from "@/components/marketplace/ProductCard"
import { ProductCardSkeleton } from "@/components/common/Skeletons"
import { EmptyState } from "@/components/common/EmptyState"
import { ErrorState } from "@/components/common/ErrorState"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { useProducts, useCategories } from "@/hooks/useProducts"
import { ProductSortOption, ProductFilterParams } from "@/types"

const KENYAN_COUNTIES = [
  "All Locations",
  "Kiambu",
  "Nairobi",
  "Nakuru",
  "Nyeri",
  "Murang'a",
  "Machakos",
  "Meru",
]

const FARMING_METHODS = [
  "All Methods",
  "Organic",
  "Greenhouse",
  "Hydroponic",
  "Permaculture",
  "Conventional",
]

export function MarketplacePage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // State from URL Search Params
  const categoryParam = searchParams.get("category") || "all"
  const searchParam = searchParams.get("search") || ""
  const locationParam = searchParams.get("location") || "all"
  const methodParam = searchParams.get("method") || "all"
  const minPriceParam = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined
  const maxPriceParam = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined
  const sortParam = (searchParams.get("sort") as ProductSortOption) || "recommended"
  const inStockParam = searchParams.get("inStock") === "true"
  const pageParam = Number(searchParams.get("page")) || 1

  // Local state for search and mobile filter sheet
  const [searchTerm, setSearchTerm] = React.useState(searchParam)
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false)

  // Sync internal search when URL changes
  React.useEffect(() => {
    setSearchTerm(searchParam)
  }, [searchParam])

  // Build Query Filters
  const filterParams: ProductFilterParams = {
    category: categoryParam !== "all" ? categoryParam : undefined,
    search: searchParam || undefined,
    location: locationParam !== "all" ? locationParam : undefined,
    farmingMethod: methodParam !== "all" ? methodParam : undefined,
    minPrice: minPriceParam,
    maxPrice: maxPriceParam,
    inStockOnly: inStockParam,
    sortBy: sortParam,
    page: pageParam,
    limit: 12,
  }

  const { data, isLoading, isError, refetch } = useProducts(filterParams)
  const { data: categories } = useCategories()

  // Helper to update specific param while keeping others
  const updateFilter = (key: string, value: string | null) => {
    const nextParams = new URLSearchParams(searchParams)
    if (value === null || value === "all" || value === "") {
      nextParams.delete(key)
    } else {
      nextParams.set(key, value)
    }
    // Reset to page 1 on filter changes
    if (key !== "page") {
      nextParams.delete("page")
    }
    setSearchParams(nextParams)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilter("search", searchTerm.trim() || null)
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSearchParams({})
  }

  const hasActiveFilters =
    categoryParam !== "all" ||
    searchParam !== "" ||
    locationParam !== "all" ||
    methodParam !== "all" ||
    minPriceParam !== undefined ||
    maxPriceParam !== undefined ||
    inStockParam

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header & Page Title */}
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Fresh Agricultural Marketplace
        </h1>
        <p className="text-sm text-slate-500">
          Source direct from vetted Kenyan growers and cooperatives
        </p>
      </div>

      {/* Category Pills Bar (Horizontal Scrollable) */}
      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => updateFilter("category", "all")}
          className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
            categoryParam === "all"
              ? "bg-[#1b4332] text-white shadow-sm"
              : "bg-white text-slate-700 border border-[#ede8de] hover:bg-[#f4f1ea]"
          }`}
        >
          All Produce
        </button>

        {categories?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => updateFilter("category", cat.slug)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              categoryParam === cat.slug
                ? "bg-[#1b4332] text-white shadow-sm"
                : "bg-white text-slate-700 border border-[#ede8de] hover:bg-[#f4f1ea]"
            }`}
          >
            {cat.name} ({cat.productCount})
          </button>
        ))}
      </div>

      {/* Control Bar: Search, Mobile Filters Trigger, Sorting */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#ede8de] shadow-sm">
        {/* Search input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search by produce name, farmer, or variety..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-[#ded7ca] bg-[#fbfaf8] px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
          />
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("")
                updateFilter("search", null)
              }}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>

        <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
          {/* Mobile Filter Sheet Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden gap-2 text-xs"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters {hasActiveFilters && "•"}</span>
          </Button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Sort:</span>
            <div className="w-44">
              <Select
                value={sortParam}
                onChange={(e) => updateFilter("sort", e.target.value)}
                className="text-xs py-1.5 h-9"
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
                <option value="rating">Highest Rated</option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 rounded-2xl border border-[#ede8de] bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#f4f1ea]">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-[#1b4332]" />
              <span>Filters</span>
            </h3>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* Filter: Location (County) */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Farm Location
            </label>
            <Select
              value={locationParam}
              onChange={(e) => updateFilter("location", e.target.value)}
              className="text-xs"
            >
              {KENYAN_COUNTIES.map((c) => (
                <option key={c} value={c === "All Locations" ? "all" : c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>

          {/* Filter: Farming Method */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Farming Method
            </label>
            <Select
              value={methodParam}
              onChange={(e) => updateFilter("method", e.target.value)}
              className="text-xs"
            >
              {FARMING_METHODS.map((m) => (
                <option key={m} value={m === "All Methods" ? "all" : m}>
                  {m}
                </option>
              ))}
            </Select>
          </div>

          {/* Filter: Price Range (KES) */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Price Range (KES)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[11px] text-slate-400">Min</span>
                <input
                  type="number"
                  placeholder="0"
                  value={minPriceParam || ""}
                  onChange={(e) => updateFilter("minPrice", e.target.value || null)}
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs focus:ring-1 focus:ring-[#1b4332]"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-400">Max</span>
                <input
                  type="number"
                  placeholder="3000"
                  value={maxPriceParam || ""}
                  onChange={(e) => updateFilter("maxPrice", e.target.value || null)}
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs focus:ring-1 focus:ring-[#1b4332]"
                />
              </div>
            </div>
          </div>

          {/* Filter: In Stock Only Checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockParam}
                onChange={(e) => updateFilter("inStock", e.target.checked ? "true" : null)}
                className="h-4 w-4 rounded border-slate-300 text-[#1b4332] focus:ring-[#1b4332]"
              />
              <span className="text-xs font-medium text-slate-700">In-Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <section className="lg:col-span-9 space-y-6">
          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Applied:</span>

              {categoryParam !== "all" && (
                <span className="inline-flex items-center gap-1 bg-[#f4f1ea] text-[#1b4332] px-2.5 py-1 rounded-full font-semibold">
                  Category: {categoryParam}
                  <button onClick={() => updateFilter("category", null)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {searchParam && (
                <span className="inline-flex items-center gap-1 bg-[#f4f1ea] text-[#1b4332] px-2.5 py-1 rounded-full font-semibold">
                  Search: "{searchParam}"
                  <button onClick={() => updateFilter("search", null)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {locationParam !== "all" && (
                <span className="inline-flex items-center gap-1 bg-[#f4f1ea] text-[#1b4332] px-2.5 py-1 rounded-full font-semibold">
                  Location: {locationParam}
                  <button onClick={() => updateFilter("location", null)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {methodParam !== "all" && (
                <span className="inline-flex items-center gap-1 bg-[#f4f1ea] text-[#1b4332] px-2.5 py-1 rounded-full font-semibold">
                  Method: {methodParam}
                  <button onClick={() => updateFilter("method", null)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {inStockParam && (
                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-semibold">
                  In Stock Only
                  <button onClick={() => updateFilter("inStock", null)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              Showing {data ? data.items.length : 0} of {data ? data.total : 0} farm products
            </span>
          </div>

          {/* Loading Skeletons */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <ErrorState onRetry={() => refetch()} />
          ) : data && data.items.length === 0 ? (
            <EmptyState
              title="No farm products found"
              description="We couldn't find any produce matching your current filter criteria. Try clearing some filters or searching for another crop."
              actionLabel="Clear All Filters"
              onAction={clearAllFilters}
            />
          ) : (
            <>
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                {data?.items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              {data && data.totalPages > 1 && (
                <div className="pt-8 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={data.page <= 1}
                    onClick={() => updateFilter("page", String(data.page - 1))}
                  >
                    Previous
                  </Button>

                  {Array.from({ length: data.totalPages }).map((_, i) => {
                    const p = i + 1
                    return (
                      <button
                        key={p}
                        onClick={() => updateFilter("page", String(p))}
                        className={`h-8 w-8 rounded-lg text-xs font-semibold transition-colors ${
                          data.page === p
                            ? "bg-[#1b4332] text-white"
                            : "bg-white text-slate-700 hover:bg-[#f4f1ea] border border-slate-200"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={data.page >= data.totalPages}
                    onClick={() => updateFilter("page", String(data.page + 1))}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      {/* Mobile Filters Drawer / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6 animate-slide-down">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg">Filter Produce</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">Category</label>
              <Select
                value={categoryParam}
                onChange={(e) => updateFilter("category", e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </div>

            {/* Mobile Location */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">Location</label>
              <Select
                value={locationParam}
                onChange={(e) => updateFilter("location", e.target.value)}
              >
                {KENYAN_COUNTIES.map((c) => (
                  <option key={c} value={c === "All Locations" ? "all" : c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>

            {/* Mobile Farming Method */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">Method</label>
              <Select
                value={methodParam}
                onChange={(e) => updateFilter("method", e.target.value)}
              >
                {FARMING_METHODS.map((m) => (
                  <option key={m} value={m === "All Methods" ? "all" : m}>
                    {m}
                  </option>
                ))}
              </Select>
            </div>

            {/* Mobile Stock Only */}
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockParam}
                  onChange={(e) => updateFilter("inStock", e.target.checked ? "true" : null)}
                  className="h-4 w-4 rounded text-[#1b4332]"
                />
                <span className="text-sm font-medium text-slate-700">In Stock Only</span>
              </label>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col gap-2">
              <Button
                variant="default"
                className="w-full"
                onClick={() => setMobileFilterOpen(false)}
              >
                Apply Filters
              </Button>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  className="w-full text-rose-600 border-rose-200"
                  onClick={() => {
                    clearAllFilters()
                    setMobileFilterOpen(false)
                  }}
                >
                  Reset All
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
