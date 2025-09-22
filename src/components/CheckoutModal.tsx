import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  CreditCard,
  Calendar,
  MapPin,
  Users,
  Clock,
  Shield,
  Check,
  AlertCircle,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useCurrency } from "../contexts/CurrencyContext";
import { toast } from "sonner";
import api from "../utils/api";
import { useApp } from "../contexts/AppContext";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState("payment"); // payment, confirmation, success
  const { items, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { navigateTo } = useApp();

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  // Prefill form with user data when modal opens or user changes
  useEffect(() => {
    if (user && isOpen) {
      setPaymentForm((prev) => ({
        ...prev,
        name: user.user_metadata?.full_name || user.user_metadata?.name || "",
        email: user.email || "",
        phone: user.user_metadata?.phone || "",
        address: user.user_metadata?.address || "",
        city: user.user_metadata?.city || "",
        country: user.user_metadata?.country || "",
      }));
    }
  }, [user, isOpen]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    return start === end ? start : `${start} - ${end}`;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error(t("auth.signInRequired"));
      return;
    }

    setProcessing(true);

    try {
      // Create booking
      const bookingData = {
        items: items.map((item) => ({
          serviceId: item.serviceId,
          title: item.title,
          supplier: item.supplier,
          dates: item.dates,
          guests: item.guests,
          price: item.price,
          totalPrice: item.totalPrice,
        })),
        totalAmount,
        paymentMethod,
        customerInfo: {
          name: paymentForm.name,
          email: paymentForm.email,
          phone: paymentForm.phone,
          address: {
            street: paymentForm.address,
            city: paymentForm.city,
            country: paymentForm.country,
          },
        },
        status: "pending", // Initial status
      };

      const response = await api.createBooking(user.id, bookingData);

      if (response.success) {
        setStep("success");
        await clearCart();
        toast.success(t("checkout.bookingSuccess"));
      } else {
        toast.error(response.error || t("checkout.bookingFailed"));
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(t("checkout.paymentFailed"));
    } finally {
      setProcessing(false);
    }
  };
  
  const handleGoToBookings = () => {
    handleClose();
    navigateTo('dashboard');
    // Ideally, you'd also switch to the bookings tab
  };

  const handleClose = () => {
    setStep("payment");
    onClose();
  };

  if (step === "success") {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md mx-4 sm:mx-auto">
          <DialogHeader className="sr-only">
            <DialogTitle>{t("checkout.bookingConfirmation")}</DialogTitle>
            <DialogDescription>
              {t("checkout.bookingConfirmed")}
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {t("checkout.bookingConfirmed")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t("checkout.confirmationEmailSent")}
            </p>
            <div className="space-y-3">
              <Button onClick={handleGoToBookings} className="w-full">
                {t('dashboard.bookings')}
              </Button>
              <Button onClick={handleClose} variant="outline" className="w-full">
                {t("common.continueExploring")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle>{t("checkout.completeBooking")}</DialogTitle>
          <DialogDescription>{t("checkout.reviewDetails")}</DialogDescription>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Booking Summary */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("checkout.bookingSummary")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 pb-4 border-b last:border-b-0 last:pb-0"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium mb-1 truncate">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {t("common.by")} {item.supplier}
                      </p>

                      <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDateRange(
                            item.dates.startDate,
                            item.dates.endDate
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {item.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {item.guests} {t("common.guests")}
                        </div>
                      </div>

                      <div className="font-medium text-right">
                        {formatPrice(item.totalPrice)}
                      </div>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t("checkout.subtotal")}</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("checkout.serviceFee")}</span>
                    <span>{formatPrice(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("checkout.taxes")}</span>
                    <span>{formatPrice(0)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>{t("checkout.total")}</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-500 dark:text-green-400" />
                  <span>{t("checkout.securePayment")}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("checkout.paymentMethod")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="card">{t("payment.card")}</TabsTrigger>
                    <TabsTrigger value="sbp">{t("payment.sbp")}</TabsTrigger>
                    <TabsTrigger value="crypto">
                      {t("payment.crypto")}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="pt-4">
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <Label htmlFor="cardNumber">
                            {t("payment.cardNumber")}
                          </Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentForm.cardNumber}
                            onChange={(e) =>
                              setPaymentForm({
                                ...paymentForm,
                                cardNumber: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="expiryDate">
                            {t("payment.expiryDate")}
                          </Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={paymentForm.expiryDate}
                            onChange={(e) =>
                              setPaymentForm({
                                ...paymentForm,
                                expiryDate: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">{t("payment.cvv")}</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={paymentForm.cvv}
                            onChange={(e) =>
                              setPaymentForm({
                                ...paymentForm,
                                cvv: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="sbp" className="pt-4">
                    <div className="text-center py-6">
                      <Badge className="mb-4">{t("payment.rubPayment")}</Badge>
                      <p className="text-sm text-muted-foreground">
                        {t("payment.sbpRedirect")}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="crypto" className="pt-4">
                    <div className="text-center py-6">
                      <Badge className="mb-4">
                        {t("payment.cryptoPayment")}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {t("payment.metaMaskConnect")}
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("checkout.contactInfo")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{t("common.fullName")}</Label>
                      <Input
                        id="name"
                        value={paymentForm.name}
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t("common.email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={paymentForm.email}
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            email: e.target.value,
                          })
                        }
                        required
                        disabled // Email should not be editable if user is logged in
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">{t("common.phone")}</Label>
                      <Input
                        id="phone"
                        value={paymentForm.phone}
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            phone: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">{t("common.country")}</Label>
                      <Input
                        id="country"
                        value={paymentForm.country}
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            country: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="address">{t("common.address")}</Label>
                      <Input
                        id="address"
                        value={paymentForm.address}
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            address: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      {t("checkout.termsAgreement")}
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={processing || items.length === 0}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    {processing
                      ? t("common.processing")
                      : `${t("checkout.payNow")} - ${formatPrice(
                          totalAmount
                        )}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}