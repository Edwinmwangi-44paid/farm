import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">FarmMarket</h3>
          <p className="text-sm text-stone-400 mb-4">
            Fresh produce and farm products directly from trusted local farmers to your table.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
            <li><Link to="/farmers" className="hover:text-white transition-colors">Our Farmers</Link></li>
            <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-stone-800 text-sm text-center text-stone-500">
        &copy; {new Date().getFullYear()} FarmMarket. All rights reserved.
      </div>
    </footer>
  );
}
