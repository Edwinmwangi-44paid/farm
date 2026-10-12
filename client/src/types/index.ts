export type Currency = "KES";

export type UserRole = "CUSTOMER" | "FARMER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface Address {
  id: string;
  userId: string;
  title: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
  isDefault: boolean;
}

export interface Farm {
  id: string;
  name: string;
  slug: string;
  location: string;
  description: string;
  farmingPractices: string[];
  rating: number;
  reviewCount: number;
  coverImage?: string;
  logo?: string;
  farmerId: string;
}

export interface Farmer extends User {
  farm: Farm;
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED";
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: Currency;
  unit: string;
  availableQuantity: number;
  minOrderQuantity?: number;
  shelfLife?: string;
  storageTip?: string;
  deliveryOptions?: string[];
  isFeatured?: boolean;
  images: string[];
  categoryId: string;
  category?: Category; // Support old usage
  farmId: string;
  farmerId: string;
  farmer?: Partial<Farmer>; // Support old usage
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  farmingMethod?: string;
  harvestDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface CartItem {
  id?: string;
  productId: string;
  product?: Product;
  quantity: number;
  unitPrice?: number;
  totalPrice?: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "READY_FOR_PICKUP" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED";
  deliveryMethod: "delivery" | "pickup";
  paymentMethod: "mpesa" | "card" | "cash";
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED";
  shippingAddress?: Address;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
