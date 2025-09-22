import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight, Target, Fish, TreePine, Mountain, Users, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import { useCurrency } from "../contexts/CurrencyContext";
import { useApp } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: "hunting",
    category: "hunting" as const,
    titleKey: "services.hunting",
    descKey: "services.hunting.desc",
    image: "https://images.unsplash.com/photo-1738778703204-af2bfbb62a5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW50aW5nJTIwd2lsZGVybmVzcyUyMHJ1c3NpYXxlbnwxfHx8fDE3NTgyMTA1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Target,
    badgeKey: "common.premium",
    features: ["Expert Guides", "All Equipment", "5-Day Expeditions"],
    rating: 4.9,
    reviews: 89,
    startingPrice: 2500
  },
  {
    id: "fishing",
    category: "fishing" as const,
    titleKey: "services.fishing",
    descKey: "services.fishing.desc",
    image: "https://images.unsplash.com/photo-1719754521965-c54b6aa1f34d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoaW5nJTIwYm9hdCUyMGFyY3RpY3xlbnwxfHx8fDE3NTgyMTA1MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Fish,
    badgeKey: "common.popular",
    features: ["River & Sea Fishing", "Equipment Included", "Full Day Tours"],
    rating: 4.8,
    reviews: 124,
    startingPrice: 180
  },
  {
    id: "recreation",
    category: "recreation" as const,
    titleKey: "services.recreation",
    descKey: "services.recreation.desc",
    image: "https://images.unsplash.com/photo-1690120634477-b83d4ca63ae8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYW1waW5nJTIwbmF0dXJlfGVufDF8fHx8MTc1ODIxMDUzNXww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: TreePine,
    badgeKey: "common.luxury",
    features: ["Spa Services", "Gourmet Dining", "Private Cabins"],
    rating: 4.9,
    reviews: 67,
    startingPrice: 320
  },
  {
    id: "tours",
    category: "tours" as const,
    titleKey: "services.tours",
    descKey: "services.tours.desc",
    image: "https://images.unsplash.com/photo-1612257460705-e0d24b7a4808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFyJTIwd2lsZGxpZmUlMjBrYW1jaGF0a2F8ZW58MXx8fHwxNzU4MjEwNTM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Mountain,
    badgeKey: "common.adventure",
    features: ["Helicopter Tours", "Wildlife Viewing", "Photography Tours"],
    rating: 4.9,
    reviews: 156,
    startingPrice: 450
  }
];

export function ServicesSection() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const handleCategoryClick = (category: "hunting" | "fishing" | "recreation" | "tours") => {
    navigate(`category/${category}`);
  };

  const handleViewAllServices = () => {
    navigate(`services`)
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4">{t('services.title')}</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={service.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={t(service.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <Badge 
                    className="absolute top-4 left-4 bg-white/20 text-white border-white/30 backdrop-blur-sm"
                  >
                    {t(service.badgeKey)}
                  </Badge>

                  {/* Price */}
                  <div className="absolute top-4 right-4 text-white">
                    <span className="text-sm">{t('catalog.from')}</span>
                    <div className="font-bold text-lg">{formatPrice(service.startingPrice)}</div>
                  </div>

                  {/* Icon */}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-xl mb-1">{t(service.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm">{t(service.descKey)}</p>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {t(service.descKey)}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium ml-1">{service.rating}</span>
                      </div>
                      <span className="text-muted-foreground text-sm">
                        ({service.reviews} {t('catalog.reviews')})
                      </span>
                    </div>
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>

                  {/* CTA */}
                  <Button 
                    className="w-full group cursor-pointer" 
                    onClick={() => handleCategoryClick(service.category)}
                  >
                    {t('services.learnMore')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8 cursor-pointer"
            onClick={handleViewAllServices}
          >
            {t('services.viewAll')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}