import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";
import { CheckoutModal } from "./components/CheckoutModal";
import { Dashboard } from "./components/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { AppProvider } from "./contexts/AppContext";
import { Toaster } from "./components/ui/sonner";

import { HomePage } from "./components/pages/HomePage";
import { CatalogPage } from "./components/pages/CatalogPage";
import { CategoryPage } from "./components/pages/CategoryPage";
import { ServicePage } from "./components/pages/ServicePage";
import { SearchPage } from "./components/pages/SearchPage";
import { AllServicesPage } from "./components/pages/AllServicesPage";
import { AboutPage } from "./components/pages/AboutPage";
import { ContactPage } from "./components/pages/ContactPage";
import { StaticPage } from "./components/pages/StaticPage";

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const location = useLocation();

  const handleMenuToggle = () => setIsSidebarOpen(!isSidebarOpen);
  const handleSidebarClose = () => setIsSidebarOpen(false);
  const handleCheckout = () => setShowCheckout(true);

  const isDashboardPage = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onMenuToggle={handleMenuToggle} onCheckout={handleCheckout} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/services" element={<AllServicesPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/service/:serviceId" element={<ServicePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Static Footer Pages */}
          <Route
            path="/our-story"
            element={<StaticPage pageType="ourStory" />}
          />
          <Route path="/team" element={<StaticPage pageType="team" />} />
          <Route path="/careers" element={<StaticPage pageType="careers" />} />
          <Route path="/press" element={<StaticPage pageType="press" />} />
          <Route path="/help" element={<StaticPage pageType="help" />} />
          <Route path="/faq" element={<StaticPage pageType="faq" />} />
          <Route path="/safety" element={<StaticPage pageType="safety" />} />
          <Route path="/terms" element={<StaticPage pageType="terms" />} />
          <Route path="/privacy" element={<StaticPage pageType="privacy" />} />
          <Route path="/cookies" element={<StaticPage pageType="cookies" />} />
        </Routes>
      </main>

      {!isDashboardPage && <Footer />}

      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
      />

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <AppProvider>
          <AuthProvider>
            <FavoritesProvider>
              <CartProvider>
                <AppContent />
              </CartProvider>
            </FavoritesProvider>
          </AuthProvider>
        </AppProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}
