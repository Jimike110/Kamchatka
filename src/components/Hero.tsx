import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Play, MapPin, Calendar, Users, Star, Award, Shield } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useApp } from "../contexts/AppContext";

export function Hero() {
  const { t } = useLanguage();
  const { navigateTo } = useApp();

  const handleExploreServices = () => {
    navigateTo('catalog');
  };

  const handleVideoTour = () => {
    // Open video modal or navigate to video page
    // For now, let's just scroll to the next section
    const nextSection = document.getElementById('services');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1704739410998-564ae85cc537?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYW1jaGF0a2ElMjB2b2xjYW5vJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1ODQ3MTc4MXww&ixlib=rb-4.1.0&q=80&w=1080"
        >
          {/* Use Kamchatka video placeholder - in production, replace with actual video file */}
          <source 
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
            type="video/mp4" 
          />
          {/* Fallback image */}
          <img
            src="https://images.unsplash.com/photo-1704739410998-564ae85cc537?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYW1jaGF0a2ElMjB2b2xjYW5vJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1ODQ3MTc4MXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Kamchatka Volcano Landscape"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            <MapPin className="w-3 h-3 mr-1" />
            Kamchatka Peninsula, Russia
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-200 mb-4 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">50+</div>
              <div className="text-xs md:text-sm text-gray-300">{t('hero.stats.services')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">25+</div>
              <div className="text-xs md:text-sm text-gray-300">{t('hero.stats.guides')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">1000+</div>
              <div className="text-xs md:text-sm text-gray-300">{t('hero.stats.clients')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">15+</div>
              <div className="text-xs md:text-sm text-gray-300">{t('hero.stats.years')}</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 cursor-pointer"
              onClick={handleExploreServices}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {t('hero.cta')}
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 cursor-pointer"
              onClick={handleVideoTour}
            >
              <Play className="w-4 h-4 mr-2" />
              {t('hero.ctaSecondary')}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-400" />
                <span>1000+ {t('hero.stats.clients')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-orange-400 fill-current" />
                  ))}
                </div>
                <span>4.9/5 {t('common.rating')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-orange-400" />
                <span>Licensed & Insured</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white/70">
          <span className="text-xs mb-2">{t('common.scroll')}</span>
          <div className="w-px h-8 bg-white/30 animate-pulse" />
        </div>
      </div>
    </section>
  );
}