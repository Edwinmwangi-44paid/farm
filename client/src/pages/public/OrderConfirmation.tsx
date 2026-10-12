import { Link, useLocation, Navigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmation() {
  const location = useLocation();
  const orderData = location.state as { orderId: string, total: number } | null;

  if (!orderData) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-3xl border border-stone-200 p-8 md:p-12 text-center max-w-lg shadow-sm">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-stone-900 mb-2">Order Confirmed!</h1>
        <p className="text-stone-500 mb-8">
          Thank you for shopping with FarmMarket. Your order has been successfully placed.
        </p>
        
        <div className="bg-stone-50 rounded-xl p-6 mb-8 text-left border border-stone-200">
          <div className="flex justify-between items-center mb-3 pb-3 border-b border-stone-200">
            <span className="text-stone-500">Order Number</span>
            <span className="font-bold text-stone-900">{orderData.orderId}</span>
          </div>
          <div className="flex justify-between items-center mb-3 pb-3 border-b border-stone-200">
            <span className="text-stone-500">Total Paid (Mock)</span>
            <span className="font-bold text-stone-900">KES {orderData.total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-stone-500">Status</span>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">Processing</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/account/orders" 
            className="px-6 py-3 border-2 border-stone-200 rounded-xl font-medium hover:bg-stone-50 transition-colors"
          >
            Track Order
          </Link>
          <Link 
            to="/marketplace" 
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
