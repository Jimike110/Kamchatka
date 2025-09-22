import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useCurrency } from "../../contexts/CurrencyContext";
import { useAuth } from "../../contexts/AuthContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  Star,
  MapPin,
  Users,
  Clock,
  CheckCircle,
  Shield,
  Award,
  Heart,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { ImageCarousel } from "../ImageCarousel";
import { ShareButton } from "../ShareButton";
import { TimeSlotSelector } from "../TimeSlotSelector";
import { ServiceDetailModal } from "../ServiceDetailModal";
import { AuthModal } from "../AuthModal";
import { getServiceById } from "../../utils/servicesData";
import { useNavigate, useParams } from "react-router-dom";

interface ServicePageProps {
  serviceId?: string;
}

export function ServicePage() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();

  const serviceId = params?.serviceId as ServicePageProps["serviceId"];

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [guests, setGuests] = useState(2);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  scrollTo(0, 0);

  if (!serviceId) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {t("error.serviceNotFound")}
          </h1>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
    );
  }

  const service = getServiceById(serviceId);

  if (!service) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {t("error.serviceNotFound")}
          </h1>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("common.back")}
          </Button>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setShowBookingModal(true);
  };

  return (
    <>
      <div className="min-h-screen pt-20 bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("common.back")}
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Image Carousel */}
              <ImageCarousel
                images={service.images}
                title={service.title}
                tags={service.tags}
                className="h-96"
                showThumbnails={true}
              />

              {/* Service Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <Badge variant="secondary" className="mb-2 capitalize">
                      {service.category}
                    </Badge>
                    <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
                    <p className="text-muted-foreground mb-4">
                      by {service.supplier}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{service.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{service.groupSize}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFavorite(service.id)}
                      className={isFavorite(service.id) ? "text-red-500" : ""}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFavorite(service.id) ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                    <ShareButton
                      serviceId={service.id}
                      title={service.title}
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(service.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{service.rating}</span>
                    <span className="text-muted-foreground text-sm">
                      ({service.reviews} reviews)
                    </span>
                  </div>
                  <Badge variant={service.available ? "default" : "secondary"}>
                    {service.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="included">Included</TabsTrigger>
                  <TabsTrigger value="availability">Availability</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-3">
                      About This Adventure
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Highlights</h4>
                    <ul className="space-y-2">
                      {service.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <div className="font-medium">{service.duration}</div>
                        <div className="text-xs text-muted-foreground">
                          Duration
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <div className="font-medium">{service.groupSize}</div>
                        <div className="text-xs text-muted-foreground">
                          Group Size
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <div className="font-medium">Licensed</div>
                        <div className="text-xs text-muted-foreground">
                          Operator
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="itinerary" className="space-y-4">
                  <h3 className="font-bold text-lg">Daily Itinerary</h3>
                  {service.itinerary.map((day) => (
                    <Card key={day.day}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium text-sm">
                            {day.day}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{day.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {day.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="included" className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 text-green-600">
                        ✓ Included
                      </h4>
                      <ul className="space-y-2">
                        {service.included.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3 text-red-600">
                        ✗ Not Included
                      </h4>
                      <ul className="space-y-2">
                        {service.notIncluded.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="text-red-500 mt-0.5">✗</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="availability" className="space-y-4">
                  <h3 className="font-bold text-lg">Select Date & Time</h3>
                  <TimeSlotSelector
                    availability={service.availability}
                    selectedDate={selectedDate}
                    selectedTimeSlots={selectedTimeSlots}
                    onDateSelect={setSelectedDate}
                    // onTimeSlotToggle={handleTimeSlotToggle}
                  />
                </TabsContent>
              </Tabs>
            </div>
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">
                      {formatPrice(service.price)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t("catalog.perPerson")}
                    </span>
                    {service.originalPrice && (
                      <span className="text-sm line-through text-muted-foreground">
                        {formatPrice(service.originalPrice)}
                      </span>
                    )}
                  </div>
                  <Separator />
                  <Button
                    onClick={handleBookNow}
                    disabled={!service.available}
                    className="w-full"
                    size="lg"
                  >
                    {service.available
                      ? t("common.book")
                      : t("catalog.unavailable")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <ServiceDetailModal
        service={service}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onAuthRequired={() => {
          setShowBookingModal(false);
          setShowAuthModal(true);
        }}
      />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
