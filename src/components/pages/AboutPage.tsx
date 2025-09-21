import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ArrowLeft, Target, Award, Users, Globe, Mountain, Leaf, Shield, Heart } from "lucide-react";
import { useApp } from "../../contexts/AppContext";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function AboutPage() {
  const { t } = useLanguage();
  const { goBack } = useApp();

  const values = [
    {
      icon: Mountain,
      titleKey: "about.values.adventure",
      descKey: "about.values.adventure.desc"
    },
    {
      icon: Leaf,
      titleKey: "about.values.sustainability",
      descKey: "about.values.sustainability.desc"
    },
    {
      icon: Shield,
      titleKey: "about.values.safety",
      descKey: "about.values.safety.desc"
    },
    {
      icon: Heart,
      titleKey: "about.values.service",
      descKey: "about.values.service.desc"
    }
  ];

  const stats = [
    { number: "15+", labelKey: "about.stats.years" },
    { number: "1000+", labelKey: "about.stats.clients" },
    { number: "50+", labelKey: "about.stats.services" },
    { number: "25+", labelKey: "about.stats.guides" }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={goBack} className="mb-4 cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back')}
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4">{t('nav.about')}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('footer.about')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('about.hero.description')}
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">{t('about.mission.title')}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {t('about.mission.description')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('about.mission.details')}
            </p>
          </div>
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1704739410998-564ae85cc537?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYW1jaGF0a2ElMjB2b2xjYW5vJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1ODQ3MTc4MXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Kamchatka wilderness"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('about.values.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{t(value.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(value.descKey)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team Preview */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t('footer.team')}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('about.team.description')}
          </p>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => goBack()}
            className="cursor-pointer"
          >
            {t('about.team.meet')}
          </Button>
        </div>

        {/* CTA Section */}
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">{t('about.cta.title')}</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t('about.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="cursor-pointer">
              {t('hero.cta')}
            </Button>
            <Button size="lg" variant="outline" className="cursor-pointer">
              {t('nav.contact')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}