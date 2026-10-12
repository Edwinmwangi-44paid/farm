import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this information right now. Please check your internet connection and try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-red-200 bg-red-50/50 max-w-lg mx-auto",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-700 mb-4 border border-red-200">
        <AlertTriangle className="h-7 w-7 text-red-600" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 max-w-sm leading-relaxed">{message}</p>

      {onRetry && (
        <div className="mt-6">
          <Button onClick={onRetry} variant="default" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>
        </div>
      )}
    </div>
  )
}
