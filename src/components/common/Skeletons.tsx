import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-[#ede8de] bg-white p-3 sm:p-4 shadow-sm space-y-3">
      <Skeleton className="h-44 sm:h-52 w-full rounded-xl" />
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-12 rounded" />
        </div>
        <Skeleton className="h-5 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-6 w-24 rounded" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
    </div>
  )
}

export function FarmerCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#ede8de] bg-white overflow-hidden shadow-sm">
      <Skeleton className="h-32 w-full" />
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-5 w-32 rounded" />
            <Skeleton className="h-3.5 w-24 rounded" />
          </div>
        </div>
        <Skeleton className="h-12 w-full rounded" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-pulse">
      <div className="lg:col-span-7 space-y-4">
        <Skeleton className="h-96 sm:h-[480px] w-full rounded-2xl" />
        <div className="grid grid-cols-3 gap-3">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
      </div>
      <div className="lg:col-span-5 space-y-5">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-9 w-4/5 rounded" />
        <Skeleton className="h-8 w-36 rounded" />
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="w-full space-y-3">
      <div className="flex gap-4 p-4 border-b border-slate-200">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-5 flex-1 rounded" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 p-4 border-b border-slate-100 items-center">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-6 flex-1 rounded" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-8 w-32 rounded" />
            <Skeleton className="h-3.5 w-20 rounded" />
          </div>
        ))}
      </div>
      <Skeleton className="h-72 w-full rounded-2xl" />
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  )
}
