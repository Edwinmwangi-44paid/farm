import * as React from "react"
import { Link } from "react-router-dom"
import {
  PlusCircle,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react"
import { useProducts, useDeleteProduct } from "@/hooks/useProducts"
import { productService } from "@/services/api/products"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { formatCurrency } from "@/lib/utils"
import { toast } from "@/components/ui/toast"
import { Product } from "@/types"

export function FarmerProductsPage() {
  const { data, isLoading, refetch } = useProducts({ limit: 50 })
  const deleteMutation = useDeleteProduct()

  const [search, setSearch] = React.useState("")
  const [productToDelete, setProductToDelete] = React.useState<Product | null>(null)

  const products = (data?.items || []).filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleToggleStatus = async (product: Product) => {
    try {
      await productService.toggleAvailability(product.id)
      toast.info(
        "Status Changed",
        `${product.name} is now ${!product.isAvailable ? "Active" : "Disabled"}`
      )
      refetch()
    } catch {
      toast.error("Error", "Could not toggle status.")
    }
  }

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return
    try {
      await deleteMutation.mutateAsync(productToDelete.id)
      toast.success("Product Deleted", `${productToDelete.name} has been removed.`)
      setProductToDelete(null)
      refetch()
    } catch {
      toast.error("Error", "Failed to delete product.")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display">
            Manage Farm Products
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            View, edit, price, and toggle inventory availability for your farm
          </p>
        </div>

        <Link to="/farmer/products/new">
          <Button variant="default" size="sm" className="gap-2 font-bold">
            <PlusCircle className="h-4 w-4" />
            <span>Add New Product</span>
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#ede8de] shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search your crop listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#ded7ca] bg-[#fbfaf8] px-3.5 py-2 pl-9 text-xs focus:ring-1 focus:ring-[#1b4332]"
          />
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
        </div>

        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          {products.length} products listed
        </span>
      </div>

      {/* Products Table */}
      <div className="rounded-3xl border border-[#ede8de] bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f4f1ea] border-b border-[#ede8de] text-slate-700 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price / Unit</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Loading produce listings...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No products found. Click "Add New Product" to list your first harvest!
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#fbfaf8] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="h-12 w-12 rounded-xl object-cover border border-slate-100 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block text-sm">
                            {p.name}
                          </span>
                          <span className="text-[11px] text-slate-400">{p.farmingMethod}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-slate-600">
                      {p.category.name}
                    </td>

                    <td className="p-4">
                      <span className="font-bold text-slate-900">
                        {formatCurrency(p.price)}
                      </span>
                      <span className="text-slate-400 block text-[11px]">/ {p.unit}</span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`font-bold ${
                          p.availableQuantity > 20
                            ? "text-emerald-700"
                            : p.availableQuantity > 0
                            ? "text-amber-600"
                            : "text-red-600"
                        }`}
                      >
                        {p.availableQuantity} {p.unit}s
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(p)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                          p.isAvailable
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                        title="Click to toggle listing availability"
                      >
                        {p.isAvailable ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3.5 w-3.5 text-slate-400" />
                            <span>Disabled</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/product/${p.slug}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          title="View Live Listing"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

                        <Link
                          to={`/farmer/products/edit/${p.id}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-[#1b4332]"
                          title="Edit Details"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>

                        <button
                          onClick={() => setProductToDelete(p)}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                          title="Delete Listing"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={Boolean(productToDelete)}
        onClose={() => setProductToDelete(null)}
        title="Confirm Deletion"
        description={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
      >
        <div className="pt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setProductToDelete(null)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteConfirm}
          >
            Delete Product
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
