import { Link } from "react-router-dom"
import { Heart, ShoppingCart, MapPin, Check } from "lucide-react"
import { Product } from "@/types"
import { PriceDisplay } from "@/components/common/PriceDisplay"
import { Rating } from "@/components/common/Rating"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/stores/useCartStore"
import { useFavoritesStore } from "@/stores/useFavoritesStore"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem, items } = useCartStore()
  const { toggleFavoriteProduct, isProductFavorite } = useFavoritesStore()

  const isFavorite = isProductFavorite(product.id)
  const cartItem = items.find((i) => i.productId === product.id)
  const isInCart = Boolean(cartItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.isAvailable || product.availableQuantity <= 0) return

    addItem(product, 1)
    toast.success("Added to Cart", `${product.name} has been added to your basket.`)
  }

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavoriteProduct(product.id)
    toast.info(
      isFavorite ? "Removed from Favorites" : "Saved to Favorites",
      product.name
    )
  }

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-[#ede8de] bg-white p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#1b4332]/30",
        !product.isAvailable && "opacity-75",
        className
      )}
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-xl bg-[#f4f1ea]">
          <Link to={`/product/${product.slug}`} className="block h-full w-full">
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
            {product.badge && (
              <Badge variant="default" className="shadow-sm">
                {product.badge}
              </Badge>
            )}
            {product.farmingMethod && (
              <span className="rounded-md bg-white/95 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-[#1b4332] shadow-sm border border-emerald-100">
                {product.farmingMethod}
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteToggle}
            className={cn(
              "absolute top-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all hover:scale-110",
              isFavorite
                ? "text-rose-500 hover:text-rose-600"
                : "text-slate-400 hover:text-rose-500"
            )}
            aria-label={isFavorite ? "Remove favorite" : "Add to favorites"}
          >
            <Heart
              className={cn("h-4 w-4 transition-colors", isFavorite && "fill-rose-500")}
            />
          </button>

          {/* Out of Stock overlay if applicable */}
          {(!product.isAvailable || product.availableQuantity <= 0) && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-slate-900 text-white font-semibold text-xs px-3 py-1.5 rounded-full shadow">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="mt-3.5 space-y-1.5">
          {/* Farm origin and location */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <Link
              to={`/farm/${product.farmer.slug}`}
              className="font-medium text-[#1b4332] hover:underline truncate max-w-[150px]"
            >
              {product.farmer.farmName}
            </Link>
            <span className="flex items-center gap-0.5 text-slate-400 text-[11px]">
              <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
              {product.farmer.county}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-semibold text-slate-900 group-hover:text-[#1b4332] transition-colors line-clamp-1 text-base">
            <Link to={`/product/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Rating */}
          <div className="pt-0.5">
            <Rating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
          </div>
        </div>
      </div>

      {/* Footer: Price & Add to Cart */}
      <div className="mt-4 pt-3 border-t border-[#f4f1ea] flex items-center justify-between gap-2">
        <PriceDisplay price={product.price} unit={product.unit} size="md" />

        <button
          onClick={handleAddToCart}
          disabled={!product.isAvailable || product.availableQuantity <= 0}
          className={cn(
            "flex h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none shadow-sm",
            isInCart
              ? "bg-emerald-100 text-[#1b4332] hover:bg-emerald-200"
              : "bg-[#1b4332] text-white hover:bg-[#143427]"
          )}
          aria-label={`Add ${product.name} to cart`}
        >
          {isInCart ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Added ({cartItem?.quantity})</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
