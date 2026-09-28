import { formatCurrency, cn } from "@/lib/utils"

interface PriceDisplayProps {
  price: number
  unit?: string
  currency?: string
  originalPrice?: number
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function PriceDisplay({
  price,
  unit,
  currency = "KES",
  originalPrice,
  size = "md",
  className,
}: PriceDisplayProps) {
  const sizeStyles = {
    sm: "text-sm",
    md: "text-base font-semibold",
    lg: "text-xl font-bold",
    xl: "text-2xl sm:text-3xl font-extrabold",
  }

  return (
    <div className={cn("inline-flex items-baseline gap-1.5 flex-wrap", className)}>
      <span className={cn("text-[#1b4332] tracking-tight", sizeStyles[size])}>
        {formatCurrency(price, currency)}
      </span>

      {unit && (
        <span className="text-xs sm:text-sm font-medium text-slate-500">
          / {unit}
        </span>
      )}

      {originalPrice && originalPrice > price && (
        <span className="text-xs text-slate-400 line-through ml-1">
          {formatCurrency(originalPrice, currency)}
        </span>
      )}
    </div>
  )
}
