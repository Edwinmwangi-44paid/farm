import { useQuery } from "@tanstack/react-query"
import { farmerService } from "@/services/api/farmers"

export const FARMER_KEYS = {
  all: ["farmers"] as const,
  lists: () => [...FARMER_KEYS.all, "list"] as const,
  list: (params: { search?: string; county?: string }) => [...FARMER_KEYS.lists(), params] as const,
  detail: (slug: string) => [...FARMER_KEYS.all, "detail", slug] as const,
  stats: (farmerId?: string) => [...FARMER_KEYS.all, "stats", farmerId || "default"] as const,
  reviews: (slug: string) => [...FARMER_KEYS.all, "reviews", slug] as const,
}

export function useFarmers(params: { search?: string; county?: string } = {}) {
  return useQuery({
    queryKey: FARMER_KEYS.list(params),
    queryFn: () => farmerService.getFarmers(params),
    staleTime: 1000 * 60 * 10,
  })
}

export function useFarmer(slug: string) {
  return useQuery({
    queryKey: FARMER_KEYS.detail(slug),
    queryFn: () => farmerService.getFarmerBySlug(slug),
    enabled: Boolean(slug),
  })
}

export function useFarmerReviews(slug: string) {
  return useQuery({
    queryKey: FARMER_KEYS.reviews(slug),
    queryFn: () => farmerService.getFarmerReviews(slug),
    enabled: Boolean(slug),
  })
}

export function useFarmerStats(farmerId?: string) {
  return useQuery({
    queryKey: FARMER_KEYS.stats(farmerId),
    queryFn: () => farmerService.getFarmerStats(farmerId),
    staleTime: 1000 * 60 * 2,
  })
}
