import { createBrowserRouter, Navigate } from "react-router-dom"
import { PublicLayout } from "@/app/layouts/PublicLayout"
import { CustomerDashboardLayout } from "@/app/layouts/CustomerDashboardLayout"
import { FarmerDashboardLayout } from "@/app/layouts/FarmerDashboardLayout"

// Public Pages
import { HomePage } from "@/pages/public/HomePage"
import { MarketplacePage } from "@/pages/public/MarketplacePage"
import { ProductDetailPage } from "@/pages/public/ProductDetailPage"
import { FarmerProfilePage } from "@/pages/public/FarmerProfilePage"
import { FarmersDirectoryPage } from "@/pages/public/FarmersDirectoryPage"
import { HowItWorksPage } from "@/pages/public/HowItWorksPage"
import { CartPage } from "@/pages/public/CartPage"
import { CheckoutPage } from "@/pages/public/CheckoutPage"
import { OrderConfirmationPage } from "@/pages/public/OrderConfirmationPage"

// Auth Pages
import { LoginPage } from "@/pages/auth/LoginPage"
import { RegisterPage } from "@/pages/auth/RegisterPage"
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage"
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage"

// Customer Dashboard Pages
import { CustomerDashboardPage } from "@/pages/customer/CustomerDashboardPage"
import { CustomerOrdersPage } from "@/pages/customer/CustomerOrdersPage"
import { CustomerFavoritesPage } from "@/pages/customer/CustomerFavoritesPage"
import { CustomerAddressesPage } from "@/pages/customer/CustomerAddressesPage"
import { CustomerProfilePage } from "@/pages/customer/CustomerProfilePage"
import { CustomerSettingsPage } from "@/pages/customer/CustomerSettingsPage"

// Farmer Dashboard Pages
import { FarmerDashboardPage } from "@/pages/farmer/FarmerDashboardPage"
import { FarmerProductsPage } from "@/pages/farmer/FarmerProductsPage"
import { FarmerProductFormPage } from "@/pages/farmer/FarmerProductFormPage"
import { FarmerOrdersPage } from "@/pages/farmer/FarmerOrdersPage"
import { FarmerInventoryPage } from "@/pages/farmer/FarmerInventoryPage"
import { FarmerAnalyticsPage } from "@/pages/farmer/FarmerAnalyticsPage"
import { FarmerProfileEditPage } from "@/pages/farmer/FarmerProfileEditPage"

export const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "marketplace", element: <MarketplacePage /> },
      { path: "product/:slug", element: <ProductDetailPage /> },
      { path: "farm/:slug", element: <FarmerProfilePage /> },
      { path: "farmers", element: <FarmersDirectoryPage /> },
      { path: "how-it-works", element: <HowItWorksPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "order-confirmation/:id", element: <OrderConfirmationPage /> },

      // Auth
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
    ],
  },

  // Customer Dashboard Routes
  {
    path: "/account",
    element: <CustomerDashboardLayout />,
    children: [
      { index: true, element: <CustomerDashboardPage /> },
      { path: "orders", element: <CustomerOrdersPage /> },
      { path: "favorites", element: <CustomerFavoritesPage /> },
      { path: "addresses", element: <CustomerAddressesPage /> },
      { path: "profile", element: <CustomerProfilePage /> },
      { path: "settings", element: <CustomerSettingsPage /> },
    ],
  },

  // Farmer Dashboard Routes
  {
    path: "/farmer",
    element: <FarmerDashboardLayout />,
    children: [
      { index: true, element: <Navigate to="/farmer/dashboard" replace /> },
      { path: "dashboard", element: <FarmerDashboardPage /> },
      { path: "products", element: <FarmerProductsPage /> },
      { path: "products/new", element: <FarmerProductFormPage /> },
      { path: "products/edit/:id", element: <FarmerProductFormPage /> },
      { path: "orders", element: <FarmerOrdersPage /> },
      { path: "inventory", element: <FarmerInventoryPage /> },
      { path: "analytics", element: <FarmerAnalyticsPage /> },
      { path: "profile", element: <FarmerProfileEditPage /> },
    ],
  },

  // 404 Fallback Catch-all
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
])
