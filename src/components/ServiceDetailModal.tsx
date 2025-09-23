import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  MapPin,
  Clock,
  Users,
  Star,
  Minus,
  Plus,
  Heart,
  Shield,
  Award,
  CheckCircle,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { ImageCarousel } from "./ImageCarousel";
import { useLanguage } from "../contexts/LanguageContext";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { useCurrency } from "../contexts/CurrencyContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { ShareButton } from "./ShareButton";
import type { Service } from "../utils/servicesData";

interface ServiceDetailModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onAuthRequired: () => void;
}

export function ServiceDetailModal({
  service,
  isOpen,
  onClose,
  onAuthRequired,
}: ServiceDetailModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<string>("");
  const [guests, setGuests] = useState(2);
  const [activeTab, setActiveTab] = useState("overview");
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { isFavorite, toggleFavorite } = useFavorites();

  // reset state when modal closed or service changes
  useEffect(() => {
    if (!isOpen) {
      setSelectedDate(undefined);
      setSelectedTimeSlotId("");
      setGuests(1);
    }
  }, [isOpen]);

  if (!service) return null;

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlotId("");
  };

  const handleTimeSlotSelect = (timeSlotId: string) => {
    setSelectedTimeSlotId(timeSlotId);
  };

  const handleAddToCart = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    if (!selectedDate || selectedTimeSlotId.length === 0) {
      toast.error(t("booking.selectedDateTimeError"));
      return;
    }

    const availableSlots =
      service.availability.find(
        (a) => a.date === selectedDate.toISOString().split("T")[0]
      )?.timeSlots || [];

    const selectedTime = selectedTimeSlotId;

    // Calculate end date based on duration
    const endDate = new Date(selectedDate);
    const durationDays = parseInt(service.duration.split(" ")[0]) || 1;
    endDate.setDate(endDate.getDate() + durationDays - 1);

    const totalPrice = service.price * guests;

    const cartItem = {
      id: `${service.id}-${Date.now()}`,
      serviceId: service.id,
      title: service.title,
      supplier: service.supplier,
      image: service.images,
      price: service.price,
      duration: service.duration,
      groupSize: service.groupSize,
      location: service.location,
      dates: {
        startDate: selectedDate.toISOString(),
        endDate: endDate.toISOString(),
      },
      guests,
      totalPrice,
      addedAt: new Date().toISOString(),
      selectedTime,
    };

    await addToCart(cartItem);
    onClose();
  };

  const isDateAvailable = (date: Date): boolean => {
    const dateString = date.toISOString().split("T")[0];
    const dayAvailablity = service.availability.find(
      (a) => a.date === dateString
    );
    return dayAvailablity?.timeSlots.some((slot) => slot.available) ?? false;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const savings = service.originalPrice
    ? (service.originalPrice - service.price) * guests
    : 0;

  const totalPrice = service.price * guests;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold mb-2">
                {service.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Detailed information about {service.title} adventure service
                including booking options
              </DialogDescription>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {service.location}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  {service.rating} ({service.reviews} reviews)
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleFavorite(service.id)}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isFavorite(service.id) ? "fill-current text-red-500" : ""
                  }`}
                />
              </Button>
              <ShareButton
                serviceId={service.id}
                title={service.title}
                variant="secondary"
                size="sm"
                className="h-8 w-8 p-0 border bg-black/60 hover:bg-black/50"
              />
            </div>
          </div>
        </DialogHeader>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative h-64 rounded-lg overflow-hidden">
              <ImageCarousel
                className="max-w-[10px]"
                images={service.images}
                title={service.title}
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {service.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} className="bg-black/50 text-white border-0">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="included">Included</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">
                    About This Adventure
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {service.highlights && (
                  <div>
                    <h4 className="font-medium mb-2">Highlights</h4>
                    <ul className="space-y-2">
                      {service.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

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
                {service.itinerary?.map((day) => (
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
                )) || (
                  <p className="text-muted-foreground">
                    Detailed itinerary will be provided upon booking.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="included" className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-green-600">
                      ✓ Included
                    </h4>
                    <ul className="space-y-2">
                      {service.included?.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      )) || (
                        <li className="text-sm text-muted-foreground">
                          Details will be provided upon booking
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-red-600">
                      ✗ Not Included
                    </h4>
                    <ul className="space-y-2">
                      {service.notIncluded?.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="text-red-500 mt-0.5">✗</span>
                          {item}
                        </li>
                      )) || (
                        <li className="text-sm text-muted-foreground">
                          Details will be provided upon booking
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl font-bold">{service.rating}</div>
                  <div>
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(service.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Based on {service.reviews} reviews
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Detailed reviews will be displayed here in the full
                  implementation.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">${service.price}</span>
                  <span className="text-sm text-muted-foreground">
                    per person
                  </span>
                  {service.originalPrice && (
                    <span className="text-sm line-through text-muted-foreground">
                      ${service.originalPrice}
                    </span>
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Select Date</Label>
                  {/* <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(new Date().getTime());
                      return date < today || !isDateAvailable(date);
                    }}
                    className="rounded-md border"
                  /> */}
                </div>

                <TimeSlotSelector
                  availability={service.availability}
                  selectedDate={selectedDate}
                  selectedTimeSlotId={selectedTimeSlotId}
                  onDateSelect={handleDateSelect}
                  onTimeSlotSelect={handleTimeSlotSelect}
                />

                <div className="space-y-3">
                  <Label>{t("booking.selectGuests")}</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={guests <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{guests}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGuests(guests + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>
                      ${service.price} × {guests} guests
                    </span>
                    <span>${service.price * guests}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Savings</span>
                      <span>-${savings}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>{t("common.total")}</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={
                    !service.available ||
                    !selectedDate ||
                    selectedTimeSlotId.length === 0
                  }
                  className="w-full"
                  size="lg"
                >
                  {!service.available
                    ? "Currently Unavailable"
                    : !selectedDate
                    ? "Select Date First"
                    : selectedTimeSlotId.length === 0
                    ? "Select a time slot first"
                    : t("catalog.addToCart")}
                </Button>

                <div className="text-xs text-center text-muted-foreground">
                  Free cancellation up to 24 hours before
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="font-medium">
                    Hosted by {service.supplier}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Licensed and insured adventure tour operator with 15+ years of
                  experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
