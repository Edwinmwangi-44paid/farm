import { Link } from "react-router-dom";
import { Product } from "../../types";
import { Star, MapPin } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col h-full">
      <Link to={`/product/${product.slug}`} className="relative h-48 overflow-hidden block">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isAvailable ? (
          <span className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            In Stock
          </span>
        ) : (
          <span className="absolute top-2 left-2 bg-stone-100 text-stone-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Out of Stock
          </span>
        )}
      </Link>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.slug}`} className="font-semibold text-lg text-stone-900 hover:text-green-700 transition-colors">
            {product.name}
          </Link>
          <div className="flex items-center gap-1 text-sm bg-stone-100 px-2 py-1 rounded-md">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{product.rating}</span>
          </div>
        </div>
        
        <div className="text-stone-500 text-sm mb-4">
          <span className="font-bold text-stone-900 text-lg">{product.currency} {product.price.toLocaleString()}</span>
          <span className="text-stone-500"> / {product.unit}</span>
        </div>

        <div className="mt-auto space-y-2">
          <Link to={`/farm/${product.farmId}`} className="text-sm font-medium text-stone-700 hover:text-green-700 block">
            View Farm
          </Link>
          <div className="flex items-center gap-1 text-stone-500 text-xs">
            <MapPin className="h-3 w-3" /> <span>Local delivery available</span>
          </div>
          
          <button 
            disabled={!product.isAvailable}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-xl transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
