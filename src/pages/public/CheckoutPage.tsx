import * as React from "react"
import { useNavigate, Link } from "react-router-dom"
import {
  Check,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Truck,
  CreditCard,
  Smartphone,
  Banknote,
  MapPin,
  Lock,
} from "lucide-react"
import { useCartStore } from "@/stores/useCartStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { orderService } from "@/services/api/orders"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"
import { DeliveryMethodType, PaymentMethod, Address } from "@/types"

const STEPS = [
  { id: 1, name: "Customer" },
  { id: 2, name: "Address" },
  { id: 3, name: "Delivery" },
  { id: 4, name: "Payment" },
  { id: 5, name: "Review" },
]

export function CheckoutPage() {
  const navigate = useNavigate()
  const { items, getSubtotal, getDeliveryFee, getTotal, clearCart } = useCartStore()
  const { user } = useAuthStore()

  const [currentStep, setCurrentStep] = React.useState<number>(1)
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false)

  // Step 1: Customer Info
  const [customerName, setCustomerName] = React.useState(user?.name || "Amina Hassan")
  const [customerEmail, setCustomerEmail] = React.useState(user?.email || "customer@farmmarket.co.ke")
  const [customerPhone, setCustomerPhone] = React.useState(user?.phone || "+254 712 998 877")

  // Step 2: Delivery Address
  const [address, setAddress] = React.useState<Address>({
    id: "addr-new",
    userId: user?.id || "user-cust-1",
    fullName: user?.name || "Amina Hassan",
    phone: user?.phone || "+254 712 998 877",
    county: "Nairobi",
    town: "Kilimani",
    street: "Argwings Kodhek Road",
    building: "Valley View Court, Apt 4B",
    isDefault: true,
    deliveryNotes: "Call when at the front security gate.",
  })

  // Step 3: Delivery Method
  const [deliveryMethod, setDeliveryMethod] = React.useState<DeliveryMethodType>("farm_direct")

  // Step 4: Payment Method & M-Pesa details
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>("mpesa")
  const [mpesaPhone, setMpesaPhone] = React.useState(user?.phone || "0712998877")

  const subtotal = getSubtotal()
  const deliveryFee = deliveryMethod === "pickup" ? 0 : getDeliveryFee()
  const total = subtotal + deliveryFee

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Your basket is empty</h2>
        <p className="text-slate-500">Please add products to your basket before checking out.</p>
        <Link to="/marketplace">
          <Button variant="default">Browse Marketplace</Button>
        </Link>
      </div>
    )
  }

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    try {
      const orderPayload = {
        userId: user?.id || "user-cust-1",
        customerName,
        customerPhone,
        customerEmail,
        items: items.map((i) => ({
          id: `item-${Date.now()}-${i.productId}`,
          productId: i.productId,
          productName: i.product.name,
          productImage: i.product.images[0],
          farmerName: i.product.farmer.farmName,
          farmSlug: i.product.farmer.slug,
          unit: i.product.unit,
          unitPrice: i.unitPrice,
          quantity: i.quantity,
          totalPrice: i.totalPrice,
        })),
        subtotal,
        deliveryFee,
        packagingFee: 0,
        total,
        paymentMethod,
        deliveryAddress: address,
        deliveryMethod,
        notes: address.deliveryNotes,
      }

      const createdOrder = await orderService.createOrder(orderPayload)
      clearCart()
      navigate(`/order-confirmation/${createdOrder.id}`)
    } catch {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Checkout
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complete your farm direct harvest order in 5 simple steps
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#ede8de] shadow-sm">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {STEPS.map((s, idx) => {
            const isCompleted = currentStep > s.id
            const isCurrent = currentStep === s.id

            return (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isCompleted
                        ? "bg-emerald-600 text-white"
                        : isCurrent
                        ? "bg-[#1b4332] text-white ring-4 ring-emerald-100"
                        : "bg-[#f4f1ea] text-slate-400 border border-slate-200"
                    }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : s.id}
                  </div>
                  <span
                    className={`text-[11px] font-semibold mt-1.5 hidden sm:block ${
                      isCurrent ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {s.name}
                  </span>
                </div>

                {idx < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-colors ${
                      currentStep > s.id ? "bg-emerald-600" : "bg-[#ede8de]"
                    }`}
                  />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Wizard Step Form */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#ede8de] shadow-sm space-y-6">
          {/* Step 1: Customer Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Step 1: Customer Information</h2>
              <p className="text-xs text-slate-500">
                Contact details where harvest status and delivery rider updates will be sent.
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Full Name
                  </label>
                  <Input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Amina Hassan"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Phone Number (M-Pesa enabled)
                    </label>
                    <Input
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Delivery Address */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Step 2: Delivery Address</h2>
              <p className="text-xs text-slate-500">
                Specify your exact residence or office drop location in Kenya.
              </p>

              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      County / Region
                    </label>
                    <Select
                      value={address.county}
                      onChange={(e) => setAddress({ ...address, county: e.target.value })}
                    >
                      <option value="Nairobi">Nairobi</option>
                      <option value="Kiambu">Kiambu</option>
                      <option value="Nakuru">Nakuru</option>
                      <option value="Nyeri">Nyeri</option>
                      <option value="Machakos">Machakos</option>
                      <option value="Murang'a">Murang'a</option>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Town / Suburb / Estate
                    </label>
                    <Input
                      value={address.town}
                      onChange={(e) => setAddress({ ...address, town: e.target.value })}
                      placeholder="e.g. Kilimani, Westlands, Ruaka"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Street / Road
                  </label>
                  <Input
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder="e.g. Argwings Kodhek Road"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Building / Court / Apartment No.
                  </label>
                  <Input
                    value={address.building || ""}
                    onChange={(e) => setAddress({ ...address, building: e.target.value })}
                    placeholder="e.g. Valley View Court, House 4B"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Delivery Instructions / Gate Code
                  </label>
                  <Input
                    value={address.deliveryNotes || ""}
                    onChange={(e) => setAddress({ ...address, deliveryNotes: e.target.value })}
                    placeholder="e.g. Ring the bell at gate; leave with security if away"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Delivery Method */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Step 3: Delivery Method</h2>
              <p className="text-xs text-slate-500">
                Choose how your farm produce should be fulfilled.
              </p>

              <div className="space-y-3 pt-2">
                <label
                  onClick={() => setDeliveryMethod("farm_direct")}
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    deliveryMethod === "farm_direct"
                      ? "border-[#1b4332] bg-emerald-50/40 ring-1 ring-[#1b4332]"
                      : "border-slate-200 hover:bg-[#fbfaf8]"
                  }`}
                >
                  <div className="h-10 w-10 rounded-xl bg-white border flex items-center justify-center text-[#1b4332] shrink-0">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">Farm Direct Standard (48h)</h4>
                      <span className="text-xs font-bold text-[#1b4332]">KES 180</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Harvested today, sorted and delivered within 48 hours in insulated crates.
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setDeliveryMethod("express_24h")}
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    deliveryMethod === "express_24h"
                      ? "border-[#1b4332] bg-emerald-50/40 ring-1 ring-[#1b4332]"
                      : "border-slate-200 hover:bg-[#fbfaf8]"
                  }`}
                >
                  <div className="h-10 w-10 rounded-xl bg-white border flex items-center justify-center text-[#d97706] shrink-0">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">Priority Express (24h)</h4>
                      <span className="text-xs font-bold text-[#1b4332]">KES 280</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Immediate morning harvest dispatch directly to your doorstep tomorrow.
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    deliveryMethod === "pickup"
                      ? "border-[#1b4332] bg-emerald-50/40 ring-1 ring-[#1b4332]"
                      : "border-slate-200 hover:bg-[#fbfaf8]"
                  }`}
                >
                  <div className="h-10 w-10 rounded-xl bg-white border flex items-center justify-center text-slate-600 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">Direct Farmer Collection</h4>
                      <span className="text-xs font-bold text-emerald-700">FREE</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Pick up directly from the farm gates or regional aggregation hub.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Payment Method */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Step 4: Payment Method</h2>
              <p className="text-xs text-slate-500">
                Select your preferred Kenyan payment channel. (Mocked for testing)
              </p>

              <div className="space-y-3 pt-2">
                <label
                  onClick={() => setPaymentMethod("mpesa")}
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "mpesa"
                      ? "border-[#1b4332] bg-emerald-50/40 ring-1 ring-[#1b4332]"
                      : "border-slate-200 hover:bg-[#fbfaf8]"
                  }`}
                >
                  <div className="h-10 w-10 rounded-xl bg-[#2d6a4f] text-white flex items-center justify-center shrink-0">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">M-PESA Express (STK Push)</h4>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        RECOMMENDED
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      You will receive an instant prompt on your Safaricom phone to enter PIN.
                    </p>

                    {paymentMethod === "mpesa" && (
                      <div className="mt-3 pt-3 border-t border-emerald-200/60">
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          M-Pesa Mobile Number
                        </label>
                        <Input
                          value={mpesaPhone}
                          onChange={(e) => setMpesaPhone(e.target.value)}
                          placeholder="07XX XXX XXX"
                          className="max-w-xs"
                        />
                      </div>
                    )}
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-[#1b4332] bg-emerald-50/40 ring-1 ring-[#1b4332]"
                      : "border-slate-200 hover:bg-[#fbfaf8]"
                  }`}
                >
                  <div className="h-10 w-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900">Visa / Mastercard / Debit Card</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Secure encrypted card payment powered by 3D-Secure.
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod("cash_on_delivery")}
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "cash_on_delivery"
                      ? "border-[#1b4332] bg-emerald-50/40 ring-1 ring-[#1b4332]"
                      : "border-slate-200 hover:bg-[#fbfaf8]"
                  }`}
                >
                  <div className="h-10 w-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                    <Banknote className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900">Cash / M-Pesa on Delivery</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Inspect your produce at your door before confirming payment to rider.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Step 5: Order Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Step 5: Order Review & Confirmation</h2>
              <p className="text-xs text-slate-500">
                Please verify your details before final dispatch.
              </p>

              <div className="space-y-4 pt-2">
                {/* Customer & Address confirmation cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#fbfaf8] border border-[#ede8de] text-xs space-y-1">
                    <span className="font-bold text-slate-900 block text-sm mb-1">
                      Customer & Delivery
                    </span>
                    <p><strong>Recipient:</strong> {customerName}</p>
                    <p><strong>Phone:</strong> {customerPhone}</p>
                    <p><strong>Email:</strong> {customerEmail}</p>
                    <p><strong>Location:</strong> {address.street}, {address.town}, {address.county}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#fbfaf8] border border-[#ede8de] text-xs space-y-1">
                    <span className="font-bold text-slate-900 block text-sm mb-1">
                      Method & Payment
                    </span>
                    <p><strong>Fulfillment:</strong> {deliveryMethod.replace("_", " ").toUpperCase()}</p>
                    <p><strong>Payment Mode:</strong> {paymentMethod.toUpperCase()}</p>
                    {paymentMethod === "mpesa" && (
                      <p><strong>STK Prompt Phone:</strong> {mpesaPhone}</p>
                    )}
                    <p className="text-emerald-700 font-semibold pt-1">
                      ✓ Zero Middleman Commission Guarantee
                    </p>
                  </div>
                </div>

                {/* Produce items brief recap */}
                <div className="rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="bg-[#f4f1ea] px-4 py-2 text-xs font-bold text-slate-700">
                    Produce in this harvest ({items.length} items)
                  </div>
                  <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto p-2">
                    {items.map((i) => (
                      <div key={i.productId} className="flex justify-between items-center py-2 text-xs px-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={i.product.images[0]}
                            alt={i.product.name}
                            className="h-8 w-8 rounded-lg object-cover"
                          />
                          <div>
                            <span className="font-semibold text-slate-900">{i.product.name}</span>
                            <span className="text-slate-400 block text-[10px]">
                              {i.quantity} x {i.product.unit} @ {formatCurrency(i.unitPrice)}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-slate-900">{formatCurrency(i.totalPrice)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
                className="gap-1.5"
                disabled={isProcessing}
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
            ) : (
              <Link to="/cart">
                <Button variant="ghost" size="sm" className="gap-1.5 text-slate-500">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Return to Basket</span>
                </Button>
              </Link>
            )}

            {currentStep < 5 ? (
              <Button variant="default" size="sm" onClick={handleNext} className="gap-1.5 font-bold">
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="default"
                size="lg"
                onClick={handlePlaceOrder}
                isLoading={isProcessing}
                className="bg-[#1b4332] hover:bg-[#143427] font-bold text-base shadow-lg"
              >
                <Lock className="h-4 w-4 mr-2" />
                <span>Confirm & Place Order ({formatCurrency(total)})</span>
              </Button>
            )}
          </div>
        </div>

        {/* Sticky Mini Order Summary */}
        <aside className="lg:col-span-4 rounded-3xl border border-[#ede8de] bg-white p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900">Summary</h3>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-semibold text-slate-900">
                {deliveryFee === 0 ? "FREE" : formatCurrency(deliveryFee)}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
              <span>Total KES</span>
              <span className="text-[#1b4332] text-lg font-extrabold">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#fbfaf8] rounded-xl border border-[#ede8de] text-[11px] text-slate-500 space-y-1">
            <div className="flex items-center gap-1.5 text-[#1b4332] font-semibold">
              <ShieldCheck className="h-4 w-4" />
              <span>Direct Farmer Payment Escrow</span>
            </div>
            <p>
              Your payment is safely held until you confirm receipt of fresh, undamaged produce.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
