import * as React from "react"
import { cn } from "@/lib/utils"

export function Avatar({
  src,
  alt,
  fallback,
  className,
}: {
  src?: string
  alt?: string
  fallback: string
  className?: string
}) {
  const [hasError, setHasError] = React.useState(false)

  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-[#f4f1ea] items-center justify-center text-sm font-semibold text-[#1b4332]",
        className
      )}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          onError={() => setHasError(true)}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <span>{fallback.slice(0, 2).toUpperCase()}</span>
      )}
    </div>
  )
}
