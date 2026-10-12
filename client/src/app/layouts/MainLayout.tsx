import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../../components/navigation/Header";
import { Footer } from "../../components/navigation/Footer";

export default function MainLayout() {
  const { pathname } = useLocation();
  const hideNavFooter = ["/login", "/register", "/forgot-password"].includes(pathname);
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      {hideNavFooter ? null : <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      {hideNavFooter ? null : <Footer />}
    </div>
  );
}
