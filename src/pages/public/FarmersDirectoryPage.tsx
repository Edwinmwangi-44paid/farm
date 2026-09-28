import * as React from "react"
import { Search } from "lucide-react"
import { FarmerCard } from "@/components/marketplace/FarmerCard"
import { FarmerCardSkeleton } from "@/components/common/Skeletons"
import { EmptyState } from "@/components/common/EmptyState"
import { Select } from "@/components/ui/select"
import { useFarmers } from "@/hooks/useFarmers"

const COUNTIES = [
  "All Locations",
  "Kiambu",
  "Nairobi",
  "Nakuru",
  "Nyeri",
  "Murang'a",
  "Machakos",
  "Meru",
]

export function FarmersDirectoryPage() {
  const [search, setSearch] = React.useState("")
  const [county, setCounty] = React.useState("all")

  const { data: farmers, isLoading } = useFarmers({
    search: search || undefined,
    county: county !== "all" ? county : undefined,
  })

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Our Partner Farmers & Producers
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore independent farms delivering fresh organic and greenhouse produce straight to you
        </p>
      </div>

      {/* Search & County Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#ede8de] shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search farm name, grower, or region..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#ded7ca] bg-[#fbfaf8] px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
          />
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        </div>

        <div className="w-full sm:w-56">
          <Select value={county} onChange={(e) => setCounty(e.target.value)}>
            {COUNTIES.map((c) => (
              <option key={c} value={c === "All Locations" ? "all" : c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Farmers Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <FarmerCardSkeleton key={i} />
          ))}
        </div>
      ) : farmers && farmers.length === 0 ? (
        <EmptyState
          title="No farmers found"
          description="We couldn't find any farms matching your search. Try another location or keyword."
          actionLabel="Show All Farmers"
          onAction={() => {
            setSearch("")
            setCounty("all")
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmers?.map((f) => (
            <FarmerCard key={f.id} farmer={f} />
          ))}
        </div>
      )}
    </div>
  )
}
