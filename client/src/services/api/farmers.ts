import { apiClient } from "./client"
import { Farmer, FarmerStats, Review } from "@/types"
import { MOCK_FARMERS } from "@/services/mock/farmers"
import { MOCK_REVIEWS } from "@/services/mock/reviews"

export const farmerService = {
  /**
   * Get list of all farmers with optional filtering
   */
  async getFarmers(params: { search?: string; county?: string } = {}): Promise<Farmer[]> {
    return apiClient.mockExec(() => {
      let farmers = [...MOCK_FARMERS]

      if (params.search && params.search.trim()) {
        const q = params.search.toLowerCase()
        farmers = farmers.filter(
          (f) =>
            f.name.toLowerCase().includes(q) ||
            f.farmName.toLowerCase().includes(q) ||
            f.location.toLowerCase().includes(q) ||
            f.description.toLowerCase().includes(q)
        )
      }

      if (params.county && params.county !== "all") {
        farmers = farmers.filter(
          (f) => f.county.toLowerCase() === params.county?.toLowerCase()
        )
      }

      return farmers
    })
  },

  /**
   * Get single farmer by URL slug
   */
  async getFarmerBySlug(slug: string): Promise<Farmer> {
    return apiClient.mockExec(() => {
      const farmer = MOCK_FARMERS.find((f) => f.slug === slug)
      if (!farmer) {
        throw new Error(`Farmer with slug "${slug}" not found`)
      }
      return farmer
    })
  },

  /**
   * Get reviews for a specific farm
   */
  async getFarmerReviews(farmSlug: string): Promise<Review[]> {
    return apiClient.mockExec(() => {
      return MOCK_REVIEWS.filter(
        (r) => r.targetType === "farmer" && r.targetId === farmSlug
      )
    })
  },

  /**
   * Get stats for farmer dashboard (e.g. Sales KES 245,600, Orders 128, Products 34, Pending 12)
   */
  async getFarmerStats(_farmerId?: string): Promise<FarmerStats> {
    return apiClient.mockExec(() => {
      return {
        totalSales: 245600,
        totalOrders: 128,
        totalProducts: 34,
        pendingOrders: 12,
        salesChangePercentage: 14.8,
        monthlySales: [
          { month: "Apr", sales: 180000 },
          { month: "May", sales: 195000 },
          { month: "Jun", sales: 210000 },
          { month: "Jul", sales: 228000 },
          { month: "Aug", sales: 236000 },
          { month: "Sep", sales: 245600 },
        ],
        topProducts: [
          {
            id: "prod-1",
            name: "Fresh Greenhouse Tomatoes",
            revenue: 81000,
            quantitySold: 450,
            stock: 450,
          },
          {
            id: "prod-2",
            name: "Crisp Sukuma Wiki",
            revenue: 33600,
            quantitySold: 840,
            stock: 280,
          },
          {
            id: "prod-13",
            name: "Pastured Free-Range Kienyeji Chicken",
            revenue: 44000,
            quantitySold: 40,
            stock: 15,
          },
          {
            id: "prod-16",
            name: "Sweet Crimson Giant Watermelons",
            revenue: 24000,
            quantitySold: 300,
            stock: 300,
          },
        ],
        inventoryAlerts: [
          {
            productId: "prod-13",
            productName: "Pastured Free-Range Kienyeji Chicken",
            currentStock: 15,
            unit: "pieces",
            status: "low",
          },
          {
            productId: "prod-2",
            productName: "Crisp Sukuma Wiki",
            currentStock: 35,
            unit: "bundles",
            status: "critical",
          },
        ],
      }
    })
  },
}
