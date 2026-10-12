import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface FavoritesState {
  productIds: string[]
  farmerIds: string[]
  toggleFavoriteProduct: (productId: string) => void
  toggleFavoriteFarmer: (farmerId: string) => void
  isProductFavorite: (productId: string) => boolean
  isFarmerFavorite: (farmerId: string) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      productIds: ["prod-1", "prod-3"], // Seed with favorites
      farmerIds: ["farmer-1"],

      toggleFavoriteProduct: (productId: string) => {
        set((state) => {
          const exists = state.productIds.includes(productId)
          return {
            productIds: exists
              ? state.productIds.filter((id) => id !== productId)
              : [...state.productIds, productId],
          }
        })
      },

      toggleFavoriteFarmer: (farmerId: string) => {
        set((state) => {
          const exists = state.farmerIds.includes(farmerId)
          return {
            farmerIds: exists
              ? state.farmerIds.filter((id) => id !== farmerId)
              : [...state.farmerIds, farmerId],
          }
        })
      },

      isProductFavorite: (productId: string) => {
        return get().productIds.includes(productId)
      },

      isFarmerFavorite: (farmerId: string) => {
        return get().farmerIds.includes(farmerId)
      },
    }),
    {
      name: "farm-market-favorites",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
