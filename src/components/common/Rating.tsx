import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
  rating: number
  reviewCount?: number
  size?: "sm" | "md" | "lg"
  showCount?: boolean
  className?: string
}

export function Rating({
  rating,
  reviewCount,
  size = "sm",
  showCount = true,
  className,
}: RatingProps) {
  const iconSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  const clampedRating = Math.max(0, Math.min(5, rating))

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              iconSizes[size],
              star <= Math.round(clampedRating)
                ? "fill-amber-400 text-amber-500"
                : "fill-slate-100 text-slate-300"
            )}
          />
        ))}
      </div>

      <span className={cn("font-semibold text-slate-800", textSizes[size])}>
        {rating.toFixed(1)}
      </span>

      {showCount && reviewCount !== undefined && (
        <span className={cn("text-slate-500 font-normal", textSizes[size])}>
          ({reviewCount})
        </span>
      )}
    </div>
  )
}
