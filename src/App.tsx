import { useState } from "react";
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
import { AppProvider, useApp } from "./contexts/AppContext";
import { Toaster } from "./components/ui/sonner";

// Page Components
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
  const { state, navigateTo } = useApp();

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleCartClick = () => {
    setShowCheckout(true);
  };

  const handleDashboard = () => {
    navigateTo('dashboard');
  };

  const renderPage = () => {
    switch (state.currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'catalog':
        return <CatalogPage />;
      case 'category':
        return <CategoryPage category={state.selectedCategory} />;
      case 'service':
        return <ServicePage serviceId={state.selectedServiceId} />;
      case 'search':
        return <SearchPage query={state.searchQuery} />;
      case 'allServices':
        return <AllServicesPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'ourStory':
        return <StaticPage pageType="ourStory" />;
      case 'team':
        return <StaticPage pageType="team" />;
      case 'careers':
        return <StaticPage pageType="careers" />;
      case 'press':
        return <StaticPage pageType="press" />;
      case 'help':
        return <StaticPage pageType="help" />;
      case 'faq':
        return <StaticPage pageType="faq" />;
      case 'safety':
        return <StaticPage pageType="safety" />;
      case 'terms':
        return <StaticPage pageType="terms" />;
      case 'privacy':
        return <StaticPage pageType="privacy" />;
      case 'cookies':
        return <StaticPage pageType="cookies" />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onMenuToggle={handleMenuToggle}
        onCartClick={handleCartClick}
        onCheckout={handleCheckout}
        onDashboard={handleDashboard}
      />

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
      />

      {/* Main Content */}
      <main>
        {renderPage()}
      </main>

      {/* Footer - only show on non-dashboard pages */}
      {state.currentPage !== 'dashboard' && <Footer />}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
      />

      {/* Toast Notifications */}
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