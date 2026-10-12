import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { mockProducts, mockCategories } from "../../services/mock/data";
import { ProductCard } from "../../components/marketplace/ProductCard";

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts = activeCategory === "all" 
    ? mockProducts 
    : mockProducts.filter(p => p.categoryId === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 sticky top-24">
          <div className="flex items-center gap-2 font-semibold text-lg mb-4 pb-4 border-b border-stone-100">
            <Filter className="h-5 w-5" /> Filters
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-stone-900 mb-3">Categories</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveCategory("all")}
                  className={`block w-full text-left text-sm ${activeCategory === "all" ? "text-green-700 font-semibold" : "text-stone-600 hover:text-stone-900"}`}
                >
                  All Products
                </button>
                {mockCategories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`block w-full text-left text-sm ${activeCategory === cat.id ? "text-green-700 font-semibold" : "text-stone-600 hover:text-stone-900"}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-stone-900">Marketplace</h1>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-stone-500">Sort by:</span>
            <button className="flex items-center gap-1 text-sm font-medium bg-white border border-stone-200 px-3 py-1.5 rounded-lg hover:bg-stone-50 transition-colors">
              Recommended <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
            <h3 className="text-lg font-semibold text-stone-900 mb-2">No products found</h3>
            <p className="text-stone-500">Try adjusting your filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
}
