import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
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
  SlidersHorizontal
} from "lucide-react";
import { useApp } from "../../contexts/AppContext";
import { ImageCarousel } from "../ImageCarousel";
import { ShareButton } from "../ShareButton";
import { ServiceDetailModal } from "../ServiceDetailModal";
import { AuthModal } from "../AuthModal";
import { services, categories } from "../../utils/servicesData";

// Import icons for categories
const iconMap = {
  Mountain,
  Target,
  Fish,
  TreePine
};

export function AllServicesPage() {
  const { t } = useLanguage();
  const { goBack, navigateTo } = useApp();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [priceRange, setPriceRange] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [selectedService, setSelectedService] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Enhanced filtering
  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === "all" || service.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesPrice = priceRange === "all" ||
      (priceRange === "budget" && service.price < 1000) ||
      (priceRange === "mid" && service.price >= 1000 && service.price < 2500) ||
      (priceRange === "luxury" && service.price >= 2500);
    
    const matchesDuration = durationFilter === "all" ||
      (durationFilter === "short" && parseInt(service.duration) <= 3) ||
      (durationFilter === "medium" && parseInt(service.duration) > 3 && parseInt(service.duration) <= 7) ||
      (durationFilter === "long" && parseInt(service.duration) > 7);
    
    const matchesAvailability = availabilityFilter === "all" ||
      (availabilityFilter === "available" && service.available) ||
      (availabilityFilter === "unavailable" && !service.available);
    
    return matchesCategory && matchesSearch && matchesPrice && matchesDuration && matchesAvailability;
  });

  // Enhanced sorting
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
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServices = sortedServices.slice(startIndex, startIndex + itemsPerPage);

  const handleServiceClick = (service) => {
    navigateTo('service', { serviceId: service.id });
  };

  const handleBookNow = (service, e) => {
    e.stopPropagation();
    
    const serviceWithDetails = {
      ...service,
      gallery: service.images || [service.images?.[0]]
    };
    
    setSelectedService(serviceWithDetails);
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
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={goBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              All Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our complete collection of wilderness adventures, luxury retreats, and guided expeditions in Kamchatka.
            </p>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search adventures, locations, suppliers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 flex-wrap">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviewed</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="title">Alphabetical</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="px-3"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="px-3"
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
                Filters
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className={`grid lg:grid-cols-5 gap-4 ${showFilters || 'hidden lg:grid'}`}>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Budget (&lt; $1,000)</SelectItem>
                <SelectItem value="mid">Mid-range ($1,000-$2,500)</SelectItem>
                <SelectItem value="luxury">Luxury ($2,500+)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={durationFilter} onValueChange={setDurationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Duration</SelectItem>
                <SelectItem value="short">Short (1-3 days)</SelectItem>
                <SelectItem value="medium">Medium (4-7 days)</SelectItem>
                <SelectItem value="long">Long (8+ days)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="available">Available Only</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>

            <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Per Page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12 per page</SelectItem>
                <SelectItem value="24">24 per page</SelectItem>
                <SelectItem value="48">48 per page</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Categories Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
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
                  <span className="hidden sm:inline">{category.label}</span>
                  <Badge variant="secondary" className="hidden lg:inline-flex text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-8">
            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedServices.length)} of {sortedServices.length} services
              </div>
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
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
              <div className={viewMode === 'grid' 
                ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "space-y-4"
              }>
                {paginatedServices.map((service) => (
                  <Card 
                    key={service.id} 
                    className={`group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${
                      viewMode === 'list' ? 'flex flex-row' : ''
                    }`}
                    onClick={() => handleServiceClick(service)}
                  >
                    {viewMode === 'grid' ? (
                      <>
                        {/* Grid View */}
                        <ImageCarousel
                          images={service.images}
                          title={service.title}
                          tags={service.featured ? ['Featured'] : []}
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
                                ? 'bg-red-500/80 hover:bg-red-600/80 text-white' 
                                : 'bg-white/20 hover:bg-white/30 text-white'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(service.id);
                            }}
                          >
                            <Heart className={`h-4 w-4 ${isFavorite(service.id) ? 'fill-current' : ''}`} />
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
                          <div className="font-bold text-lg">
                            ${service.price}
                          </div>
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
                              <span>{service.rating} ({service.reviews})</span>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {service.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
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
                            tags={service.featured ? ['Featured'] : []}
                            className="w-48 h-32"
                            showThumbnails={false}
                          />
                        </div>
                        <CardContent className="flex-1 p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-bold text-lg mb-1">{service.title}</h3>
                              <p className="text-sm text-muted-foreground">by {service.supplier}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                className={isFavorite(service.id) ? "text-red-500" : ""}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(service.id);
                                }}
                              >
                                <Heart className={`h-4 w-4 ${isFavorite(service.id) ? 'fill-current' : ''}`} />
                              </Button>
                              <ShareButton
                                serviceId={service.id}
                                title={service.title}
                                variant="ghost"
                                size="sm"
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
                              <span>{service.rating} ({service.reviews})</span>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {service.description}
                          </p>

                          <div className="flex justify-between items-center">
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold">${service.price}</span>
                              <span className="text-sm text-muted-foreground">per person</span>
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
          </TabsContent>
        </Tabs>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        onAuthRequired={handleAuthRequired}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}