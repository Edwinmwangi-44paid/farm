import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { productService } from "@/services/api/products"
import { Product, ProductFilterParams } from "@/types"

export const PRODUCT_KEYS = {
  all: ["products"] as const,
  lists: () => [...PRODUCT_KEYS.all, "list"] as const,
  list: (params: ProductFilterParams) => [...PRODUCT_KEYS.lists(), params] as const,
  featured: () => [...PRODUCT_KEYS.all, "featured"] as const,
  details: () => [...PRODUCT_KEYS.all, "detail"] as const,
  detail: (slug: string) => [...PRODUCT_KEYS.details(), slug] as const,
  related: (categorySlug: string, id: string) =>
    [...PRODUCT_KEYS.all, "related", categorySlug, id] as const,
  categories: ["categories"] as const,
}

/**
 * Hook to fetch paginated products with filtering and sorting
 */
export function useProducts(params: ProductFilterParams = {}) {
  return useQuery({
    queryKey: PRODUCT_KEYS.list(params),
    queryFn: () => productService.getProducts(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Hook to fetch a single product by slug
 */
export function useProduct(slug: string) {
  return useQuery({
    queryKey: PRODUCT_KEYS.detail(slug),
    queryFn: () => productService.getProductBySlug(slug),
    enabled: Boolean(slug),
  })
}

/**
 * Hook to fetch featured products for homepage
 */
export function useFeaturedProducts() {
  return useQuery({
    queryKey: PRODUCT_KEYS.featured(),
    queryFn: () => productService.getFeaturedProducts(),
    staleTime: 1000 * 60 * 10,
  })
}

/**
 * Hook to fetch related products
 */
export function useRelatedProducts(categorySlug: string, currentProductId: string) {
  return useQuery({
    queryKey: PRODUCT_KEYS.related(categorySlug, currentProductId),
    queryFn: () => productService.getRelatedProducts(categorySlug, currentProductId),
    enabled: Boolean(categorySlug && currentProductId),
  })
}

/**
 * Hook to fetch categories
 */
export function useCategories() {
  return useQuery({
    queryKey: PRODUCT_KEYS.categories,
    queryFn: () => productService.getCategories(),
    staleTime: 1000 * 60 * 30, // 30 minutes
  })
}

/**
 * Mutation hook to create new product (farmer action)
 */
export function useCreateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newProduct: Partial<Product>) => productService.createProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all })
    },
  })
}

/**
 * Mutation hook to update product (farmer action)
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      productService.updateProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all })
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.detail(variables.id) })
    },
  })
}

/**
 * Mutation hook to delete product (farmer action)
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all })
    },
  })
}
