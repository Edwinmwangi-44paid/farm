import { Link } from "react-router-dom"
import {
  Sprout,
  Truck,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Clock,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#d97706]">
          Direct Agricultural Supply Chain
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
          Freshness Delivered From Farm to Table
        </h1>
        <p className="text-base text-slate-600 leading-relaxed font-normal">
          We built Farm Market to eliminate excessive middleman markups, reduce post-harvest food waste, and deliver nutritious vegetables, fruits, eggs, and dairy within hours of picking.
        </p>
      </div>

      {/* 4 Step Process Detailed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-[#ede8de] shadow-sm space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-[#1b4332] text-white flex items-center justify-center font-bold text-lg">
            01
          </div>
          <h3 className="text-lg font-bold text-slate-900">Explore & Order</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Browse authentic Kenyan harvest listings by location, farming method (organic, greenhouse, hydroponic), and real-time inventory.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#ede8de] shadow-sm space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-[#1b4332] text-white flex items-center justify-center font-bold text-lg">
            02
          </div>
          <h3 className="text-lg font-bold text-slate-900">Harvest On-Demand</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Unlike supermarket vegetables that sit in transit depots for weeks, our partner farmers only harvest what you actually order.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#ede8de] shadow-sm space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-[#1b4332] text-white flex items-center justify-center font-bold text-lg">
            03
          </div>
          <h3 className="text-lg font-bold text-slate-900">Rapid Cold-Chain Transit</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dispatched in shock-absorbent, temperature-preserving packaging directly to your doorstep in Nairobi, Kiambu, and regional centers.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#ede8de] shadow-sm space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-[#1b4332] text-white flex items-center justify-center font-bold text-lg">
            04
          </div>
          <h3 className="text-lg font-bold text-slate-900">Farmer Fair Payouts</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Growers receive up to 40% higher margins than conventional brokers, helping rural farm communities thrive.
          </p>
        </div>
      </div>

      {/* Quality Standards Section */}
      <div className="rounded-3xl bg-[#f4f1ea] p-8 sm:p-12 border border-[#ede8de] space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1b4332]">
            Our Strict Quality Checklist
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
            Why Our Produce Tastes Better
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Zero Artificial Ripening</h4>
              <p className="text-xs text-slate-600 mt-1">
                Mangoes, bananas, and tomatoes mature on the branch under natural sunlight.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Soil & Water Testing</h4>
              <p className="text-xs text-slate-600 mt-1">
                All partner greenhouses and irrigation sources meet strict safety limits.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Same-Day M-Pesa Settlement</h4>
              <p className="text-xs text-slate-600 mt-1">
                Instant transparency builds honest partnerships and long-term grower loyalty.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap gap-4">
          <Link to="/marketplace">
            <Button variant="default" size="lg" className="gap-2">
              <span>Start Shopping Today</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/register?role=farmer">
            <Button variant="secondary" size="lg">
              Apply as a Farmer Partner
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
