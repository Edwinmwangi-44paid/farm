import * as React from "react"
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react"
import { create } from "zustand"
import { cn } from "@/lib/utils"

export type ToastType = "success" | "error" | "info"

export interface ToastMessage {
  id: string
  title: string
  description?: string
  type: ToastType
}

interface ToastStore {
  toasts: ToastMessage[]
  addToast: (toast: Omit<ToastMessage, "id">) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9)
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }))
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
    }, 4000)
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
  },
}))

export const toast = {
  success: (title: string, description?: string) =>
    useToastStore.getState().addToast({ title, description, type: "success" }),
  error: (title: string, description?: string) =>
    useToastStore.getState().addToast({ title, description, type: "error" }),
  info: (title: string, description?: string) =>
    useToastStore.getState().addToast({ title, description, type: "info" }),
}

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "pointer-events-auto flex items-start gap-3 rounded-xl p-4 shadow-lg border backdrop-blur-md transition-all animate-slide-down",
            t.type === "success" && "bg-emerald-900/95 text-white border-emerald-700",
            t.type === "error" && "bg-red-900/95 text-white border-red-700",
            t.type === "info" && "bg-[#1b4332]/95 text-white border-[#2d6a4f]"
          )}
        >
          {t.type === "success" && <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />}
          {t.type === "error" && <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />}
          {t.type === "info" && <Info className="h-5 w-5 text-amber-300 shrink-0 mt-0.5" />}

          <div className="flex-1">
            <h4 className="text-sm font-semibold leading-tight">{t.title}</h4>
            {t.description && <p className="mt-1 text-xs opacity-90">{t.description}</p>}
          </div>

          <button
            onClick={() => removeToast(t.id)}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
