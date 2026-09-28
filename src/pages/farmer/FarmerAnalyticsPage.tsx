import { BarChart3, TrendingUp, Users, Star, ArrowUpRight } from "lucide-react"
import { useFarmerStats } from "@/hooks/useFarmers"
import { formatCurrency } from "@/lib/utils"

export function FarmerAnalyticsPage() {
  const { data: stats } = useFarmerStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-display">
          Farm Sales Analytics & Buyer Trends
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Insights on demand trends, highest grossing produce, and customer satisfaction
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-[#ede8de] shadow-sm space-y-2">
          <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider">
            Average Order Value
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            KES 1,918
          </div>
          <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" /> +8.4% vs last month
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#ede8de] shadow-sm space-y-2">
          <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider">
            Customer Retention
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            78.5%
          </div>
          <span className="text-xs text-slate-500">Repeat buyers from Nairobi households</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#ede8de] shadow-sm space-y-2">
          <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider">
            Overall Farm Score
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display flex items-center gap-2">
            <span>4.9</span>
            <Star className="h-6 w-6 text-amber-500 fill-amber-400" />
          </div>
          <span className="text-xs text-slate-500">Based on 142 verified orders</span>
        </div>
      </div>

      {/* Revenue Breakdown by Produce Category */}
      <div className="rounded-3xl border border-[#ede8de] bg-white p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Category Revenue Share</h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Fresh Greenhouse Vegetables</span>
              <span>48% (KES 117,800)</span>
            </div>
            <div className="h-2 w-full bg-[#f4f1ea] rounded-full overflow-hidden">
              <div className="h-full bg-[#1b4332] w-[48%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Pastured Poultry & Eggs</span>
              <span>28% (KES 68,700)</span>
            </div>
            <div className="h-2 w-full bg-[#f4f1ea] rounded-full overflow-hidden">
              <div className="h-full bg-[#2d6a4f] w-[28%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Fruits & Melons</span>
              <span>16% (KES 39,300)</span>
            </div>
            <div className="h-2 w-full bg-[#f4f1ea] rounded-full overflow-hidden">
              <div className="h-full bg-[#d97706] w-[16%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Aromatic Herbs</span>
              <span>8% (KES 19,800)</span>
            </div>
            <div className="h-2 w-full bg-[#f4f1ea] rounded-full overflow-hidden">
              <div className="h-full bg-[#52b788] w-[8%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
