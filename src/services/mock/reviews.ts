import { Review } from "@/types"

export const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-1",
    targetType: "product",
    targetId: "fresh-tomatoes",
    userName: "Alice Njeri",
    userLocation: "Kilimani, Nairobi",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment:
      "These tomatoes are so sweet and firm! You can immediately tell they weren't artificially ripened with ethylene. Made the best beef stew last night.",
    verifiedPurchase: true,
    createdAt: "2026-09-24T14:20:00Z",
  },
  {
    id: "rev-2",
    targetType: "product",
    targetId: "fresh-tomatoes",
    userName: "Brian Otieno",
    userLocation: "Parklands, Nairobi",
    userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment:
      "Arrived super fresh within 4 hours of ordering. Samuel at Green Valley Farm really knows how to grow top-tier greenhouse tomatoes.",
    verifiedPurchase: true,
    createdAt: "2026-09-25T11:00:00Z",
  },
  {
    id: "rev-3",
    targetType: "product",
    targetId: "kienyeji-farm-eggs",
    userName: "Mercy Chebet",
    userLocation: "Westlands, Nairobi",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment:
      "The egg yolks are vibrant dark orange and test so fresh in boiling. Not a single cracked egg in the entire crate thanks to the reinforced packaging.",
    verifiedPurchase: true,
    createdAt: "2026-09-26T09:30:00Z",
  },
  {
    id: "rev-4",
    targetType: "farmer",
    targetId: "green-valley-farm",
    userName: "Kelvin Kamau",
    userLocation: "Runda, Nairobi",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment:
      "We've been sourcing greens and tomatoes for our family and small cafe from Green Valley for the past 6 months. Absolute consistency, honesty, and freshness.",
    verifiedPurchase: true,
    createdAt: "2026-09-18T16:15:00Z",
  },
  {
    id: "rev-5",
    targetType: "farmer",
    targetId: "green-valley-farm",
    userName: "Faith Nduta",
    userLocation: "Kiambu Town",
    userAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    rating: 4.8,
    comment:
      "Visited their greenhouses during their community harvest day. Very transparent farming methods and meticulous drip irrigation.",
    verifiedPurchase: true,
    createdAt: "2026-09-20T10:45:00Z",
  },
  {
    id: "rev-6",
    targetType: "product",
    targetId: "hass-avocados",
    userName: "Dennis Njoroge",
    userLocation: "Karen, Nairobi",
    userAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment:
      "These Hass avocados are magnificent. Smooth buttery texture, zero strings, and ripe ready to make guacamole. Will order weekly.",
    verifiedPurchase: true,
    createdAt: "2026-09-22T13:10:00Z",
  },
]
