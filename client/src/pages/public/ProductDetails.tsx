import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MapPin, ShieldCheck, Truck, Plus, Minus, Heart } from "lucide-react";
import { mockProducts, mockFarms } from "../../services/mock/data";
import { useCart } from "../../stores/useCart";

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const product = mockProducts.find(p => p.slug === slug);
  const farm = mockFarms.find(f => f.id === product?.farmId);
  
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  if (!product || !farm) {
    return <div className="container mx-auto px-4 py-24 text-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    // Could add toast notification here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-stone-500 mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/" className="hover:text-green-700">Home</Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2">/</span>
              <Link to="/marketplace" className="hover:text-green-700">Marketplace</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-stone-900 font-medium">{product.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row gap-12 mb-16">
        {/* Product Images */}
        <div className="w-full md:w-1/2">
          <div className="bg-stone-100 rounded-3xl overflow-hidden mb-4 border border-stone-200">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-auto object-cover aspect-square"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900">{product.name}</h1>
            <button className="p-2 rounded-full border border-stone-200 text-stone-500 hover:text-red-500 hover:border-red-200 transition-colors">
              <Heart className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 text-sm bg-stone-100 px-3 py-1 rounded-lg">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-stone-500">({product.reviewCount} reviews)</span>
            </div>
            <Link to={`/farm/${farm.id}`} className="text-sm font-medium text-green-700 hover:underline">
              {farm.name}
            </Link>
          </div>
          
          <div className="mb-8 pb-8 border-b border-stone-200">
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-stone-900">{product.currency} {product.price.toLocaleString()}</span>
              <span className="text-xl text-stone-500 mb-1">/ {product.unit}</span>
            </div>
            {product.isAvailable ? (
              <p className="text-sm text-green-600 font-medium">{product.availableQuantity} {product.unit}s available</p>
            ) : (
              <p className="text-sm text-red-600 font-medium">Out of stock</p>
            )}
          </div>

          <div className="mb-8">
            <p className="text-stone-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-stone-600">
              <MapPin className="h-5 w-5 text-stone-400" />
              <span>Location: <strong>{farm.location}</strong></span>
            </div>
            {product.farmingMethod && (
              <div className="flex items-center gap-3 text-stone-600">
                <ShieldCheck className="h-5 w-5 text-stone-400" />
                <span>Method: <strong>{product.farmingMethod}</strong></span>
              </div>
            )}
            <div className="flex items-center gap-3 text-stone-600">
              <Truck className="h-5 w-5 text-stone-400" />
              <span>Delivery: <strong>Local pickup & delivery available</strong></span>
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-stone-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-stone-300 rounded-xl px-4 py-3 bg-white w-full sm:w-auto">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:bg-stone-100 rounded text-stone-600"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.availableQuantity, quantity + 1))}
                  className="p-1 hover:bg-stone-100 rounded text-stone-600"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                disabled={!product.isAvailable}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl transition-colors text-lg shadow-sm hover:shadow-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
