import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  X, 
  Home, 
  Target, 
  Fish, 
  TreePine, 
  Mountain, 
  Users, 
  Calendar,
  Settings,
  User,
  ShoppingCart,
  Heart,
  Grid3X3
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { navigateTo, state } = useApp();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { itemCount } = useCart();
  const { favorites } = useFavorites();

  if (!isOpen) return null;

  const handleNavigation = (page: string, category?: string) => {
    if (page === 'home') {
      navigateTo('home');
    } else if (page === 'catalog') {
      navigateTo('catalog');
    } else if (page === 'dashboard') {
      navigateTo('dashboard');
    } else if (category) {
      navigateTo('category', { category: category as any });
    }
    onClose();
  };

  const mainNavigation = [
    { 
      icon: Home, 
      label: t('nav.home'), 
      action: () => handleNavigation('home'),
      isActive: state.currentPage === 'home'
    },
    { 
      icon: Target, 
      label: t('categories.hunting'), 
      action: () => handleNavigation('category', 'hunting'),
      isActive: state.currentPage === 'category' && state.selectedCategory === 'hunting'
    },
    { 
      icon: Fish, 
      label: t('categories.fishing'), 
      action: () => handleNavigation('category', 'fishing'),
      isActive: state.currentPage === 'category' && state.selectedCategory === 'fishing'
    },
    { 
      icon: TreePine, 
      label: t('categories.recreation'), 
      action: () => handleNavigation('category', 'recreation'),
      isActive: state.currentPage === 'category' && state.selectedCategory === 'recreation'
    },
    { 
      icon: Mountain, 
      label: t('categories.tours'), 
      action: () => handleNavigation('category', 'tours'),
      isActive: state.currentPage === 'category' && state.selectedCategory === 'tours'
    },
    { 
      icon: Grid3X3, 
      label: t('nav.catalog'), 
      action: () => handleNavigation('catalog'),
      isActive: state.currentPage === 'catalog' || state.currentPage === 'allServices'
    },
  ];

  const userActions = user ? [
    { 
      icon: Calendar, 
      label: t('dashboard.bookings'), 
      action: () => handleNavigation('dashboard')
    },
    { 
      icon: Heart, 
      label: t('dashboard.favorites'), 
      action: () => handleNavigation('dashboard'),
      badge: favorites.length > 0 ? favorites.length.toString() : undefined
    },
    { 
      icon: ShoppingCart, 
      label: t('common.cart'), 
      action: () => {},
      badge: itemCount > 0 ? itemCount.toString() : undefined
    },
    { 
      icon: User, 
      label: t('dashboard.profile'), 
      action: () => handleNavigation('dashboard')
    },
    { 
      icon: Settings, 
      label: t('dashboard.settings'), 
      action: () => handleNavigation('dashboard')
    },
  ] : [];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-background border-r z-50 transform transition-transform duration-300 lg:hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">K</span>
            </div>
            <div>
              <h2 className="font-bold">Kamchatka</h2>
              <p className="text-xs text-muted-foreground">Wild Adventures</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 h-full overflow-y-auto">
          {/* Main Navigation */}
          <div className="mb-6">
            <h3 className="font-medium text-sm text-muted-foreground mb-3 uppercase tracking-wide">
              Explore
            </h3>
            <nav className="space-y-1">
              {mainNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left ${
                      item.isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-accent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge 
                        variant={item.isActive ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <Separator className="my-6" />

          {/* User Actions */}
          {user && (
            <div className="mb-6">
              <h3 className="font-medium text-sm text-muted-foreground mb-3 uppercase tracking-wide">
                {t('common.account')}
              </h3>
              <nav className="space-y-1">
                {userActions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="outline" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          )}

          <Separator className="my-6" />

          {/* Quick Actions */}
          <div className="space-y-3">
            <Button 
              className="w-full justify-start" 
              size="sm"
              onClick={() => handleNavigation('catalog')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              {t('common.bookAdventure')}
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              size="sm"
              onClick={() => handleNavigation('about')}
            >
              <Mountain className="h-4 w-4 mr-2" />
              {t('common.aboutUs')}
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>© 2024 Kamchatka Adventures</p>
              <p>Licensed Tourism Operator</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}