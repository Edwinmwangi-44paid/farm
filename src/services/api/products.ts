import { apiClient } from "./client"
import { Category, PaginatedResponse, Product, ProductFilterParams } from "@/types"
import { MOCK_PRODUCTS } from "@/services/mock/products"
import { MOCK_CATEGORIES } from "@/services/mock/categories"

// In-memory mutable products store for farmer CRUD simulations
let productsData: Product[] = [...MOCK_PRODUCTS]

export const productService = {
  /**
   * Get products with filtering, search, sorting, and pagination
   */
  async getProducts(params: ProductFilterParams = {}): Promise<PaginatedResponse<Product>> {
    return apiClient.mockExec(() => {
      let filtered = [...productsData]

      // Filter by category
      if (params.category && params.category !== "all") {
        filtered = filtered.filter(
          (p) => p.category.slug.toLowerCase() === params.category?.toLowerCase()
        )
      }

      // Filter by search query (name, farmer, category)
      if (params.search && params.search.trim() !== "") {
        const query = params.search.toLowerCase().trim()
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.farmer.farmName.toLowerCase().includes(query) ||
            p.farmer.name.toLowerCase().includes(query) ||
            p.farmer.county.toLowerCase().includes(query) ||
            p.category.name.toLowerCase().includes(query)
        )
      }

      // Filter by price range
      if (params.minPrice !== undefined) {
        filtered = filtered.filter((p) => p.price >= (params.minPrice ?? 0))
      }
      if (params.maxPrice !== undefined) {
        filtered = filtered.filter((p) => p.price <= (params.maxPrice ?? Infinity))
      }

      // Filter by location / county
      if (params.location && params.location !== "all") {
        filtered = filtered.filter((p) =>
          p.farmer.county.toLowerCase().includes(params.location!.toLowerCase())
        )
      }

      // Filter by rating
      if (params.rating) {
        filtered = filtered.filter((p) => p.rating >= params.rating!)
      }

      // Filter by farming method
      if (params.farmingMethod && params.farmingMethod !== "all") {
        filtered = filtered.filter(
          (p) => p.farmingMethod.toLowerCase() === params.farmingMethod?.toLowerCase()
        )
      }

      // Filter by in-stock availability
      if (params.inStockOnly) {
        filtered = filtered.filter((p) => p.availableQuantity > 0 && p.isAvailable)
      }

      // Filter by farmer slug
      if (params.farmerSlug) {
        filtered = filtered.filter((p) => p.farmer.slug === params.farmerSlug)
      }

      // Sort results
      if (params.sortBy) {
        switch (params.sortBy) {
          case "price_asc":
            filtered.sort((a, b) => a.price - b.price)
            break
          case "price_desc":
            filtered.sort((a, b) => b.price - a.price)
            break
          case "rating":
            filtered.sort((a, b) => b.rating - a.rating)
            break
          case "newest":
            filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            break
          case "recommended":
          default:
            filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
            break
        }
      }

      // Pagination
      const page = params.page || 1
      const limit = params.limit || 12
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedItems = filtered.slice(startIndex, endIndex)

      return {
        items: paginatedItems,
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
      }
    })
  },

  /**
   * Get single product by URL slug
   */
  async getProductBySlug(slug: string): Promise<Product> {
    return apiClient.mockExec(() => {
      const product = productsData.find((p) => p.slug === slug)
      if (!product) {
        throw new Error(`Product with slug "${slug}" not found`)
      }
      return product
    })
  },

  /**
   * Get single product by ID
   */
  async getProductById(id: string): Promise<Product> {
    return apiClient.mockExec(() => {
      const product = productsData.find((p) => p.id === id)
      if (!product) {
        throw new Error(`Product with ID "${id}" not found`)
      }
      return product
    })
  },

  /**
   * Get featured products for homepage
   */
  async getFeaturedProducts(): Promise<Product[]> {
    return apiClient.mockExec(() => {
      return productsData.filter((p) => p.isFeatured)
    })
  },

  /**
   * Get related products in the same category
   */
  async getRelatedProducts(categorySlug: string, currentProductId: string): Promise<Product[]> {
    return apiClient.mockExec(() => {
      return productsData
        .filter((p) => p.category.slug === categorySlug && p.id !== currentProductId)
        .slice(0, 4)
    })
  },

  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    return apiClient.mockExec(() => {
      return [...MOCK_CATEGORIES]
    })
  },

  /**
   * Farmer creates new product
   */
  async createProduct(newProduct: Partial<Product>): Promise<Product> {
    return apiClient.mockExec(() => {
      const product: Product = {
        id: `prod-${Date.now()}`,
        slug: newProduct.slug || (newProduct.name ? newProduct.name.toLowerCase().replace(/\s+/g, "-") : "new-product"),
        name: newProduct.name || "Untitled Produce",
        description: newProduct.description || "",
        price: Number(newProduct.price) || 0,
        currency: "KES",
        unit: newProduct.unit || "kg",
        availableQuantity: Number(newProduct.availableQuantity) || 1,
        minOrderQuantity: Number(newProduct.minOrderQuantity) || 1,
        images: newProduct.images?.length
          ? newProduct.images
          : ["https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"],
        category: newProduct.category || MOCK_CATEGORIES[0],
        farmer: newProduct.farmer || {
          id: "farmer-1",
          slug: "green-valley-farm",
          name: "Samuel Gitau",
          farmName: "Green Valley Farm",
          location: "Kiambu, Kenya",
          county: "Kiambu",
          rating: 4.9,
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
          isVerified: true,
        },
        farmingMethod: newProduct.farmingMethod || "Organic",
        harvestDate: newProduct.harvestDate || new Date().toISOString().split("T")[0],
        shelfLife: newProduct.shelfLife || "7 days",
        storageTip: newProduct.storageTip || "Store in cool dry conditions",
        deliveryOptions: newProduct.deliveryOptions || ["Direct delivery", "Standard transport"],
        rating: 5.0,
        reviewCount: 0,
        isFeatured: false,
        isAvailable: newProduct.isAvailable !== undefined ? newProduct.isAvailable : true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      productsData = [product, ...productsData]
      return product
    })
  },

  /**
   * Farmer updates existing product
   */
  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    return apiClient.mockExec(() => {
      const index = productsData.findIndex((p) => p.id === id)
      if (index === -1) {
        throw new Error(`Product ${id} not found`)
      }
      productsData[index] = {
        ...productsData[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      }
      return productsData[index]
    })
  },

  /**
   * Farmer deletes product
   */
  async deleteProduct(id: string): Promise<boolean> {
    return apiClient.mockExec(() => {
      productsData = productsData.filter((p) => p.id !== id)
      return true
    })
  },

  /**
   * Toggle product stock availability
   */
  async toggleAvailability(id: string): Promise<Product> {
    return apiClient.mockExec(() => {
      const product = productsData.find((p) => p.id === id)
      if (!product) throw new Error("Product not found")
      product.isAvailable = !product.isAvailable
      return { ...product }
    })
  },
}
