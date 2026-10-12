import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { HomePage } from "../../pages/public/HomePage";
import Marketplace from "../../pages/public/Marketplace";
import Cart from "../../pages/public/Cart";
import ProductDetails from "../../pages/public/ProductDetails";
import FarmProfile from "../../pages/public/FarmProfile";
import Checkout from "../../pages/public/Checkout";
import OrderConfirmation from "../../pages/public/OrderConfirmation";
import Login from "../../pages/public/Login";
import Register from "../../pages/public/Register";
import ForgotPassword from "../../pages/public/ForgotPassword";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "marketplace",
        element: <Marketplace />,
      },
      {
        path: "product/:slug",
        element: <ProductDetails />,
      },
      {
        path: "farm/:id",
        element: <FarmProfile />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "order-confirmation",
        element: <OrderConfirmation />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        }
    ],
  }
]);

export { router };

export function AppRouter() {
  return <RouterProvider router={router} />;
}
