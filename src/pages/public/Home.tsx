import { Link } from "react-router-dom";
import { ArrowRight, Leaf, ShieldCheck, Truck } from "lucide-react";
import { mockCategories, mockProducts, mockFarms } from "../../services/mock/data";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&q=80" 
            alt="Farm field" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl tracking-tight">
            Fresh From the Farm. <br className="hidden md:block"/> Straight to You.
          </h1>
          <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-2xl">
            Discover fresh produce, meats, and dairy directly from trusted local farmers in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/marketplace" 
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all flex items-center justify-center gap-2"
            >
              Shop Fresh Produce <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              to="/register?type=farmer" 
              className="px-8 py-4 bg-white hover:bg-stone-100 text-stone-900 rounded-full font-semibold transition-all flex items-center justify-center"
            >
              Sell Your Products
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center p-6">
            <div className="h-16 w-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-6">
              <Leaf className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Farm Fresh</h3>
            <p className="text-stone-600">Harvested to order. Enjoy the freshest produce straight from the source.</p>
          </div>
          <div className="flex flex-col items-center p-6">
            <div className="h-16 w-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Trusted Farmers</h3>
            <p className="text-stone-600">Every farmer on our platform is verified for quality and safe practices.</p>
          </div>
          <div className="flex flex-col items-center p-6">
            <div className="h-16 w-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-6">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Convenient Delivery</h3>
            <p className="text-stone-600">Get your orders delivered to your doorstep or pick up locally.</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-stone-900">Shop by Category</h2>
              <p className="text-stone-600 mt-2">Find exactly what you're looking for</p>
            </div>
            <Link to="/categories" className="text-green-700 font-semibold hover:underline hidden sm:block">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockCategories.map((category) => (
              <Link 
                key={category.id} 
                to={`/marketplace?category=${category.slug}`}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center min-h-[140px]"
              >
                <span className="font-semibold text-stone-800">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Add more sections (Featured Products, Farms) */}
    </div>
  );
}
