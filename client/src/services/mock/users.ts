import { Address, User } from "@/types"

export const MOCK_USERS: User[] = [
  {
    id: "user-cust-1",
    email: "customer@farmmarket.co.ke",
    name: "Amina Hassan",
    phone: "+254 712 998 877",
    role: "customer",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    createdAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "user-farm-1",
    email: "farmer@greenvalley.co.ke",
    name: "Samuel Gitau",
    phone: "+254 712 345 678",
    role: "farmer",
    farmId: "farmer-1",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    createdAt: "2021-03-15T08:00:00Z",
  },
]

export const MOCK_ADDRESSES: Address[] = [
  {
    id: "addr-1",
    userId: "user-cust-1",
    fullName: "Amina Hassan",
    phone: "+254 712 998 877",
    county: "Nairobi",
    town: "Kilimani",
    street: "Argwings Kodhek Road",
    building: "Valley View Court, Apt 4B",
    isDefault: true,
    deliveryNotes: "Call when at the front security gate. Elevator is working.",
  },
  {
    id: "addr-2",
    userId: "user-cust-1",
    fullName: "Amina Hassan (Office)",
    phone: "+254 712 998 877",
    county: "Nairobi",
    town: "Westlands",
    street: "Waiyaki Way",
    building: "Mirage Towers, 7th Floor",
    isDefault: false,
    deliveryNotes: "Deliver to reception before 4:30 PM.",
  },
]
