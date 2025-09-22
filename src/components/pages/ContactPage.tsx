import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ArrowLeft, MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useApp } from "../../contexts/AppContext";
import { toast } from "sonner";

export function ContactPage() {
  const { t } = useLanguage();
  const { goBack } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock form submission - in production, send to your API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(t("contact.success"));
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(t("contact.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={goBack}
            className="mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("common.back")}
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4">{t("nav.contact")}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t("footer.contact")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("contact.hero.description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t("contact.form.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{t("profile.name")}</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t("profile.email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">{t("profile.phone")}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">
                        {t("contact.form.subject")}
                      </Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">{t("contact.form.message")}</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder={t("contact.form.messagePlaceholder")}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting
                      ? t("common.loading")
                      : t("contact.form.send")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("contact.info.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">
                      {t("contact.info.address")}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Petropavlovsk-Kamchatsky
                      <br />
                      Kamchatka Krai, Russia
                      <br />
                      683000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{t("profile.phone")}</h3>
                    <p className="text-muted-foreground text-sm">
                      +7 (415) 123-4567
                      <br />
                      +7 (415) 765-4321
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{t("profile.email")}</h3>
                    <p className="text-muted-foreground text-sm">
                      info@kamchatka-adventures.com
                      <br />
                      booking@kamchatka-adventures.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">
                      {t("contact.info.hours")}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {t("contact.info.weekdays")}: 9:00 - 18:00
                      <br />
                      {t("contact.info.weekends")}: 10:00 - 16:00
                      <br />
                      {t("contact.info.timezone")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("contact.emergency.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  {t("contact.emergency.description")}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {t("contact.emergency.line")}
                    </span>
                    <span>+7 (415) 911-0000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {t("contact.emergency.satellite")}
                    </span>
                    <span>Available 24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">{t("footer.faq")}</h2>
            <p className="text-lg text-muted-foreground">
              {t("contact.faq.description")}
            </p>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer"
              onClick={() => goBack()}
            >
              {t("contact.faq.visit")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
