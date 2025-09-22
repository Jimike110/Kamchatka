import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import {
  ArrowLeft,
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
  ChevronDown,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { ImageCarousel } from "../ImageCarousel";
import { ShareButton } from "../ShareButton";
import { ServiceDetailModal } from "../ServiceDetailModal";
import { AuthModal } from "../AuthModal";
import { services, categories } from "../../utils/servicesData";
import { useCurrency } from "../../contexts/CurrencyContext";
import { useNavigate } from "react-router-dom";

const iconMap: { [key: string]: React.ElementType } = {
  Mountain,
  Target,
  Fish,
  TreePine,
};

export function AllServicesPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [priceRange, setPriceRange] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedService, setSelectedService] = useState<any>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      activeCategory === "all" || service.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "budget" && service.price < 1000) ||
      (priceRange === "mid" && service.price >= 1000 && service.price < 2500) ||
      (priceRange === "luxury" && service.price >= 2500);

    const durationDays = parseInt(service.duration);
    const matchesDuration =
      durationFilter === "all" ||
      (durationFilter === "short" && durationDays <= 3) ||
      (durationFilter === "medium" && durationDays > 3 && durationDays <= 7) ||
      (durationFilter === "long" && durationDays > 7);

    const matchesAvailability =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && service.available) ||
      (availabilityFilter === "unavailable" && !service.available);

    return (
      matchesCategory &&
      matchesSearch &&
      matchesPrice &&
      matchesDuration &&
      matchesAvailability
    );
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
      case "title":
        return a.title.localeCompare(b.title);
      case "duration":
        return parseInt(a.duration) - parseInt(b.duration);
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServices = sortedServices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleServiceClick = (service: any) => {
    navigate(`/service/${service.id}/`);
  };

  const handleBookNow = (service: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const handleAuthRequired = () => {
    setShowServiceModal(false);
    setShowAuthModal(true);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setPriceRange("all");
    setDurationFilter("all");
    setAvailabilityFilter("all");
    setSortBy("rating");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("common.back")}
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {t("services.allServicesTitle")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("services.allServicesSubtitle")}
            </p>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t("search.placeholderShort")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
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
                  <SelectItem value="title">
                    {t("catalog.alphabetical")}
                  </SelectItem>
                  <SelectItem value="duration">
                    {t("catalog.duration")}
                  </SelectItem>
                  <SelectItem value="newest">
                    {t("catalog.newestFirst")}
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="px-3"
                  title={t("common.gridView")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="px-3"
                  title={t("common.listView")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {t("common.filters")}
                <ChevronDown
                  className={`h-4 w-4 ml-2 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </div>
          </div>

          <div
            className={`grid lg:grid-cols-5 gap-4 ${
              showFilters ? "grid" : "hidden lg:grid"
            }`}
          >
            {/* Filters implementation here */}
            <Button
              variant="outline"
              onClick={clearFilters}
              className="lg:col-start-5"
            >
              <X className="h-4 w-4 mr-2" /> {t("catalog.clearFilters")}
            </Button>
          </div>
        </div>

        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="mb-8"
        >
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:w-auto lg:grid-cols-none lg:flex lg:h-auto lg:p-1">
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
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        <div className="mb-6 text-sm text-muted-foreground">
          {t("search.showingResults", {
            start: startIndex + 1,
            end: Math.min(startIndex + itemsPerPage, sortedServices.length),
            total: sortedServices.length,
          })}
        </div>

        {/* Services Grid/List */}
        {paginatedServices.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              No services found matching your criteria.
            </div>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {paginatedServices.map((service) => (
              <Card
                key={service.id}
                className={`group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  viewMode === "list" ? "flex flex-row" : ""
                }`}
                onClick={() => handleServiceClick(service)}
              >
                {viewMode === "grid" ? (
                  <>
                    {/* Grid View */}
                    <ImageCarousel
                      images={service.images}
                      title={service.title}
                      tags={service.featured ? ["Featured"] : []}
                      className="relative"
                      showThumbnails={false}
                    />

                    {/* Action Buttons Overlay */}
                    <div className="absolute top-3 right-3 flex gap-2 z-10">
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`h-8 w-8 p-0 backdrop-blur-sm transition-colors ${
                          isFavorite(service.id)
                            ? "bg-red-500/80 hover:bg-red-600/80 text-white"
                            : "bg-white/20 hover:bg-white/30 text-white"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(service.id);
                        }}
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
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
                      />
                    </div>

                    {/* Price Badge */}
                    <div className="absolute bottom-3 right-3 text-white text-right bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                      {service.originalPrice && (
                        <div className="text-sm line-through opacity-70">
                          ${service.originalPrice}
                        </div>
                      )}
                      <div className="font-bold text-lg">${service.price}</div>
                    </div>

                    {/* Status badges */}
                    {!service.available && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="destructive">Unavailable</Badge>
                      </div>
                    )}

                    <CardContent className="p-4">
                      <div className="mb-3">
                        <h3 className="font-bold text-lg mb-1 line-clamp-1">
                          {service.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          by {service.supplier}
                        </p>
                      </div>

                      {/* Service Details */}
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

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {service.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {service.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{service.tags.length - 2}
                          </Badge>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          disabled={!service.available}
                          onClick={(e) => handleBookNow(service, e)}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          {service.available ? "Book Now" : "Unavailable"}
                        </Button>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <>
                    {/* List View */}
                    <div className="flex-shrink-0">
                      <ImageCarousel
                        images={service.images}
                        title={service.title}
                        tags={service.featured ? ["Featured"] : []}
                        className="w-48 h-32"
                        showThumbnails={false}
                      />
                    </div>
                    <CardContent className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg mb-1">
                            {service.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            by {service.supplier}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className={
                              isFavorite(service.id) ? "text-red-500" : ""
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(service.id);
                            }}
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
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{service.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{service.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span>
                            {service.rating} ({service.reviews})
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {service.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">
                            ${service.price}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            per person
                          </span>
                        </div>
                        <Button
                          disabled={!service.available}
                          onClick={(e) => handleBookNow(service, e)}
                        >
                          {service.available ? "Book Now" : "Unavailable"}
                        </Button>
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>
            ))}
          </div>
        )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                
                {totalPages > 5 && (
                  <>
                    <span className="text-muted-foreground">...</span>
                    <Button
                      variant={currentPage === totalPages ? "default" : "outline"}
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
      </div>

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
  );
}
