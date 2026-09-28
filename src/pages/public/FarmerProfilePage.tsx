import * as React from "react"
import { useParams, Link } from "react-router-dom"
import {
  MapPin,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  ShieldCheck,
  ChevronRight,
  UserCheck,
} from "lucide-react"
import { Rating } from "@/components/common/Rating"
import { ProductCard } from "@/components/marketplace/ProductCard"
import { ProductCardSkeleton } from "@/components/common/Skeletons"
import { EmptyState } from "@/components/common/EmptyState"
import { ErrorState } from "@/components/common/ErrorState"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useFarmer, useFarmerReviews } from "@/hooks/useFarmers"
import { useProducts } from "@/hooks/useProducts"
import { formatDate } from "@/lib/utils"

export function FarmerProfilePage() {
  const { slug } = useParams<{ slug: string }>()

  const { data: farmer, isLoading: isFarmerLoading, isError: isFarmerError, refetch } = useFarmer(slug || "")
  const { data: reviews } = useFarmerReviews(slug || "")
  const { data: productsData, isLoading: isProductsLoading } = useProducts({
    farmerSlug: slug,
  })

  if (isFarmerLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-10 space-y-6 animate-pulse">
        <div className="h-64 sm:h-80 w-full rounded-3xl bg-[#ede8de]" />
        <div className="h-32 w-full rounded-2xl bg-[#ede8de]" />
      </div>
    )
  }

  if (isFarmerError || !farmer) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <ErrorState
          title="Farm profile not found"
          message="We couldn't locate this farmer's storefront."
          onRetry={() => refetch()}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link to="/" className="hover:text-[#1b4332]">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <Link to="/farmers" className="hover:text-[#1b4332]">
          Farmers
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">{farmer.farmName}</span>
      </nav>

      {/* Farm Header Cover & Profile Showcase */}
      <div className="relative overflow-hidden rounded-3xl border border-[#ede8de] bg-white shadow-sm">
        {/* Cover Photo */}
        <div className="relative h-60 sm:h-80 w-full overflow-hidden bg-[#f4f1ea]">
          <img
            src={farmer.coverImage}
            alt={farmer.farmName}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {farmer.badge && (
            <div className="absolute top-4 right-4">
              <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#1b4332] shadow-sm backdrop-blur-sm">
                {farmer.badge}
              </span>
            </div>
          )}
        </div>

        {/* Profile Card & Stats Bar */}
        <div className="p-6 sm:p-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
            <div className="flex items-end gap-4 sm:gap-6">
              <div className="relative shrink-0">
                <img
                  src={farmer.avatar}
                  alt={farmer.name}
                  className="h-28 w-28 sm:h-36 sm:w-36 rounded-3xl border-4 border-white object-cover shadow-xl bg-white"
                />
                {farmer.isVerified && (
                  <div
                    className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md"
                    title="Verified Farm"
                  >
                    <CheckCircle2 className="h-6 w-6 text-emerald-600 fill-emerald-100" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                    {farmer.farmName}
                  </h1>
                </div>

                <p className="text-sm font-semibold text-[#1b4332]">
                  Operated by {farmer.name}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{farmer.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-4 bg-[#f4f1ea] p-3 rounded-2xl border border-[#ede8de] self-start sm:self-auto">
              <div className="text-center px-2">
                <span className="text-xs text-slate-500 block">Rating</span>
                <Rating rating={farmer.rating} reviewCount={farmer.reviewCount} size="sm" />
              </div>
              <div className="h-8 w-px bg-slate-300" />
              <div className="text-center px-2">
                <span className="text-xs text-slate-500 block">Harvests</span>
                <span className="text-base font-bold text-slate-900">
                  {farmer.productCount} Products
                </span>
              </div>
              <div className="h-8 w-px bg-slate-300" />
              <div className="text-center px-2">
                <span className="text-xs text-slate-500 block">Since</span>
                <span className="text-base font-bold text-slate-900">
                  {farmer.yearEstablished}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            {farmer.description}
          </p>
        </div>
      </div>

      {/* Storefront Tabs: Products, About, Reviews */}
      <div>
        <Tabs defaultValue="products">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="products">Products ({productsData?.total || 0})</TabsTrigger>
            <TabsTrigger value="about">About & Practices</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews?.length || 0})</TabsTrigger>
          </TabsList>

          {/* Tab 1: Products */}
          <TabsContent value="products" className="pt-4">
            {isProductsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : productsData && productsData.items.length === 0 ? (
              <EmptyState
                title="No current produce"
                description="This farm doesn't have active harvest listings right now. Please check back next week."
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {productsData?.items.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Tab 2: About the Farm */}
          <TabsContent value="about" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ede8de] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Sustainable Farming Practices</h3>
                <p className="text-xs text-slate-500">
                  Methods applied to protect soil micro-organisms and produce clean crops.
                </p>
                <div className="space-y-2.5 pt-2">
                  {farmer.farmingPractices.map((practice, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                      <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{practice}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ede8de] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Certifications & Inspections</h3>
                <p className="text-xs text-slate-500">
                  Accredited agricultural standards and verified compliance bodies.
                </p>
                <div className="space-y-2.5 pt-2">
                  {farmer.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                      <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{cert}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                  <div>Direct Farm Contact: <strong>{farmer.phone}</strong></div>
                  <div>Official Email: <strong>{farmer.email}</strong></div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 3: Reviews */}
          <TabsContent value="reviews" className="pt-4">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ede8de] shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Verified Buyer Reviews</h3>
                <Rating rating={farmer.rating} reviewCount={farmer.reviewCount} size="md" />
              </div>

              {reviews && reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl bg-[#fbfaf8] border border-[#ede8de] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {rev.userAvatar && (
                            <img
                              src={rev.userAvatar}
                              alt={rev.userName}
                              className="h-9 w-9 rounded-full object-cover"
                            />
                          )}
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{rev.userName}</h4>
                            <span className="text-[11px] text-slate-400">{rev.userLocation}</span>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400">{formatDate(rev.createdAt)}</span>
                      </div>

                      <Rating rating={rev.rating} showCount={false} size="sm" />
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No reviews yet"
                  description="Be the first customer to order from this farm and leave a verified review!"
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
