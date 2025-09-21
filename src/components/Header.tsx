import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Menu, User, ShoppingCart, Search, LogOut, Settings, Moon, Sun, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useApp } from "../contexts/AppContext";
import { CartModal } from "./CartModal";
import { AuthModal } from "./AuthModal";
import { LanguageCurrencySelector } from "./LanguageCurrencySelector";
import { services } from "../utils/servicesData";

interface HeaderProps {
  onMenuToggle: () => void;
  onCartClick?: () => void;
  onCheckout?: () => void;
  onDashboard?: () => void;
}

export function Header({ onMenuToggle, onCartClick, onCheckout, onDashboard }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const { t } = useLanguage();
  const { navigateTo, isDarkMode, toggleDarkMode } = useApp();
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Debounced search functionality
  useEffect(() => {
    if (searchQuery.length >= 3) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      
      debounceRef.current = setTimeout(() => {
        const results = services.filter(service =>
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.category.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5);
        
        setSearchResults(results);
        setShowResults(true);
      }, 300);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('search', { query: searchQuery.trim() });
      setIsSearchOpen(false);
      setShowResults(false);
      setSearchQuery('');
    }
  };

  const handleSearchResultClick = (serviceId: string) => {
    navigateTo('service', { serviceId });
    setIsSearchOpen(false);
    setShowResults(false);
    setSearchQuery('');
  };

  const handleNavClick = (page: string, category?: string) => {
    if (page === 'home') {
      navigateTo('home');
    } else if (page === 'catalog') {
      navigateTo('catalog');
    } else if (category) {
      navigateTo('category', { category: category as any });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and brand */}
        <div className="flex items-center gap-6">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-accent rounded-lg"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">K</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">Kamchatka</h1>
              <p className="text-xs text-muted-foreground -mt-1">Wild Adventures</p>
            </div>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          <button 
            onClick={() => handleNavClick('home')} 
            className="hover:text-primary transition-colors"
          >
            {t('nav.home')}
          </button>
          <button 
            onClick={() => handleNavClick('category', 'hunting')} 
            className="hover:text-primary transition-colors"
          >
            {t('categories.hunting')}
          </button>
          <button 
            onClick={() => handleNavClick('category', 'fishing')} 
            className="hover:text-primary transition-colors"
          >
            {t('categories.fishing')}
          </button>
          <button 
            onClick={() => handleNavClick('category', 'recreation')} 
            className="hover:text-primary transition-colors"
          >
            {t('categories.recreation')}
          </button>
          <button 
            onClick={() => handleNavClick('category', 'tours')} 
            className="hover:text-primary transition-colors"
          >
            {t('categories.tours')}
          </button>
          <button 
            onClick={() => handleNavClick('catalog')} 
            className="hover:text-primary transition-colors"
          >
            {t('nav.catalog')}
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Language & Currency Selector */}
          <LanguageCurrencySelector />
          
          {/* Dark Mode Toggle */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={toggleDarkMode}
            className="p-2"
            title={isDarkMode ? t('common.lightMode') : t('common.darkMode')}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          {/* Search */}
          <div className="relative" ref={searchRef}>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Cart */}
          <CartModal 
            onCheckout={onCheckout}
            onAuthRequired={() => setShowAuthModal(true)}
          >
            <Button variant="ghost" size="sm" className="relative p-2">
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {itemCount > 99 ? '99+' : itemCount}
                </Badge>
              )}
            </Button>
          </CartModal>

          {/* User */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-sm">
                Hello, {user.user_metadata?.name || user.email?.split('@')[0]}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onDashboard}
                className="p-2"
                title="Dashboard"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={signOut}
                className="p-2"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2"
              onClick={() => setShowAuthModal(true)}
            >
              <User className="h-4 w-4" />
            </Button>
          )}

          <Button 
            className="hidden md:flex"
            onClick={() => !user ? setShowAuthModal(true) : onCartClick?.()}
          >
            {user ? 'View Cart' : t('common.book')}
          </Button>
        </div>
      </div>

      {/* Search bar */}
      {isSearchOpen && (
        <div className="border-t p-4 bg-background">
          <div className="max-w-md mx-auto relative">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  className="w-full px-4 py-2 pr-10 border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                    setShowResults(false);
                  }}
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-1 h-6 w-6"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </form>
            
            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                {searchResults.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleSearchResultClick(service.id)}
                    className="w-full px-4 py-3 text-left hover:bg-accent transition-colors border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{service.title}</h4>
                        <p className="text-sm text-muted-foreground truncate">
                          {service.location} • {t(`categories.${service.category}`)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
                {searchQuery.length >= 3 && (
                  <button
                    onClick={() => {
                      navigateTo('search', { query: searchQuery });
                      setIsSearchOpen(false);
                      setShowResults(false);
                      setSearchQuery('');
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-accent transition-colors text-primary font-medium"
                  >
                    {t('search.viewAllResults')} "{searchQuery}"
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </header>
  );
}