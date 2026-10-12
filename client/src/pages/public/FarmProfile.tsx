import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Mail, Phone, Leaf } from "lucide-react";
import { mockFarms, mockProducts } from "../../services/mock/data";
import { ProductCard } from "../../components/marketplace/ProductCard";

export default function FarmProfile() {
  const { id } = useParams<{ id: string }>();
  const farm = mockFarms.find(f => f.id === id);
  const farmProducts = mockProducts.filter(p => p.farmId === id);

  if (!farm) {
    return <div className="container mx-auto px-4 py-24 text-center">Farm not found</div>;
  }

  return (
    <div className="bg-stone-50 min-h-screen pb-16">
      {/* Cover Image */}
      <div className="h-64 md:h-80 w-full bg-stone-300 relative">
        <img 
          src={farm.coverImage || "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=1600&q=80"} 
          alt={`${farm.name} Cover`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container mx-auto px-4 relative -mt-20">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-200">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2">{farm.name}</h1>
              
              <div className="flex items-center gap-4 mb-6 text-stone-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> <span>{farm.location}</span>
                </div>
                <div className="flex items-center gap-1 bg-stone-100 px-2 py-1 rounded-md text-stone-800">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{farm.rating}</span>
                  <span className="text-stone-500 text-sm">({farm.reviewCount})</span>
                </div>
              </div>

              <div className="prose prose-stone max-w-none mb-8">
                <p className="text-stone-700 leading-relaxed text-lg">
                  {farm.description}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-lg text-stone-900 mb-4">Farming Practices</h3>
                <div className="flex flex-wrap gap-2">
                  {farm.farmingPractices.map((practice, index) => (
                    <span key={index} className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
                      <Leaf className="h-3 w-3" /> {practice}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="w-full md:w-80 bg-stone-50 p-6 rounded-2xl border border-stone-200 flex-shrink-0">
              <h3 className="font-semibold text-lg text-stone-900 mb-4">Contact Farm</h3>
              <div className="space-y-4 mb-6">
                <a href="#" className="flex items-center gap-3 text-stone-600 hover:text-green-700">
                  <Mail className="h-5 w-5" /> <span>Contact via message</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-stone-600 hover:text-green-700">
                  <Phone className="h-5 w-5" /> <span>Request callback</span>
                </a>
              </div>
              <button className="w-full bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 font-semibold py-3 px-4 rounded-xl transition-colors">
                Follow Farm
              </button>
            </div>
            
          </div>
        </div>
      </div>

      {/* Farm Products */}
      <div className="container mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2">
          Products from {farm.name} <span className="text-sm font-normal text-stone-500 bg-stone-200 px-2 py-0.5 rounded-full">{farmProducts.length}</span>
        </h2>
        
        {farmProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {farmProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
            <p className="text-stone-500">This farm currently has no products listed.</p>
          </div>
        )}
      </div>
    </div>
  );
}
