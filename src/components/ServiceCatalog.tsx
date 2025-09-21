import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
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
  ChevronDown
} from "lucide-react";
import { ImageCarousel } from "./ImageCarousel";
import { ShareButton } from "./ShareButton";
import { ServiceDetailModal } from "./ServiceDetailModal";
import { AuthModal } from "./AuthModal";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useApp } from "../contexts/AppContext";
import { services, categories } from "../utils/servicesData";

// Import icons for categories
const iconMap = {
  Mountain,
  Target,
  Fish,
  TreePine
};

export function ServiceCatalog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { navigateTo } = useApp();

  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === "all" || service.category === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  const handleServiceClick = (service) => {
    // Navigate to the dedicated service page
    navigateTo('service', { serviceId: service.id });
  };

  const handleBookNow = (service, e) => {
    e.stopPropagation();
    
    // Add required fields for ServiceDetailModal
    const serviceWithDetails = {
      ...service,
      gallery: service.images || [service.images?.[0]]
    };
    
    setSelectedService(serviceWithDetails);
    setShowServiceModal(true);
  };

  const handleLoadMore = () => {
    navigateTo('allServices');
  };

  const handleAuthRequired = () => {
    setShowServiceModal(false);
    setShowAuthModal(true);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4">Explore Adventures</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Service Catalog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our complete range of wilderness adventures, from hunting expeditions 
            to luxury retreats.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
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

            {/* Sort and Filter */}
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviewed</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Categories Tabs */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
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

            {/* Services Grid */}
            <TabsContent value={activeCategory} className="mt-8">
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedServices.map((service) => (
                  <Card 
                    key={service.id} 
                    className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => handleServiceClick(service)}
                  >
                    {/* Image Carousel */}
                    <ImageCarousel
                      images={service.images}
                      title={service.title}
                      tags={service.featured ? ['Featured'] : []}
                      className="relative"
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
                  </Card>
                ))}
              </div>

              {/* No Results */}
              {sortedServices.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-muted-foreground mb-4">
                    No services found matching your criteria.
                  </div>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Load More */}
              {sortedServices.length > 0 && (
                <div className="text-center mt-8">
                  <Button variant="outline" size="lg" onClick={handleLoadMore}>
                    Load More Services
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
    </section>
  );
}