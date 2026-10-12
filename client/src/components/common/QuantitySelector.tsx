import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  disabled?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 999,
  disabled = false,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (value > min && !disabled) {
      onChange(value - 1)
    }
  }

  const handleIncrement = () => {
    if (value < max && !disabled) {
      onChange(value + 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10)
    if (isNaN(val)) return
    if (val >= min && val <= max) {
      onChange(val)
    }
  }

  const dimensions = {
    sm: "h-8 px-2 text-xs",
    md: "h-9 px-3 text-sm",
    lg: "h-11 px-4 text-base",
  }

  const buttonSizes = {
    sm: "h-6 w-6",
    md: "h-7 w-7",
    lg: "h-8 w-8",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden",
        dimensions[size],
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min || disabled}
        className={cn(
          "flex items-center justify-center rounded text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors disabled:opacity-30 disabled:hover:bg-transparent",
          buttonSizes[size]
        )}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>

      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="w-10 text-center font-semibold text-slate-800 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label="Quantity"
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max || disabled}
        className={cn(
          "flex items-center justify-center rounded text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors disabled:opacity-30 disabled:hover:bg-transparent",
          buttonSizes[size]
        )}
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
