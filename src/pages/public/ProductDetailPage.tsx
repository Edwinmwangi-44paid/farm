import * as React from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import {
  Heart,
  ShoppingCart,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  Truck,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react"
import { PriceDisplay } from "@/components/common/PriceDisplay"
import { Rating } from "@/components/common/Rating"
import { QuantitySelector } from "@/components/common/QuantitySelector"
import { ProductCard } from "@/components/marketplace/ProductCard"
import { ProductDetailSkeleton } from "@/components/common/Skeletons"
import { ErrorState } from "@/components/common/ErrorState"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useProduct, useRelatedProducts } from "@/hooks/useProducts"
import { useCartStore } from "@/stores/useCartStore"
import { useFavoritesStore } from "@/stores/useFavoritesStore"
import { toast } from "@/components/ui/toast"
import { formatDate } from "@/lib/utils"

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const { data: product, isLoading, isError, refetch } = useProduct(slug || "")
  const { data: relatedProducts } = useRelatedProducts(
    product?.category.slug || "",
    product?.id || ""
  )

  const { addItem } = useCartStore()
  const { isProductFavorite, toggleFavoriteProduct } = useFavoritesStore()

  const [selectedImage, setSelectedImage] = React.useState<number>(0)
  const [quantity, setQuantity] = React.useState<number>(1)

  // Reset selected image and quantity on slug change
  React.useEffect(() => {
    setSelectedImage(0)
    setQuantity(1)
    window.scrollTo(0, 0)
  }, [slug])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <ProductDetailSkeleton />
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <ErrorState
          title="Produce not found"
          message="We couldn't locate this farm product. It might be out of season or currently unlisted."
          onRetry={() => refetch()}
        />
      </div>
    )
  }

  const isFavorite = isProductFavorite(product.id)

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast.success(
      "Added to Basket",
      `${quantity} ${product.unit} of ${product.name} added to your cart.`
    )
  }

  const handleBuyNow = () => {
    addItem(product, quantity)
    navigate("/checkout")
  }

  const handleFavoriteToggle = () => {
    toggleFavoriteProduct(product.id)
    toast.info(
      isFavorite ? "Removed from Favorites" : "Saved to Favorites",
      product.name
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link to="/" className="hover:text-[#1b4332]">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <Link to="/marketplace" className="hover:text-[#1b4332]">
          Marketplace
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <Link
          to={`/marketplace?category=${product.category.slug}`}
          className="hover:text-[#1b4332]"
        >
          {product.category.name}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main Detail Grid: Image Gallery & Buy Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-3xl bg-[#f4f1ea] border border-[#ede8de] shadow-sm">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />

            {product.badge && (
              <Badge className="absolute top-4 left-4 shadow-sm" variant="default">
                {product.badge}
              </Badge>
            )}

            <button
              onClick={handleFavoriteToggle}
              className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-slate-600 hover:text-rose-600 transition-all hover:scale-110"
              aria-label="Save to favorites"
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`}
              />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                    selectedImage === idx
                      ? "border-[#1b4332] ring-2 ring-[#1b4332]/20"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Purchase Box */}
        <div className="lg:col-span-5 space-y-6">
          {/* Farm Origin Pill */}
          <div className="flex items-center justify-between">
            <Link
              to={`/farm/${product.farmer.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#f4f1ea] px-3.5 py-1 text-xs font-semibold text-[#1b4332] hover:bg-[#e9e3d7] transition-colors border border-[#ded7ca]"
            >
              <img
                src={product.farmer.avatar}
                alt={product.farmer.farmName}
                className="h-5 w-5 rounded-full object-cover"
              />
              <span>{product.farmer.farmName}</span>
              <MapPin className="h-3 w-3 text-slate-400 ml-1" />
              <span className="text-slate-500">{product.farmer.county}</span>
            </Link>

            <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
              {product.farmingMethod}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <Rating rating={product.rating} reviewCount={product.reviewCount} size="md" />
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-500">
              Verified Farmer direct dispatch
            </span>
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-2xl bg-[#fbfaf8] border border-[#ede8de] flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Price per unit</span>
              <PriceDisplay price={product.price} unit={product.unit} size="xl" />
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block font-medium">Stock Status</span>
              {product.availableQuantity > 0 ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {product.availableQuantity} {product.unit}s available
                </span>
              ) : (
                <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Short Description */}
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            {product.description}
          </p>

          {/* Quantity and Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Quantity:
              </span>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                min={product.minOrderQuantity || 1}
                max={product.availableQuantity}
                size="lg"
              />
              <span className="text-xs text-slate-400">
                Min: {product.minOrderQuantity || 1} {product.unit}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Button
                variant="default"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.availableQuantity <= 0}
                className="w-full gap-2 text-base font-semibold shadow-md bg-[#1b4332] hover:bg-[#143427]"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Basket</span>
              </Button>

              <Button
                variant="accent"
                size="lg"
                onClick={handleBuyNow}
                disabled={product.availableQuantity <= 0}
                className="w-full font-semibold text-base"
              >
                <span>Buy Now</span>
              </Button>
            </div>
          </div>

          {/* Quick Assurance Badges */}
          <div className="pt-4 border-t border-[#ede8de] grid grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#1b4332] shrink-0" />
              <span>Harvested: {formatDate(product.harvestDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#1b4332] shrink-0" />
              <span>Shelf life: {product.shelfLife}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-[#1b4332] shrink-0" />
              <span>Farm direct dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#1b4332] shrink-0" />
              <span>M-Pesa buyer protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Farming Method, Harvest Details, Storage & Delivery */}
      <div className="pt-6">
        <Tabs defaultValue="details">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="details">Produce Specifications</TabsTrigger>
            <TabsTrigger value="farming">Farming & Harvest</TabsTrigger>
            <TabsTrigger value="delivery">Delivery & Storage</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ede8de] mt-4 space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Product Details</h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              {product.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="p-3.5 rounded-xl bg-[#fbfaf8] border border-[#ede8de]">
                <span className="text-xs text-slate-400 block font-medium">Category</span>
                <span className="text-sm font-bold text-slate-800">{product.category.name}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#fbfaf8] border border-[#ede8de]">
                <span className="text-xs text-slate-400 block font-medium">Standard Unit</span>
                <span className="text-sm font-bold text-slate-800">{product.unit}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#fbfaf8] border border-[#ede8de]">
                <span className="text-xs text-slate-400 block font-medium">Farming Method</span>
                <span className="text-sm font-bold text-slate-800">{product.farmingMethod}</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="farming" className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ede8de] mt-4 space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Cultivation & Harvest Methods</h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Grown by {product.farmer.farmName} in {product.farmer.location}. This produce was cultivated using {product.farmingMethod} standards, ensuring minimal environmental impact and clean produce for consumption.
            </p>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Harvest Date: <strong>{formatDate(product.harvestDate)}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Natural ripening: No artificial carbide or chemical accelerating gases</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="delivery" className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ede8de] mt-4 space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Delivery & Fresh Storage Guidelines</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Storage Tip
                </h4>
                <p className="text-sm text-slate-700 mt-1 font-medium bg-[#f4f1ea] p-3 rounded-xl border border-[#ded7ca]">
                  {product.storageTip}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Delivery Options
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  {product.deliveryOptions.map((opt, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-[#1b4332]" />
                      <span>{opt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* About the Farmer Box */}
      <div className="rounded-3xl border border-[#ede8de] bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#f4f1ea]">
          <div className="flex items-center gap-4">
            <img
              src={product.farmer.avatar}
              alt={product.farmer.farmName}
              className="h-16 w-16 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
            />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#d97706]">
                Grower Spotlight
              </span>
              <h3 className="text-xl font-bold text-slate-900 leading-tight">
                {product.farmer.farmName}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {product.farmer.name} • {product.farmer.location}
              </p>
            </div>
          </div>

          <Link to={`/farm/${product.farmer.slug}`}>
            <Button variant="outline" className="border-[#1b4332] text-[#1b4332] hover:bg-[#f4f1ea]">
              Visit Farmer Storefront →
            </Button>
          </Link>
        </div>

        <p className="mt-4 text-sm text-slate-600 leading-relaxed">
          {product.farmer.farmName} is a verified agricultural partner on Farm Market. All produce is harvested fresh on demand to ensure superior taste, crispness, and nutritional value.
        </p>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              More from {product.category.name}
            </h2>
            <Link
              to={`/marketplace?category=${product.category.slug}`}
              className="text-xs font-bold text-[#1b4332] hover:underline"
            >
              See all {product.category.name} →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
