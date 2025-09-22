import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
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
  Grid3X3,
  Search,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { LanguageCurrencySelector } from "./LanguageCurrencySelector";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { itemCount } = useCart();
  const { favorites } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  if (!isOpen) return null;

  const handleNavigation = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const mainNavigation = [
    {
      icon: Home,
      label: t("nav.home"),
      path: "/",
      action: () => handleNavigation("/"),
      isActive: location.pathname === "/",
    },
    {
      icon: Grid3X3,
      label: t("nav.catalog"),
      path: "/services",
      action: () => handleNavigation("services"),
      isActive: location.pathname.startsWith("/services"),
    },
    {
      icon: Target,
      label: t("categories.hunting"),
      path: "/category/hunting",
      action: () => handleNavigation("category/hunting"),
      isActive: location.pathname === "/category/hunting",
    },
    {
      icon: Fish,
      label: t("categories.fishing"),
      path: "/category/fishing",
      action: () => handleNavigation("category/fishing"),
      isActive: location.pathname === "/category/fishing",
    },
    {
      icon: TreePine,
      label: t("categories.recreation"),
      path: "/category/recreation",
      action: () => handleNavigation("category/recreation"),
      isActive: location.pathname === "/category/recreation",
    },
    {
      icon: Mountain,
      label: t("categories.tours"),
      path: "/category/tours",
      action: () => handleNavigation("category/tours"),
      isActive: location.pathname === "/category/tours",
    },
  ];

  const userActions = user
    ? [
        {
          icon: Calendar,
          label: t("dashboard.bookings"),
          action: () => handleNavigation("dashboard"),
        },
        {
          icon: Heart,
          label: t("dashboard.favorites"),
          action: () => handleNavigation("dashboard"),
          badge: favorites.length > 0 ? favorites.length.toString() : undefined,
        },
        {
          icon: ShoppingCart,
          label: t("common.cart"),
          action: () => {
            /* This will be handled by the CartModal in the Header */
          },
          badge: itemCount > 0 ? itemCount.toString() : undefined,
        },
        {
          icon: User,
          label: t("dashboard.profile"),
          action: () => handleNavigation("dashboard"),
        },
        {
          icon: Settings,
          label: t("dashboard.settings"),
          action: () => handleNavigation("dashboard"),
        },
      ]
    : [];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className="fixed left-0 top-0 h-full w-80 bg-background border-r z-50 transform transition-transform duration-300 lg:hidden data-[state=closed]:-translate-x-full"
        data-state={isOpen ? "open" : "closed"}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                K
              </span>
            </div>
            <div>
              <h2 className="font-bold">{t("common.brandName")}</h2>
              <p className="text-xs text-muted-foreground">
                {t("common.tagline")}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 h-full overflow-y-auto">
          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("search.placeholderShort")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>

          {/* Main Navigation */}
          <div className="mb-6">
            <h3 className="font-medium text-sm text-muted-foreground mb-3 uppercase tracking-wide">
              {t("common.explore")}
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
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
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
                {t("common.account")}
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

          {/* Language & Currency */}
          <div className="mb-6">
            <h3 className="font-medium text-sm text-muted-foreground mb-3 uppercase tracking-wide">
              {t("dashboard.settings")}
            </h3>
            <LanguageCurrencySelector />
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>© 2024 {t("common.brandName")}</p>
              <p>{t("footer.licensedOperator")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
