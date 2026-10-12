import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, ChevronRight, CreditCard, MapPin, Package, User } from "lucide-react";
import { useCart } from "../../stores/useCart";
import { mockProducts } from "../../services/mock/data";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(5, "Delivery address is required"),
  city: z.string().min(2, "City is required"),
  deliveryMethod: z.enum(["delivery", "pickup"]),
  paymentMethod: z.enum(["mpesa", "card", "cash"]),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryMethod: "delivery",
      paymentMethod: "mpesa",
    }
  });

  const cartItems = items.map(item => ({
    ...item,
    product: mockProducts.find(p => p.id === item.productId)!
  })).filter(item => item.product);

  const subtotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const deliveryFee = watch("deliveryMethod") === "delivery" ? 250 : 0;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button onClick={() => navigate("/marketplace")} className="text-green-600 hover:underline">
          Return to Marketplace
        </button>
      </div>
    );
  }

  const handleNextStep = async (fieldsToValidate: (keyof CheckoutValues)[]) => {
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setStep(s => s + 1);
  };

  const onSubmit = (data: CheckoutValues) => {
    setIsProcessing(true);
    // Simulate API call and payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      // Pass mock order data to confirmation page
      navigate("/order-confirmation", { state: { orderId: `FM-${Math.floor(Math.random() * 1000000)}`, total } });
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-stone-900 mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-stone-200 z-0" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-600 z-0 transition-all duration-300" 
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />
            
            {[
              { num: 1, label: "Details", icon: User },
              { num: 2, label: "Delivery", icon: MapPin },
              { num: 3, label: "Payment", icon: CreditCard },
              { num: 4, label: "Review", icon: Check }
            ].map(s => (
              <div key={s.num} className="relative z-10 flex flex-col items-center gap-2 bg-stone-50 px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors
                  ${step >= s.num ? 'bg-green-600 border-green-600 text-white' : 'bg-white border-stone-300 text-stone-400'}`}>
                  {step > s.num ? <Check className="h-5 w-5" /> : s.num}
                </div>
                <span className={`text-xs font-medium ${step >= s.num ? 'text-stone-900' : 'text-stone-400'}`}>{s.label}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8">
            
            {/* Step 1: Details */}
            <div className={step === 1 ? 'block' : 'hidden'}>
              <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-green-600" /> Customer Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">First Name</label>
                  <input {...register("firstName")} className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Last Name</label>
                  <input {...register("lastName")} className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                  <input type="email" {...register("email")} className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Phone Number</label>
                  <input {...register("phone")} className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => handleNextStep(['firstName', 'lastName', 'email', 'phone'])}
                className="bg-stone-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-stone-800 flex items-center gap-2 ml-auto"
              >
                Continue to Delivery <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Step 2: Delivery */}
            <div className={step === 2 ? 'block' : 'hidden'}>
              <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" /> Delivery Options
              </h2>
              
              <div className="flex gap-4 mb-6">
                <label className={`flex-1 border rounded-xl p-4 cursor-pointer transition-colors ${watch("deliveryMethod") === "delivery" ? 'border-green-600 bg-green-50' : 'border-stone-200'}`}>
                  <input type="radio" value="delivery" {...register("deliveryMethod")} className="sr-only" />
                  <div className="font-bold mb-1 flex items-center gap-2"><Truck className="h-4 w-4" /> Delivery</div>
                  <div className="text-sm text-stone-500">To your address (+KES 250)</div>
                </label>
                <label className={`flex-1 border rounded-xl p-4 cursor-pointer transition-colors ${watch("deliveryMethod") === "pickup" ? 'border-green-600 bg-green-50' : 'border-stone-200'}`}>
                  <input type="radio" value="pickup" {...register("deliveryMethod")} className="sr-only" />
                  <div className="font-bold mb-1 flex items-center gap-2"><Package className="h-4 w-4" /> Pickup</div>
                  <div className="text-sm text-stone-500">From collection point (Free)</div>
                </label>
              </div>

              {watch("deliveryMethod") === "delivery" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-stone-700 mb-1">Street Address</label>
                    <input {...register("address")} className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">City / Region</label>
                    <input {...register("city")} className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <button type="button" onClick={() => setStep(1)} className="text-stone-500 hover:text-stone-900 font-medium px-4 py-2">Back</button>
                <button 
                  type="button" 
                  onClick={() => handleNextStep(watch("deliveryMethod") === "delivery" ? ['address', 'city'] : [])}
                  className="bg-stone-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-stone-800 flex items-center gap-2"
                >
                  Continue to Payment <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Step 3: Payment */}
            <div className={step === 3 ? 'block' : 'hidden'}>
              <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-600" /> Payment Method
              </h2>
              
              <div className="space-y-3 mb-8">
                <label className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition-colors ${watch("paymentMethod") === "mpesa" ? 'border-green-600 bg-green-50' : 'border-stone-200'}`}>
                  <input type="radio" value="mpesa" {...register("paymentMethod")} className="w-4 h-4 text-green-600 focus:ring-green-500" />
                  <div>
                    <div className="font-bold">M-PESA</div>
                    <div className="text-sm text-stone-500">Pay via M-PESA Express</div>
                  </div>
                </label>
                <label className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition-colors ${watch("paymentMethod") === "card" ? 'border-green-600 bg-green-50' : 'border-stone-200'}`}>
                  <input type="radio" value="card" {...register("paymentMethod")} className="w-4 h-4 text-green-600 focus:ring-green-500" />
                  <div>
                    <div className="font-bold">Credit/Debit Card</div>
                    <div className="text-sm text-stone-500">Visa, Mastercard</div>
                  </div>
                </label>
                <label className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition-colors ${watch("paymentMethod") === "cash" ? 'border-green-600 bg-green-50' : 'border-stone-200'}`}>
                  <input type="radio" value="cash" {...register("paymentMethod")} className="w-4 h-4 text-green-600 focus:ring-green-500" />
                  <div>
                    <div className="font-bold">Cash on Delivery</div>
                    <div className="text-sm text-stone-500">Pay when you receive your order</div>
                  </div>
                </label>
              </div>

              <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm mb-6 border border-yellow-200">
                <strong>Note:</strong> This is a mock payment interface for development. No real transactions will occur.
              </div>

              <div className="flex justify-between">
                <button type="button" onClick={() => setStep(2)} className="text-stone-500 hover:text-stone-900 font-medium px-4 py-2">Back</button>
                <button 
                  type="button" 
                  onClick={() => setStep(4)}
                  className="bg-stone-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-stone-800 flex items-center gap-2"
                >
                  Review Order <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Step 4: Review */}
            <div className={step === 4 ? 'block' : 'hidden'}>
              <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" /> Order Review
              </h2>
              
              <div className="bg-stone-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold mb-4">Please confirm your details</h3>
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <span className="text-stone-500 block mb-1">Customer</span>
                    <strong>{watch("firstName")} {watch("lastName")}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block mb-1">Payment Method</span>
                    <strong className="uppercase">{watch("paymentMethod")}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block mb-1">Delivery</span>
                    <strong className="capitalize">{watch("deliveryMethod")}</strong>
                  </div>
                  {watch("deliveryMethod") === "delivery" && (
                    <div>
                      <span className="text-stone-500 block mb-1">Address</span>
                      <strong>{watch("address")}, {watch("city")}</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button type="button" onClick={() => setStep(3)} className="text-stone-500 hover:text-stone-900 font-medium px-4 py-2" disabled={isProcessing}>Back</button>
                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 disabled:bg-stone-400 flex items-center gap-2"
                >
                  {isProcessing ? "Processing..." : `Place Order (KES ${total.toLocaleString()})`}
                </button>
              </div>
            </div>

          </form>
        </div>
        
        {/* Order Summary */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-4 pb-4 border-b border-stone-200">Order Summary</h3>
            <div className="space-y-4 mb-4 max-h-60 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex gap-3 text-sm">
                  <img src={item.product.images[0]} alt="" className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-stone-900 line-clamp-1">{item.product.name}</p>
                    <p className="text-stone-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-medium">
                    {(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-stone-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery</span>
                <span>{deliveryFee > 0 ? `KES ${deliveryFee.toLocaleString()}` : "Free"}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-stone-900 pt-2 border-t border-stone-200 mt-2">
                <span>Total</span>
                <span>KES {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
