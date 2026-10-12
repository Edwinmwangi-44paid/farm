import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { orderService } from "@/services/api/orders"
import { Order, OrderStatus } from "@/types"

export const ORDER_KEYS = {
  all: ["orders"] as const,
  customerList: (userId?: string) => [...ORDER_KEYS.all, "customer", userId || "current"] as const,
  farmerList: (farmerSlug?: string) => [...ORDER_KEYS.all, "farmer", farmerSlug || "current"] as const,
  detail: (id: string) => [...ORDER_KEYS.all, "detail", id] as const,
}

export function useCustomerOrders(userId?: string) {
  return useQuery({
    queryKey: ORDER_KEYS.customerList(userId),
    queryFn: () => orderService.getCustomerOrders(userId),
  })
}

export function useFarmerOrders(farmerSlug?: string) {
  return useQuery({
    queryKey: ORDER_KEYS.farmerList(farmerSlug),
    queryFn: () => orderService.getFarmerOrders(farmerSlug),
  })
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ORDER_KEYS.detail(id),
    queryFn: () => orderService.getOrderById(id),
    enabled: Boolean(id),
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<Order>) => orderService.createOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDER_KEYS.all })
    },
  })
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ orderId, status, note }: { orderId: string; status: OrderStatus; note?: string }) =>
      orderService.updateOrderStatus(orderId, status, note),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ORDER_KEYS.all })
      queryClient.invalidateQueries({ queryKey: ORDER_KEYS.detail(variables.orderId) })
    },
  })
}
