import * as React from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Upload, Check, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { useProduct, useCreateProduct, useUpdateProduct, useCategories } from "@/hooks/useProducts"
import { toast } from "@/components/ui/toast"
import { FarmingMethod } from "@/types"

// Zod Schema Validation
const productSchema = z.object({
  name: z.string().min(3, "Produce name must be at least 3 characters"),
  categorySlug: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Please provide a detailed description (at least 10 chars)"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  unit: z.string().min(1, "Unit is required (e.g. kg, crate, bundle)"),
  availableQuantity: z.coerce.number().min(0, "Stock cannot be negative"),
  minOrderQuantity: z.coerce.number().min(1, "Minimum order must be at least 1"),
  location: z.string().min(2, "Location is required"),
  farmingMethod: z.enum(["Organic", "Hydroponic", "Conventional", "Greenhouse", "Permaculture"]),
  harvestDate: z.string().min(1, "Harvest date is required"),
  shelfLife: z.string().min(2, "Shelf life is required"),
  storageTip: z.string().min(5, "Storage instructions are required"),
  imageUrl: z.string().url("Please enter a valid image URL").or(z.literal("")),
})

type ProductFormData = z.infer<typeof productSchema>

export function FarmerProductFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const { data: categories } = useCategories()
  const { data: existingProduct, isLoading: isFetching } = useProduct(id || "")
  const createMutation = useCreateProduct()
  const updateMutation = useUpdateProduct()

  const [previewImage, setPreviewImage] = React.useState<string>(
    "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
  )

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      categorySlug: "vegetables",
      description: "",
      price: 150,
      unit: "kg",
      availableQuantity: 100,
      minOrderQuantity: 1,
      location: "Kiambu, Kenya",
      farmingMethod: "Greenhouse",
      harvestDate: new Date().toISOString().split("T")[0],
      shelfLife: "7-10 days",
      storageTip: "Store in cool dry conditions away from sunlight",
      imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    },
  })

  const watchedImageUrl = watch("imageUrl")

  // Pre-fill if editing
  React.useEffect(() => {
    if (existingProduct) {
      setValue("name", existingProduct.name)
      setValue("categorySlug", existingProduct.category.slug)
      setValue("description", existingProduct.description)
      setValue("price", existingProduct.price)
      setValue("unit", existingProduct.unit)
      setValue("availableQuantity", existingProduct.availableQuantity)
      setValue("minOrderQuantity", existingProduct.minOrderQuantity || 1)
      setValue("location", existingProduct.farmer.location)
      setValue("farmingMethod", existingProduct.farmingMethod)
      setValue("harvestDate", existingProduct.harvestDate)
      setValue("shelfLife", existingProduct.shelfLife)
      setValue("storageTip", existingProduct.storageTip)
      setValue("imageUrl", existingProduct.images[0] || "")
      setPreviewImage(existingProduct.images[0] || "")
    }
  }, [existingProduct, setValue])

  const onSubmit = async (data: ProductFormData) => {
    try {
      const selectedCategory =
        categories?.find((c) => c.slug === data.categorySlug) || categories?.[0]

      const payload = {
        name: data.name,
        category: selectedCategory,
        description: data.description,
        price: data.price,
        unit: data.unit,
        availableQuantity: data.availableQuantity,
        minOrderQuantity: data.minOrderQuantity,
        farmingMethod: data.farmingMethod as FarmingMethod,
        harvestDate: data.harvestDate,
        shelfLife: data.shelfLife,
        storageTip: data.storageTip,
        images: [data.imageUrl || previewImage],
        deliveryOptions: ["Direct Farm Dispatch", "Express Courier"],
      }

      if (isEditing && id) {
        await updateMutation.mutateAsync({ id, data: payload })
        toast.success("Listing Updated", `${data.name} changes have been saved.`)
      } else {
        await createMutation.mutateAsync(payload)
        toast.success("Crop Listed!", `${data.name} is now available on the marketplace.`)
      }

      navigate("/farmer/products")
    } catch {
      toast.error("Save Error", "Could not save the product. Please check fields.")
    }
  }

  if (isEditing && isFetching) {
    return <div className="p-8 text-center text-slate-500">Loading product details...</div>
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link
          to="/farmer/products"
          className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display">
            {isEditing ? "Edit Product Listing" : "Add New Farm Product"}
          </h1>
          <p className="text-xs text-slate-500">
            Provide harvest specs, pricing, and high-resolution produce photography
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-3xl border border-[#ede8de] bg-white p-6 sm:p-8 shadow-sm space-y-6"
      >
        {/* Name & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Produce Name *
            </label>
            <Input
              {...register("name")}
              error={errors.name?.message}
              placeholder="e.g. Fresh Greenhouse Tomatoes"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Category *
            </label>
            <Select {...register("categorySlug")} error={errors.categorySlug?.message}>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Produce Description *
          </label>
          <textarea
            {...register("description")}
            rows={3}
            placeholder="Describe harvest quality, taste, freshness, and culinary uses..."
            className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:ring-2 focus:ring-[#1b4332] focus:outline-none"
          />
          {errors.description && (
            <p className="text-xs text-red-600 mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Price, Unit, Stock, Min Order */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Price (KES) *
            </label>
            <Input
              type="number"
              {...register("price")}
              error={errors.price?.message}
              placeholder="180"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Standard Unit *
            </label>
            <Input
              {...register("unit")}
              error={errors.unit?.message}
              placeholder="kg, crate, bundle"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Stock Available *
            </label>
            <Input
              type="number"
              {...register("availableQuantity")}
              error={errors.availableQuantity?.message}
              placeholder="450"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Min Order Qty
            </label>
            <Input
              type="number"
              {...register("minOrderQuantity")}
              error={errors.minOrderQuantity?.message}
              placeholder="1"
            />
          </div>
        </div>

        {/* Farming Method, Location, Harvest Date */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Farming Method *
            </label>
            <Select {...register("farmingMethod")}>
              <option value="Greenhouse">Greenhouse</option>
              <option value="Organic">Organic</option>
              <option value="Hydroponic">Hydroponic</option>
              <option value="Permaculture">Permaculture</option>
              <option value="Conventional">Conventional</option>
            </Select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Origin Location *
            </label>
            <Input
              {...register("location")}
              error={errors.location?.message}
              placeholder="Kiambu, Kenya"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Harvest Date *
            </label>
            <Input
              type="date"
              {...register("harvestDate")}
              error={errors.harvestDate?.message}
            />
          </div>
        </div>

        {/* Shelf Life & Storage Tip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Estimated Shelf Life
            </label>
            <Input
              {...register("shelfLife")}
              error={errors.shelfLife?.message}
              placeholder="e.g. 7-10 days in cool place"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Storage Tip
            </label>
            <Input
              {...register("storageTip")}
              error={errors.storageTip?.message}
              placeholder="e.g. Store in dark cool pantry"
            />
          </div>
        </div>

        {/* Image URL & Live Preview */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-semibold text-slate-700 block">
            Produce Image URL
          </label>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                {...register("imageUrl")}
                error={errors.imageUrl?.message}
                placeholder="https://images.unsplash.com/..."
              />
            </div>
            {watchedImageUrl && (
              <div className="h-12 w-12 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                <img
                  src={watchedImageUrl}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
          <Link to="/farmer/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            variant="default"
            isLoading={isSubmitting}
            className="font-bold bg-[#1b4332] hover:bg-[#143427]"
          >
            {isEditing ? "Save Listing Changes" : "Publish Farm Listing"}
          </Button>
        </div>
      </form>
    </div>
  )
}
