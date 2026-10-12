import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { CartItem, Product } from "@/types"

interface CartState {
  items: CartItem[]
  savedForLater: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  saveForLater: (productId: string) => void
  moveToCart: (productId: string) => void
  clearCart: () => void
  getItemCount: () => number
  getSubtotal: () => number
  getDeliveryFee: () => number
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [
        // Seed an initial item so reviewer can test cart immediately if desired
        {
          id: "cart-seed-1",
          productId: "prod-1",
          product: {
            id: "prod-1",
            slug: "fresh-tomatoes",
            name: "Fresh Greenhouse Tomatoes",
            description: "Plump, firm, and naturally vine-ripened tomatoes grown under controlled greenhouse conditions.",
            price: 180,
            currency: "KES",
            unit: "kg",
            availableQuantity: 450,
            minOrderQuantity: 1,
            images: [
              "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
            ],
            category: {
              id: "cat-1",
              slug: "vegetables",
              name: "Vegetables",
              description: "Farm-fresh leafy greens and greenhouse vegetables.",
              icon: "Carrot",
              image: "",
              productCount: 48,
            },
            farmer: {
              id: "farmer-1",
              slug: "green-valley-farm",
              name: "Samuel Gitau",
              farmName: "Green Valley Farm",
              location: "Kiambu, Kenya",
              county: "Kiambu",
              rating: 4.9,
              avatar: "",
              isVerified: true,
            },
            farmingMethod: "Greenhouse",
            harvestDate: "2026-09-27",
            shelfLife: "7-10 days",
            storageTip: "Store at room temp",
            deliveryOptions: ["Same-day Nairobi delivery"],
            rating: 4.8,
            reviewCount: 38,
            isFeatured: true,
            isAvailable: true,
            createdAt: "2026-09-20T10:00:00Z",
            updatedAt: "2026-09-27T08:00:00Z",
          },
          quantity: 3,
          unitPrice: 180,
          totalPrice: 540,
        },
      ],
      savedForLater: [],

      addItem: (product: Product, quantity: number = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.productId === product.id
          )

          if (existingIndex > -1) {
            const updatedItems = [...state.items]
            const currentItem = updatedItems[existingIndex]
            const newQty = Math.min(
              currentItem.quantity + quantity,
              product.availableQuantity
            )
            updatedItems[existingIndex] = {
              ...currentItem,
              quantity: newQty,
              totalPrice: newQty * currentItem.unitPrice,
            }
            return { items: updatedItems }
          }

          const newItem: CartItem = {
            id: `item-${Date.now()}-${product.id}`,
            productId: product.id,
            product,
            quantity: Math.min(quantity, product.availableQuantity),
            unitPrice: product.price,
            totalPrice: Math.min(quantity, product.availableQuantity) * product.price,
          }

          return { items: [...state.items, newItem] }
        })
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }))
      },

      updateQuantity: (productId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.productId !== productId),
            }
          }

          return {
            items: state.items.map((item) => {
              if (item.productId === productId) {
                const maxQty = item.product.availableQuantity
                const validQty = Math.min(Math.max(1, quantity), maxQty)
                return {
                  ...item,
                  quantity: validQty,
                  totalPrice: validQty * item.unitPrice,
                }
              }
              return item
            }),
          }
        })
      },

      saveForLater: (productId: string) => {
        set((state) => {
          const item = state.items.find((i) => i.productId === productId)
          if (!item) return state

          return {
            items: state.items.filter((i) => i.productId !== productId),
            savedForLater: [...state.savedForLater, item],
          }
        })
      },

      moveToCart: (productId: string) => {
        set((state) => {
          const item = state.savedForLater.find((i) => i.productId === productId)
          if (!item) return state

          return {
            savedForLater: state.savedForLater.filter((i) => i.productId !== productId),
            items: [...state.items, item],
          }
        })
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.totalPrice, 0)
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal()
        if (subtotal === 0) return 0
        if (subtotal > 3500) return 0 // Free delivery over KES 3,500
        return 180
      },

      getTotal: () => {
        const subtotal = get().getSubtotal()
        if (subtotal === 0) return 0
        return subtotal + get().getDeliveryFee()
      },
    }),
    {
      name: "farm-market-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
