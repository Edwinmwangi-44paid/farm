import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../../stores/useCart";
import { mockProducts } from "../../services/mock/data";

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  
  const cartItems = items.map(item => {
    const product = mockProducts.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product !== undefined);

  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.product!.price * item.quantity);
  }, 0);
  
  const deliveryFee = subtotal > 0 ? 250 : 0;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-stone-100 p-6 rounded-full mb-6">
          <ShoppingBag className="h-12 w-12 text-stone-400" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Your cart is empty</h2>
        <p className="text-stone-500 mb-8 text-center max-w-md">
          Looks like you haven't added any fresh produce to your cart yet.
        </p>
        <Link 
          to="/marketplace" 
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-stone-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-200 flex justify-between items-center">
              <h2 className="font-semibold text-lg">Cart Items ({items.length})</h2>
              <button 
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear Cart
              </button>
            </div>
            
            <div className="divide-y divide-stone-200">
              {cartItems.map((item) => {
                const product = item.product!;
                return (
                  <div key={item.productId} className="p-6 flex flex-col sm:flex-row gap-6">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                    />
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link to={`/product/${product.slug}`} className="font-semibold text-lg hover:text-green-700 block">
                            {product.name}
                          </Link>
                          <p className="text-stone-500 text-sm mt-1">
                            {product.currency} {product.price} / {product.unit}
                          </p>
                        </div>
                        <p className="font-bold text-lg text-stone-900">
                          {product.currency} {(product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3 border border-stone-200 rounded-lg p-1">
                          <button 
                            onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                            className="p-1 hover:bg-stone-100 rounded text-stone-600"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, Math.min(product.availableQuantity, item.quantity + 1))}
                            className="p-1 hover:bg-stone-100 rounded text-stone-600"
                            disabled={item.quantity >= product.availableQuantity}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.productId)}
                          className="text-stone-400 hover:text-red-600 p-2 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-96">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 sticky top-24">
            <h2 className="font-semibold text-xl mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900">KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Delivery</span>
                <span className="font-medium text-stone-900">KES {deliveryFee.toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t border-stone-200 flex justify-between items-center">
                <span className="font-semibold text-lg text-stone-900">Total</span>
                <span className="font-bold text-2xl text-stone-900">KES {total.toLocaleString()}</span>
              </div>
            </div>
            
            <Link 
              to="/checkout"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm hover:shadow"
            >
              Proceed to Checkout <ArrowRight className="h-5 w-5" />
            </Link>
            
            <p className="text-xs text-stone-500 mt-4 text-center">
              Taxes and final delivery fees are calculated at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
