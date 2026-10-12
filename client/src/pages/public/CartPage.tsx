import { Link, useNavigate } from "react-router-dom"
import {
  Trash2,
  Bookmark,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  ArrowLeft,
} from "lucide-react"
import { PriceDisplay } from "@/components/common/PriceDisplay"
import { QuantitySelector } from "@/components/common/QuantitySelector"
import { EmptyState } from "@/components/common/EmptyState"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/useCartStore"
import { formatCurrency } from "@/lib/utils"

export function CartPage() {
  const navigate = useNavigate()
  const {
    items,
    savedForLater,
    removeItem,
    updateQuantity,
    saveForLater,
    moveToCart,
    getSubtotal,
    getDeliveryFee,
    getTotal,
    clearCart,
  } = useCartStore()

  const subtotal = getSubtotal()
  const deliveryFee = getDeliveryFee()
  const total = getTotal()

  if (items.length === 0 && savedForLater.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your basket is empty"
          description="Looks like you haven't added any fresh produce or farm goods to your basket yet."
          actionLabel="Browse Marketplace"
          onAction={() => navigate("/marketplace")}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Your Produce Basket
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {items.length} {items.length === 1 ? "item" : "items"} ready for harvest & dispatch
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={() => clearCart()}
            className="text-xs text-rose-600 hover:underline font-semibold"
          >
            Clear Basket
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.length === 0 ? (
            <div className="p-8 rounded-2xl border border-dashed border-[#ede8de] text-center bg-white">
              <p className="text-sm text-slate-500">
                All active items have been moved to "Saved for Later".
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-[#ede8de] bg-white p-4 sm:p-5 shadow-sm transition-all"
              >
                {/* Product thumbnail & basic info */}
                <div className="flex items-center gap-4 flex-1">
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl overflow-hidden bg-[#f4f1ea] shrink-0 border border-slate-100"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-[#1b4332] block">
                      {item.product.farmer.farmName} • {item.product.farmer.county}
                    </span>
                    <h3 className="font-bold text-slate-900 hover:text-[#1b4332] transition-colors leading-tight text-sm sm:text-base">
                      <Link to={`/product/${item.product.slug}`}>{item.product.name}</Link>
                    </h3>
                    <div className="text-xs text-slate-500">
                      <span>{formatCurrency(item.unitPrice)}</span>
                      <span className="text-slate-400"> / {item.product.unit}</span>
                    </div>
                  </div>
                </div>

                {/* Stepper & Price & Actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="flex items-center gap-3">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(newQty) => updateQuantity(item.productId, newQty)}
                      min={1}
                      max={item.product.availableQuantity}
                      size="sm"
                    />
                    <div className="text-right min-w-[90px]">
                      <span className="text-sm sm:text-base font-bold text-slate-900 block">
                        {formatCurrency(item.totalPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Remove & Save for Later */}
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <button
                      onClick={() => saveForLater(item.productId)}
                      className="inline-flex items-center gap-1 hover:text-[#1b4332] transition-colors font-medium"
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                      <span>Save for later</span>
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="inline-flex items-center gap-1 hover:text-rose-600 transition-colors font-medium"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Continue Shopping Link */}
          <div className="pt-2">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1b4332] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Continue Shopping Produce</span>
            </Link>
          </div>

          {/* Saved For Later Section */}
          {savedForLater.length > 0 && (
            <div className="pt-8 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Saved For Later ({savedForLater.length})
              </h3>

              <div className="space-y-3">
                {savedForLater.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-[#ede8de] bg-[#fbfaf8] p-3.5 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900">{item.product.name}</h4>
                        <span className="text-slate-500">
                          {formatCurrency(item.unitPrice)} / {item.product.unit}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveToCart(item.productId)}
                        className="text-xs h-8"
                      >
                        Move to Basket
                      </Button>
                      <button
                        onClick={() =>
                          useCartStore.setState((s) => ({
                            savedForLater: s.savedForLater.filter(
                              (i) => i.productId !== item.productId
                            ),
                          }))
                        }
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <aside className="lg:col-span-4 rounded-3xl border border-[#ede8de] bg-white p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 font-display">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between text-slate-600">
              <span>Produce Subtotal</span>
              <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1">
                <span>Estimated Delivery</span>
                {subtotal > 3500 && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                    FREE
                  </span>
                )}
              </span>
              <span className="font-semibold text-slate-900">
                {deliveryFee === 0 ? "Free" : formatCurrency(deliveryFee)}
              </span>
            </div>

            {subtotal > 0 && subtotal < 3500 && (
              <div className="rounded-xl bg-[#f4f1ea] p-2.5 text-[11px] text-[#1b4332] font-medium border border-[#e2dcd0]">
                Add <strong>{formatCurrency(3500 - subtotal)}</strong> more of fresh produce to qualify for free express delivery!
              </div>
            )}

            <div className="pt-3 border-t border-[#ede8de] flex items-baseline justify-between">
              <div>
                <span className="text-base font-bold text-slate-900 block">Total</span>
                <span className="text-[11px] text-slate-400">Includes VAT & farmer packaging</span>
              </div>
              <span className="text-xl font-extrabold text-[#1b4332]">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          <Button
            variant="default"
            size="lg"
            disabled={items.length === 0}
            onClick={() => navigate("/checkout")}
            className="w-full gap-2 text-base font-bold shadow-md bg-[#1b4332] hover:bg-[#143427]"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="h-4 w-4" />
          </Button>

          {/* Trust Guarantees */}
          <div className="space-y-2 text-xs text-slate-500 pt-4 border-t border-[#ede8de]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#1b4332] shrink-0" />
              <span>Safe M-Pesa & Card Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-[#1b4332] shrink-0" />
              <span>Farm direct cold-protection dispatch</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
