import { apiClient } from "./client"
import { Order, OrderStatus } from "@/types"
import { MOCK_ORDERS } from "@/services/mock/orders"

let ordersData: Order[] = [...MOCK_ORDERS]

export const orderService = {
  /**
   * Get orders for customer
   */
  async getCustomerOrders(_userId?: string): Promise<Order[]> {
    return apiClient.mockExec(() => {
      return [...ordersData]
    })
  },

  /**
   * Get orders for farmer's products
   */
  async getFarmerOrders(_farmerSlug: string = "green-valley-farm"): Promise<Order[]> {
    return apiClient.mockExec(() => {
      // In mock mode return all orders relevant to farmer
      return [...ordersData]
    })
  },

  /**
   * Get single order by ID or orderNumber
   */
  async getOrderById(idOrNumber: string): Promise<Order> {
    return apiClient.mockExec(() => {
      const order = ordersData.find(
        (o) => o.id === idOrNumber || o.orderNumber.toLowerCase() === idOrNumber.toLowerCase()
      )
      if (!order) {
        throw new Error(`Order ${idOrNumber} not found`)
      }
      return order
    })
  },

  /**
   * Create an order from checkout
   */
  async createOrder(orderPayload: Partial<Order>): Promise<Order> {
    return apiClient.mockExec(() => {
      const newOrderNumber = `FM-${Math.floor(100000 + Math.random() * 900000)}`
      const order: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: newOrderNumber,
        userId: orderPayload.userId || "user-cust-1",
        customerName: orderPayload.customerName || "Customer",
        customerPhone: orderPayload.customerPhone || "+254 700 000 000",
        customerEmail: orderPayload.customerEmail || "customer@example.com",
        items: orderPayload.items || [],
        subtotal: orderPayload.subtotal || 0,
        deliveryFee: orderPayload.deliveryFee || 150,
        packagingFee: orderPayload.packagingFee || 0,
        total: orderPayload.total || 0,
        status: "confirmed",
        statusHistory: [
          {
            status: "order_placed",
            timestamp: new Date().toISOString(),
            note: "Order placed online",
          },
          {
            status: "confirmed",
            timestamp: new Date().toISOString(),
            note: "Payment received & confirmed",
          },
        ],
        paymentMethod: orderPayload.paymentMethod || "mpesa",
        paymentStatus: "completed",
        mpesaReceiptNumber: `SMP${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        deliveryAddress: orderPayload.deliveryAddress!,
        deliveryMethod: orderPayload.deliveryMethod || "farm_direct",
        deliveryDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        notes: orderPayload.notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      ordersData = [order, ...ordersData]
      return order
    })
  },

  /**
   * Update order status (Farmer / Admin action)
   */
  async updateOrderStatus(orderId: string, status: OrderStatus, note?: string): Promise<Order> {
    return apiClient.mockExec(() => {
      const order = ordersData.find((o) => o.id === orderId)
      if (!order) throw new Error("Order not found")

      order.status = status
      order.updatedAt = new Date().toISOString()
      order.statusHistory.push({
        status,
        timestamp: new Date().toISOString(),
        note: note || `Status updated to ${status}`,
      })

      return { ...order }
    })
  },
}
