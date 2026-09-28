export type UserRole = "customer" | "farmer" | "admin"

export interface User {
  id: string
  email: string
  name: string
  phone: string
  role: UserRole
  avatar?: string
  createdAt: string
  farmId?: string
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  image: string
  productCount: number
}

export interface FarmerSummary {
  id: string
  slug: string
  name: string
  farmName: string
  location: string
  county: string
  rating: number
  avatar: string
  isVerified: boolean
}

export interface Farmer {
  id: string
  slug: string
  name: string
  farmName: string
  tagline: string
  description: string
  location: string
  county: string
  coordinates?: {
    lat: number
    lng: number
  }
  rating: number
  reviewCount: number
  productCount: number
  coverImage: string
  avatar: string
  farmingPractices: string[]
  certifications: string[]
  yearEstablished: number
  phone: string
  email: string
  isVerified: boolean
  badge?: string
  createdAt: string
}

export type FarmingMethod =
  | "Organic"
  | "Hydroponic"
  | "Conventional"
  | "Greenhouse"
  | "Permaculture"

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  currency: string
  unit: string // e.g. 'kg', 'crate', 'piece', 'bundle', 'litre', 'bag'
  availableQuantity: number
  minOrderQuantity: number
  images: string[]
  category: Category
  farmer: FarmerSummary
  farmingMethod: FarmingMethod
  harvestDate: string
  shelfLife: string
  storageTip: string
  deliveryOptions: string[]
  rating: number
  reviewCount: number
  isFeatured: boolean
  isAvailable: boolean
  badge?: string
  createdAt: string
  updatedAt: string
}

export interface Review {
  id: string
  targetType: "product" | "farmer"
  targetId: string
  userName: string
  userLocation: string
  userAvatar?: string
  rating: number
  comment: string
  verifiedPurchase: boolean
  createdAt: string
}

export interface Address {
  id: string
  userId: string
  fullName: string
  phone: string
  county: string
  town: string
  street: string
  building?: string
  isDefault: boolean
  deliveryNotes?: string
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  packagingFee: number
  total: number
}

export type OrderStatus =
  | "order_placed"
  | "confirmed"
  | "processing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"

export type PaymentMethod =
  | "mpesa"
  | "card"
  | "cash_on_delivery"
  | "bank_transfer"

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded"

export type DeliveryMethodType = "farm_direct" | "express_24h" | "pickup"

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage: string
  farmerName: string
  farmSlug: string
  unit: string
  unitPrice: number
  quantity: number
  totalPrice: number
}

export interface OrderStatusHistoryItem {
  status: OrderStatus
  timestamp: string
  note?: string
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  customerName: string
  customerPhone: string
  customerEmail: string
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  packagingFee: number
  total: number
  status: OrderStatus
  statusHistory: OrderStatusHistoryItem[]
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  mpesaReceiptNumber?: string
  deliveryAddress: Address
  deliveryMethod: DeliveryMethodType
  deliveryDate: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export type ProductSortOption =
  | "recommended"
  | "newest"
  | "price_asc"
  | "price_desc"
  | "rating"

export interface ProductFilterParams {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  location?: string
  rating?: number
  farmingMethod?: string
  inStockOnly?: boolean
  sortBy?: ProductSortOption
  farmerSlug?: string
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface FarmerStats {
  totalSales: number
  totalOrders: number
  totalProducts: number
  pendingOrders: number
  salesChangePercentage: number
  monthlySales: { month: string; sales: number }[]
  topProducts: {
    id: string
    name: string
    revenue: number
    quantitySold: number
    stock: number
  }[]
  inventoryAlerts: {
    productId: string
    productName: string
    currentStock: number
    unit: string
    status: "critical" | "low"
  }[]
}
