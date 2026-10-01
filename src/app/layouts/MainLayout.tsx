import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../../components/navigation/Navbar";
import { Footer } from "../../components/navigation/Footer";

export default function MainLayout() {
  const { pathname } = useLocation();
  const hideNavFooter = ["/login", "/register", "/forgot-password"].includes(pathname);
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      {hideNavFooter ? null : <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {hideNavFooter ? null : <Footer />}
    </div>
  );
}
