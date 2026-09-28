import { Link } from "react-router-dom"
import { MapPin, Package, CheckCircle2, ArrowRight } from "lucide-react"
import { Farmer } from "@/types"
import { Rating } from "@/components/common/Rating"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FarmerCardProps {
  farmer: Farmer
  className?: string
}

export function FarmerCard({ farmer, className }: FarmerCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#ede8de] bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#1b4332]/30",
        className
      )}
    >
      <div>
        {/* Cover Photo */}
        <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-[#f4f1ea]">
          <img
            src={farmer.coverImage}
            alt={farmer.farmName}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {farmer.badge && (
            <span className="absolute top-3 right-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#1b4332] shadow-sm backdrop-blur-sm">
              {farmer.badge}
            </span>
          )}
        </div>

        {/* Farmer Info */}
        <div className="p-4 sm:p-5 pt-0 relative">
          {/* Avatar overlap */}
          <div className="relative -mt-8 mb-3 flex items-end justify-between">
            <div className="relative">
              <img
                src={farmer.avatar}
                alt={farmer.name}
                className="h-16 w-16 rounded-2xl border-2 border-white object-cover shadow-md bg-white"
              />
              {farmer.isVerified && (
                <div
                  className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm"
                  title="Verified Farm"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 fill-emerald-100" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1b4332] bg-[#f4f1ea] px-2.5 py-1 rounded-full border border-[#ede8de]">
              <Package className="h-3.5 w-3.5" />
              <span>{farmer.productCount} Products</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1b4332] transition-colors leading-tight">
                  <Link to={`/farm/${farmer.slug}`}>{farmer.farmName}</Link>
                </h3>
                <p className="text-xs text-slate-500 font-medium">{farmer.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>{farmer.location}</span>
            </div>

            <div className="pt-1">
              <Rating rating={farmer.rating} reviewCount={farmer.reviewCount} size="sm" />
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 pt-1 leading-relaxed italic">
              "{farmer.description}"
            </p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 sm:p-5 pt-0">
        <Link to={`/farm/${farmer.slug}`} className="block w-full">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-between text-slate-800 hover:text-[#1b4332] hover:border-[#1b4332] font-semibold group/btn"
          >
            <span>View Farm</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
