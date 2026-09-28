import { Link } from "react-router-dom"
import { Sprout, Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-[#ede8de] bg-[#f7f4ee] text-slate-700 mt-auto">
      {/* Trust Badges Strip */}
      <div className="border-b border-[#ede8de] bg-[#fbfaf8] py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4f1ea] text-[#1b4332] shrink-0 border border-[#ded7ca]">
                <Truck className="h-6 w-6 text-[#2d6a4f]" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Farm-Direct Fast Delivery</h4>
                <p className="text-xs text-slate-500">Same-day dispatch from Kiambu, Nairobi, Nakuru & Nyeri</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4f1ea] text-[#1b4332] shrink-0 border border-[#ded7ca]">
                <ShieldCheck className="h-6 w-6 text-[#2d6a4f]" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">100% Verified Local Growers</h4>
                <p className="text-xs text-slate-500">Every farmer is inspected for quality and ethical practices</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4f1ea] text-[#1b4332] shrink-0 border border-[#ded7ca]">
                <RefreshCw className="h-6 w-6 text-[#2d6a4f]" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Freshness Guarantee</h4>
                <p className="text-xs text-slate-500">Full replacement or instant refund if not 100% satisfied</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1b4332] text-white shadow-sm">
                <Sprout className="h-5 w-5 text-emerald-400" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 font-display">
                Farm<span className="text-[#1b4332]">Market</span>
              </span>
            </Link>

            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Bridging the gap between conscientious Kenyan farmers and households, restaurants, and agribusinesses. Fresh produce, ethical livestock, and pure harvests delivered straight to your door.
            </p>

            <div className="space-y-2 text-xs text-slate-600 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#1b4332] shrink-0" />
                <span>Valley View Office Park, City Park Dr, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#1b4332] shrink-0" />
                <span>+254 700 123 456 / +254 712 345 678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#1b4332] shrink-0" />
                <span>support@farmmarket.co.ke</span>
              </div>
            </div>
          </div>

          {/* Col 2: Marketplace */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Marketplace
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/marketplace?category=vegetables" className="hover:text-[#1b4332] transition-colors">
                  Fresh Vegetables
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=fruits" className="hover:text-[#1b4332] transition-colors">
                  Fruits & Berries
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=eggs" className="hover:text-[#1b4332] transition-colors">
                  Kienyeji Eggs
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=dairy" className="hover:text-[#1b4332] transition-colors">
                  Farm Dairy & Milk
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=cereals" className="hover:text-[#1b4332] transition-colors">
                  Cereals & Legumes
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-[#1b4332] transition-colors font-semibold">
                  Browse All Catalog →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Farmers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              For Farmers
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/register" className="hover:text-[#1b4332] transition-colors">
                  Sell Your Produce
                </Link>
              </li>
              <li>
                <Link to="/farmer/dashboard" className="hover:text-[#1b4332] transition-colors">
                  Farmer Portal
                </Link>
              </li>
              <li>
                <Link to="/farmers" className="hover:text-[#1b4332] transition-colors">
                  Featured Producers
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-[#1b4332] transition-colors">
                  Quality Standards
                </Link>
              </li>
              <li>
                <a href="#cold-chain" className="hover:text-[#1b4332] transition-colors">
                  Cold Chain Logistics
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Help & Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/how-it-works" className="hover:text-[#1b4332] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <a href="#help" className="hover:text-[#1b4332] transition-colors">
                  Delivery Areas & Rates
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#1b4332] transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-[#1b4332] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-[#1b4332] transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-8 border-t border-[#ede8de] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Farm Market Kenya Ltd. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-slate-600">Supported Payments:</span>
            <span className="font-bold text-[#2d6a4f] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              M-PESA
            </span>
            <span className="font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
              Visa / Card
            </span>
            <span className="font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
              Cash on Delivery
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
