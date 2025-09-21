import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Facebook, 
  Instagram, 
  Youtube,
  Target,
  Fish,
  TreePine,
  Mountain,
  Award,
  Shield,
  CreditCard
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { navigateTo } = useApp();
  const { t } = useLanguage();

  const quickLinks = [
    { label: t('footer.aboutUs'), action: () => navigateTo('about') },
    { label: t('footer.ourStory'), action: () => navigateTo('ourStory') },
    { label: t('footer.safety'), action: () => navigateTo('safety') },
    { label: t('footer.terms'), action: () => navigateTo('terms') },
    { label: t('footer.contact'), action: () => navigateTo('contact') },
    { label: t('footer.faq'), action: () => navigateTo('faq') }
  ];

  const services = [
    { icon: Target, label: t('categories.hunting'), action: () => navigateTo('category', { category: 'hunting' }) },
    { icon: Fish, label: t('categories.fishing'), action: () => navigateTo('category', { category: 'fishing' }) },
    { icon: TreePine, label: t('categories.recreation'), action: () => navigateTo('category', { category: 'recreation' }) },
    { icon: Mountain, label: t('categories.tours'), action: () => navigateTo('category', { category: 'tours' }) }
  ];

  const certifications = [
    { icon: Award, label: t('footer.licensed') },
    { icon: Shield, label: t('footer.insured') },
    { icon: Globe, label: t('footer.unescoPartner') },
    { icon: CreditCard, label: t('footer.securePayments') }
  ];
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">K</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{t('common.brandName')}</h3>
                  <p className="text-sm text-muted-foreground">{t('common.tagline')}</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t('footer.description')}
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="font-bold mb-4">{t('footer.ourServices')}</h4>
              <nav className="space-y-3">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <button
                      key={service.label}
                      onClick={service.action}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-left"
                    >
                      <Icon className="h-4 w-4" />
                      {service.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="font-bold mb-4">{t('footer.quickLinks')}</h4>
              <nav className="space-y-3">
                {quickLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={link.action}
                    className="block text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact & Newsletter Column */}
            <div>
              <h4 className="font-bold mb-4">{t('footer.stayConnected')}</h4>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Petropavlovsk-Kamchatsky, Russia</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+7 (415) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>info@kamchatka-adventures.ru</span>
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <h5 className="font-medium mb-2">{t('footer.newsletter')}</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  {t('footer.newsletterDescription')}
                </p>
                <div className="flex gap-2">
                  <Input 
                    placeholder={t('common.email')} 
                    className="flex-1"
                  />
                  <Button size="sm">
                    {t('common.subscribe')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Certifications */}
        <div className="py-8">
          <div className="text-center mb-6">
            <Badge variant="outline" className="mb-2">
              {t('footer.trustedCertified')}
            </Badge>
            <p className="text-sm text-muted-foreground">
              {t('footer.highestStandards')}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => {
              const Icon = cert.icon;
              return (
                <div key={cert.label} className="flex items-center justify-center gap-2 p-3 rounded-lg bg-background border">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{cert.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 {t('common.brandName')} {t('common.tagline')}. {t('footer.allRightsReserved')}.
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <button 
                onClick={() => navigateTo('privacy')} 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t('footer.privacy')}
              </button>
              <button 
                onClick={() => navigateTo('terms')} 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t('footer.terms')}
              </button>
              <button 
                onClick={() => navigateTo('cookies')} 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t('footer.cookies')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}