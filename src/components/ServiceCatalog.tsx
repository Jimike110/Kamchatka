import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Search,
  Star,
  MapPin,
  Clock,
  Users,
  Calendar,
  Heart,
  Target,
  Fish,
  TreePine,
  Mountain,
} from "lucide-react";
import { ImageCarousel } from "./ImageCarousel";
import { ShareButton } from "./ShareButton";
import { ServiceDetailModal } from "./ServiceDetailModal";
import { AuthModal } from "./AuthModal";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useCurrency } from "../contexts/CurrencyContext";
import { services, categories } from "../utils/servicesData";
import { useNavigate } from "react-router-dom";

const iconMap: { [key: string]: React.ElementType } = {
  Mountain,
  Target,
  Fish,
  TreePine,
};

interface ServiceCatalogProps {
  filterByCategory?: "hunting" | "fishing" | "recreation" | "tours";
  showFullCatalog?: boolean;
}

export function ServiceCatalog({
  filterByCategory,
  showFullCatalog = false,
}: ServiceCatalogProps) {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [activeCategory, setActiveCategory] = useState(
    filterByCategory || "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      activeCategory === "all" || service.category === activeCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  const servicesToShow = showFullCatalog
    ? sortedServices
    : sortedServices.slice(0, 6);

  const handleServiceClick = (service: any) => {
    navigate(`/service/${service.id}`);
  };

  const handleBookNow = (service: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const handleLoadMore = () => {
    navigate(`services`);
  };

  const handleAuthRequired = () => {
    setShowServiceModal(false);
    setShowAuthModal(true);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        {!showFullCatalog && (
          <div className="text-center mb-12">
            <Badge className="mb-4">{t("services.exploreAdventures")}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("catalog.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("services.subtitle")}
            </p>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t("search.placeholderShort")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={t("catalog.sortBy")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">
                    {t("catalog.highestRated")}
                  </SelectItem>
                  <SelectItem value="reviews">
                    {t("catalog.mostReviewed")}
                  </SelectItem>
                  <SelectItem value="price-low">
                    {t("catalog.priceLowHigh")}
                  </SelectItem>
                  <SelectItem value="price-high">
                    {t("catalog.priceHighLow")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Categories Tabs */}
          {!filterByCategory && (
            <Tabs
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-none lg:flex lg:h-auto lg:p-1">
                {categories.map((category) => {
                  const Icon = iconMap[category.icon] || Mountain;
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex items-center gap-2 lg:px-4 lg:py-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">
                        {t(`categories.${category.id}`)}
                      </span>
                      <Badge
                        variant="secondary"
                        className="hidden lg:inline-flex text-xs"
                      >
                        {category.count}
                      </Badge>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {servicesToShow.map((service) => (
            <Card
              key={service.id}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
              onClick={() => handleServiceClick(service)}
            >
              <div className="relative">
                <ImageCarousel
                  images={service.images}
                  title={service.title}
                  tags={service.featured ? [t("common.featured")] : []}
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                  <Button
                    size="sm"
                    variant="secondary"
                    className={`h-8 w-8 p-0 backdrop-blur-sm transition-colors bg-black/30 hover:bg-black/50 ${
                      isFavorite(service.id)
                        ? "text-red-500 hover:text-red-400"
                        : "text-white"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(service.id);
                    }}
                    title={
                      isFavorite(service.id)
                        ? t("favorites.remove")
                        : t("favorites.add")
                    }
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isFavorite(service.id) ? "fill-current" : ""
                      }`}
                    />
                  </Button>

                  <ShareButton
                    serviceId={service.id}
                    title={service.title}
                    variant="secondary"
                    size="sm"
                    className="h-8 w-8 p-0 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white"
                  />
                </div>
              </div>

              <CardContent className="p-4 flex flex-col flex-grow">
                <div className="mb-3">
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("common.by")} {service.supplier}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="truncate">{service.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span>{service.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span>
                      {service.rating} ({service.reviews})
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {service.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-auto pt-2">
                  <div className="text-lg font-bold">
                    {formatPrice(service.price)}
                  </div>
                  <Button
                    size="sm"
                    disabled={!service.available}
                    onClick={(e) => handleBookNow(service, e)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    {service.available
                      ? t("common.book")
                      : t("catalog.unavailable")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {servicesToShow.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              {t("catalog.noResults")}
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
            >
              {t("catalog.clearFilters")}
            </Button>
          </div>
        )}

        {!showFullCatalog && sortedServices.length > 6 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" onClick={handleLoadMore}>
              {t("services.viewAll")}
            </Button>
          </div>
        )}

        <ServiceDetailModal
          service={selectedService}
          isOpen={showServiceModal}
          onClose={() => setShowServiceModal(false)}
          onAuthRequired={handleAuthRequired}
        />

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    </section>
  );
}
