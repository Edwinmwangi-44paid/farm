import { Outlet } from "react-router-dom"
import { Header } from "@/components/navigation/Header"
import { Footer } from "@/components/navigation/Footer"
import { ToastContainer } from "@/components/ui/toast"

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbfaf8] text-slate-900 selection:bg-[#d8f3dc] selection:text-[#1b4332]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  )
}
