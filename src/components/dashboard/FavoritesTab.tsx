import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Heart, MapPin, Clock, Star, Share2 } from 'lucide-react';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { useApp } from '../../contexts/AppContext';
import { ShareButton } from '../ShareButton';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function FavoritesTab() {
  const { favorites, removeFavorite } = useFavorites();
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { navigateTo } = useApp();

  if (favorites.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Heart className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">{t('favorites.empty.title')}</h3>
          <p className="text-muted-foreground text-center mb-6">
            {t('favorites.empty.description')}
          </p>
          <Button onClick={() => navigateTo('catalog')}>
            {t('favorites.empty.browseCatalog')}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{t('favorites.title')}</h2>
          <p className="text-muted-foreground">
            {favorites.length} {favorites.length === 1 ? t('common.service') : t('common.services')} {t('favorites.saved')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((service) => (
          <Card key={service.id} className="group hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                  onClick={() => removeFavorite(service.id)}
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </Button>
                <ShareButton
                  service={service}
                  className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                />
              </div>
              {service.rating && (
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary" className="bg-white/90">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                    {service.rating}
                  </Badge>
                </div>
              )}
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold line-clamp-1">{service.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="line-clamp-1">{service.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-semibold text-lg">
                      {formatPrice(service.price)}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {service.duration}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {t(`categories.${service.category}`)}
                  </Badge>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateTo('service', { serviceId: service.id })}
                    className="flex-1"
                  >
                    {t('common.viewDetails')}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => navigateTo('service', { serviceId: service.id })}
                    className="flex-1"
                  >
                    {t('common.book')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {favorites.length > 6 && (
        <div className="text-center">
          <Button variant="outline">
            {t('common.loadMore')}
          </Button>
        </div>
      )}
    </div>
  );
}