import { Link } from "react-router-dom"
import { Heart, ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/marketplace/ProductCard"
import { FarmerCard } from "@/components/marketplace/FarmerCard"
import { EmptyState } from "@/components/common/EmptyState"
import { useFavoritesStore } from "@/stores/useFavoritesStore"
import { useProducts } from "@/hooks/useProducts"
import { useFarmers } from "@/hooks/useFarmers"

export function CustomerFavoritesPage() {
  const { productIds, farmerIds } = useFavoritesStore()
  const { data: productsData } = useProducts()
  const { data: farmers } = useFarmers()

  const favoriteProducts = productsData?.items.filter((p) => productIds.includes(p.id)) || []
  const favoriteFarmers = farmers?.filter((f) => farmerIds.includes(f.id)) || []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-display">
          Saved & Favorites
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Your bookmarked seasonal produce and trusted family farms
        </p>
      </div>

      {/* Favorite Products */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 font-display">
          Favorite Produce ({favoriteProducts.length})
        </h2>

        {favoriteProducts.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="No favorite produce saved yet"
            description="Browse the marketplace and click the heart icon on any crop or product you love."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* Favorite Farmers */}
      {favoriteFarmers.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-[#ede8de]">
          <h2 className="text-lg font-bold text-slate-900 font-display">
            Followed Farms ({favoriteFarmers.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteFarmers.map((f) => (
              <FarmerCard key={f.id} farmer={f} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
